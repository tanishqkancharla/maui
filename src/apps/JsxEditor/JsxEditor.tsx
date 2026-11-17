import { javascript } from "@codemirror/lang-javascript"
import type { EditorView } from "@codemirror/view"
import { debounce } from "lodash"
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react"
import CodeMirror from "@uiw/react-codemirror"
import type { DesignSystemApi, ThemePreference } from "./DesignSystemApi"
import { createAutocomplete } from "./completions"
import { createCodeMirrorTheme } from "./editorTheme"
import { editorKeymap } from "./keymaps"
import { PreviewIsland } from "./PreviewIsland"
import { createJsxTagMatching } from "./tagMatching"
import { evaluateJsx } from "./evaluate"
import {
	collectJsxDiagnosticsFromSource,
	formatErrorBanner,
	lineFromCompileError,
	createJsxLinter,
} from "./lint"
import { prettifyJsx, printWidthFromEditor } from "./prettify"
import {
	decodeEditorUrlState,
	editorUrlDebounceMs,
	readEditorUrlState,
	writeEditorUrlState,
} from "./urlState"

function readStoredSource(storageKey: string, fallback: string): string {
	try {
		const stored = window.sessionStorage.getItem(storageKey)
		return stored && stored.trim().length > 0 ? stored : fallback
	} catch {
		return fallback
	}
}

function editorLayoutCss(api: DesignSystemApi) {
	const { chrome } = api
	return `
.jsx-editor-shell {
	container-type: inline-size;
	display: flex;
	flex-direction: column;
	min-height: 0;
	flex: 1 1 auto;
	font-family: ${chrome.uiFontFamily};
}
.jsx-editor-root {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	grid-template-rows: minmax(10rem, 1fr) minmax(10rem, 1fr);
	gap: ${chrome.space4};
	min-height: 0;
	flex: 1 1 auto;
}
@container (min-width: 760px) {
	.jsx-editor-root {
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		grid-template-rows: minmax(0, 1fr);
	}
}
.jsx-editor-pane {
	display: flex;
	flex-direction: column;
	min-height: 0;
	min-width: 0;
	overflow: hidden;
	background-color: ${chrome.appBackground};
	border: 1px solid ${chrome.outline};
	border-radius: ${chrome.radiusLg};
}
.jsx-editor-pane-header {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	flex-shrink: 0;
	min-height: calc(28px + ${chrome.space3} * 2 + 1px);
	padding-inline: ${chrome.space4};
	padding-block: ${chrome.space3};
	border-bottom: 1px solid ${chrome.gray4};
}
.jsx-editor-body {
	flex: 1 1 auto;
	min-height: 0;
	min-width: 0;
	overflow: hidden;
}
.jsx-editor-body > div {
	height: 100%;
	min-height: 0;
}
.jsx-editor-body .cm-editor {
	height: 100%;
	overflow: hidden;
}
.jsx-editor-body .cm-scroller {
	overflow: auto;
}
.jsx-editor-preview-body {
	flex: 1 1 auto;
	min-height: 0;
	overflow: auto;
	padding: ${chrome.space8};
}
.jsx-editor-preview-host {
	min-height: 0;
	height: 100%;
}
.jsx-editor-preview-outdated {
	opacity: 0.5;
}
.jsx-editor-error {
	display: flex;
	flex-direction: column;
	gap: ${chrome.space2};
	flex-shrink: 0;
	max-height: 40%;
	overflow: auto;
	padding: ${chrome.space3} ${chrome.space4};
	border-bottom: 1px solid ${chrome.red6};
	background-color: ${chrome.red3};
}
.jsx-editor-error-text {
	font-size: 12px;
	line-height: 18px;
	font-weight: 400;
	color: ${chrome.red11};
	white-space: pre-wrap;
}
`
}

function readInitialSource(designSystem: DesignSystemApi): string {
	if (designSystem.urlStatePath !== undefined) {
		const fromHash = readEditorUrlState()
		if (fromHash) {
			return fromHash.source
		}
	}
	return readStoredSource(designSystem.storageKey, designSystem.defaultSource)
}

export function JsxEditor(props: { designSystem: DesignSystemApi }) {
	const { designSystem } = props
	const { urlStatePath } = designSystem
	const preference = designSystem.themePreference?.value
	const setPreference = designSystem.themePreference?.set
	const [source, setSource] = useState(() => readInitialSource(designSystem))
	const sourceRef = useRef(source)
	sourceRef.current = source
	const preferenceRef = useRef(preference)
	preferenceRef.current = preference
	const editorViewRef = useRef<EditorView | null>(null)

	const [runtimeError, setRuntimeError] = useState<Error | null>(null)
	const [liveSource, setLiveSource] = useState(source)

	useEffect(() => {
		try {
			window.sessionStorage.setItem(designSystem.storageKey, source)
		} catch {
			// Ignore quota / private-mode failures.
		}
	}, [designSystem.storageKey, source])

	useLayoutEffect(() => {
		if (urlStatePath === undefined || !setPreference) return
		const fromHash = readEditorUrlState()
		if (fromHash?.theme) {
			setPreference(fromHash.theme)
		}
	}, [setPreference, urlStatePath])

	const writeUrl = useMemo(
		() =>
			debounce(
				(path: string, nextSource: string, nextTheme?: ThemePreference) => {
					writeEditorUrlState(path, { source: nextSource, theme: nextTheme })
				},
				editorUrlDebounceMs,
			),
		[],
	)

	useEffect(() => {
		if (urlStatePath === undefined) return
		writeUrl(urlStatePath, source, preference)
	}, [preference, source, urlStatePath, writeUrl])

	useEffect(() => {
		return () => {
			writeUrl.flush()
			writeUrl.cancel()
		}
	}, [writeUrl])

	useEffect(() => {
		if (urlStatePath === undefined) return
		const path = urlStatePath

		function syncFromHash() {
			const parsed = decodeEditorUrlState(window.location.hash)
			if (!parsed) {
				return
			}
			if (parsed.source !== sourceRef.current) {
				setSource(parsed.source)
			}
			if (parsed.theme && parsed.theme !== preferenceRef.current) {
				setPreference?.(parsed.theme)
			}
		}

		function restoreHashIfCleared() {
			if (window.location.pathname !== path) {
				return
			}
			if (window.location.hash) {
				return
			}
			writeEditorUrlState(path, {
				source: sourceRef.current,
				theme: preferenceRef.current,
			})
		}

		window.addEventListener("hashchange", syncFromHash)
		window.addEventListener("pushState", restoreHashIfCleared)
		window.addEventListener("popstate", restoreHashIfCleared)
		return () => {
			window.removeEventListener("hashchange", syncFromHash)
			window.removeEventListener("pushState", restoreHashIfCleared)
			window.removeEventListener("popstate", restoreHashIfCleared)
		}
	}, [setPreference, urlStatePath])

	const compiled = useMemo(
		() => evaluateJsx(source, designSystem.previewScope),
		[source, designSystem.previewScope],
	)
	const [preview, setPreview] = useState<ReactNode>(() => {
		const initial = evaluateJsx(source, designSystem.previewScope)
		return initial.ok ? initial.element : null
	})

	const commitPreview = useCallback(() => {
		if (!compiled.ok) return
		setPreview((current) =>
			current === compiled.element ? current : compiled.element,
		)
		setLiveSource((current) => (current === source ? current : source))
		setRuntimeError((current) => (current === null ? current : null))
	}, [compiled, source])

	const typeErrors = useMemo(
		() => collectJsxDiagnosticsFromSource(source, designSystem.catalog),
		[source, designSystem.catalog],
	)
	const bannerLines = useMemo(() => {
		if (!compiled.ok) {
			return [
				{
					key: "compile",
					text: formatErrorBanner(
						compiled.error,
						lineFromCompileError(compiled.error),
					),
				},
			]
		}
		if (runtimeError) {
			return [
				{
					key: "runtime",
					text: formatErrorBanner(runtimeError.message),
				},
			]
		}
		return typeErrors.map((error) => ({
			key: `${error.from}:${error.to}`,
			text: formatErrorBanner(error.message, error.line),
		}))
	}, [compiled, runtimeError, typeErrors])
	const outdated = bannerLines.length > 0 || liveSource !== source

	const formatSource = useCallback(async () => {
		const view = editorViewRef.current
		const printWidth = view ? printWidthFromEditor(view) : undefined
		const next = await prettifyJsx(sourceRef.current, { printWidth })
		if (next !== sourceRef.current) {
			setSource(next)
		}
	}, [])

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (
				!(event.metaKey || event.ctrlKey) ||
				event.shiftKey ||
				event.altKey ||
				event.key.toLowerCase() !== "s"
			) {
				return
			}

			event.preventDefault()
			event.stopPropagation()
			void formatSource()
		}

		window.addEventListener("keydown", onKeyDown, true)
		return () => window.removeEventListener("keydown", onKeyDown, true)
	}, [formatSource])

	const extensions = useMemo(
		() => [
			javascript({ jsx: true, typescript: true }),
			...createAutocomplete(designSystem.catalog, designSystem.iconNames),
			editorKeymap,
			createJsxLinter(designSystem.catalog),
			...createJsxTagMatching(),
			...createCodeMirrorTheme(
				designSystem.resolvedTheme === "dark",
				designSystem.chrome,
				designSystem.syntax,
			),
		],
		[designSystem],
	)

	const layoutCss = useMemo(() => editorLayoutCss(designSystem), [designSystem])
	const { Chrome } = designSystem

	return (
		<div className="jsx-editor-shell">
			<style>{layoutCss}</style>
			<div className="jsx-editor-root">
				<section className="jsx-editor-pane" aria-label="JSX editor">
					<div className="jsx-editor-pane-header">
						<Chrome.HeaderLabel>JSX</Chrome.HeaderLabel>
						<Chrome.FormatButton
							onClick={() => {
								void formatSource()
							}}
						/>
					</div>
					<div className="jsx-editor-body">
						<CodeMirror
							value={source}
							height="100%"
							theme="none"
							extensions={extensions}
							basicSetup={{
								foldGutter: false,
								highlightActiveLine: false,
								highlightActiveLineGutter: false,
								bracketMatching: false,
								autocompletion: false,
							}}
							onCreateEditor={(view) => {
								editorViewRef.current = view
							}}
							onChange={setSource}
						/>
					</div>
				</section>

				<section className="jsx-editor-pane" aria-label="Design preview">
					<div className="jsx-editor-pane-header">
						<Chrome.HeaderLabel>Preview</Chrome.HeaderLabel>
					</div>
					{bannerLines.length > 0 && (
						<div className="jsx-editor-error" role="status">
							{bannerLines.map((line) => (
								<div key={line.key} className="jsx-editor-error-text">
									{line.text}
								</div>
							))}
						</div>
					)}
					<div
						className={
							outdated
								? "jsx-editor-preview-body jsx-editor-preview-outdated"
								: "jsx-editor-preview-body"
						}
						data-outdated={outdated ? "true" : undefined}
						aria-busy={outdated}
					>
						<PreviewIsland
							className="jsx-editor-preview-host"
							resetKey={compiled.ok ? source : liveSource}
							fallback={preview}
							onError={setRuntimeError}
							onReady={commitPreview}
							Providers={designSystem.PreviewProviders}
						>
							{compiled.ok ? compiled.element : preview}
						</PreviewIsland>
					</div>
				</section>
			</div>
		</div>
	)
}
