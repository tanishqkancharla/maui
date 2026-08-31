import { javascript } from "@codemirror/lang-javascript"
import type { EditorView } from "@codemirror/view"
import { style, useStyles } from "purse-styles"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { useTheme } from "../../theme/ThemeContext"
import { backgroundColor } from "../../tokens/background"
import { border } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
import { spacing } from "../../tokens/spacing"
import { Button } from "../../components/Button"
import { Kbd } from "../../components/Code"
import { Text } from "../../components/Text"
import { text } from "../../tokens/text"
import { cls } from "../../utils/cls"
import { defaultJsx } from "./catalog"
import { mauiAutocomplete } from "./completions"
import { mauiCodeMirrorTheme } from "./editorTheme"
import { mauiEditorKeymap } from "./keymaps"
import { PreviewIsland } from "./PreviewIsland"
import { mauiBracketMatching } from "./tagMatching"
import { evaluateJsx } from "./evaluate"
import {
	collectJsxDiagnosticsFromSource,
	formatErrorBanner,
	lineFromCompileError,
	mauiJsxLinter,
} from "./lint"
import { prettifyJsx, printWidthFromEditor } from "./prettify"

const STORAGE_KEY = "maui-jsx-editor"

function readStoredSource(): string {
	try {
		const stored = window.sessionStorage.getItem(STORAGE_KEY)
		return stored && stored.trim().length > 0 ? stored : defaultJsx
	} catch {
		return defaultJsx
	}
}

export function JsxEditor() {
	const { resolvedTheme } = useTheme()
	const [source, setSource] = useState(readStoredSource)
	const sourceRef = useRef(source)
	sourceRef.current = source
	const editorViewRef = useRef<EditorView | null>(null)

	const shellClassName = useStyles(shellClass)
	const rootClassName = useStyles(rootClass)
	const paneClassName = useStyles(paneClass)
	const paneHeaderClassName = useStyles(paneHeaderClass)
	const editorBodyClassName = useStyles(editorBodyClass)
	const previewBodyClassName = useStyles(previewBodyClass)
	const previewHostClassName = useStyles(previewHostClass)
	const previewOutdatedClassName = useStyles(previewOutdatedClass)
	const errorClassName = useStyles(errorClass)
	const errorTextClassName = useStyles(errorTextClass)
	const [runtimeError, setRuntimeError] = useState<Error | null>(null)
	const [liveSource, setLiveSource] = useState(source)

	useEffect(() => {
		try {
			window.sessionStorage.setItem(STORAGE_KEY, source)
		} catch {
			// Ignore quota / private-mode failures.
		}
	}, [source])

	const compiled = useMemo(() => evaluateJsx(source), [source])
	const [preview, setPreview] = useState<React.ReactNode>(() => {
		const initial = evaluateJsx(source)
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
		() => collectJsxDiagnosticsFromSource(source),
		[source],
	)
	const bannerError = useMemo(() => {
		if (!compiled.ok) {
			return formatErrorBanner(
				compiled.error,
				lineFromCompileError(compiled.error),
			)
		}
		if (runtimeError) {
			return formatErrorBanner(runtimeError.message)
		}
		if (typeErrors[0]) {
			return formatErrorBanner(typeErrors[0].message, typeErrors[0].line)
		}
		return null
	}, [compiled, runtimeError, typeErrors])
	const outdated = Boolean(bannerError) || liveSource !== source

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
			...mauiAutocomplete,
			mauiEditorKeymap,
			mauiJsxLinter,
			...mauiBracketMatching,
			...mauiCodeMirrorTheme(resolvedTheme === "dark"),
		],
		[resolvedTheme],
	)

	return (
		<div className={shellClassName}>
			<div className={rootClassName}>
				<section className={paneClassName} aria-label="JSX editor">
					<div className={paneHeaderClassName}>
						<Text size="xs" color="highContrast">
							JSX
						</Text>
						<Button
							variant="quiet"
							onClick={() => {
								void formatSource()
							}}
						>
							Format
							<Kbd>⌘S</Kbd>
						</Button>
					</div>
					<div className={editorBodyClassName}>
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

				<section className={paneClassName} aria-label="Design preview">
					<div className={paneHeaderClassName}>
						<Text size="xs" color="highContrast">
							Preview
						</Text>
					</div>
					{bannerError && (
						<div className={errorClassName} role="status">
							<span className={errorTextClassName}>{bannerError}</span>
						</div>
					)}
					<div
						className={cls(
							previewBodyClassName,
							outdated && previewOutdatedClassName,
						)}
						data-outdated={outdated ? "true" : undefined}
						aria-busy={outdated}
					>
						<PreviewIsland
							className={previewHostClassName}
							resetKey={compiled.ok ? source : liveSource}
							fallback={preview}
							onError={setRuntimeError}
							onReady={commitPreview}
						>
							{compiled.ok ? compiled.element : preview}
						</PreviewIsland>
					</div>
				</section>
			</div>
		</div>
	)
}

const shellClass = style({
	containerType: "inline-size",
	display: "flex",
	flexDirection: "column",
	minHeight: 0,
	flex: "1 1 auto",
})

const rootClass = style({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr)",
	gridTemplateRows: "minmax(10rem, 1fr) minmax(10rem, 1fr)",
	gap: spacing.value(4),
	minHeight: 0,
	flex: "1 1 auto",
	"@container (min-width: 760px)": {
		gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
		gridTemplateRows: "minmax(0, 1fr)",
	},
})

const paneClass = style(border([], "outline"), radius.lg, {
	display: "flex",
	flexDirection: "column",
	minHeight: 0,
	minWidth: 0,
	overflow: "hidden",
	backgroundColor: backgroundColor.element,
})

const paneHeaderClass = style(
	flex({ direction: "row", align: "center", justify: "between" }),
	{
		flexShrink: 0,
		minHeight: `calc(28px + ${spacing.value(3)} * 2 + 1px)`,
		paddingInline: spacing.value(4),
		paddingBlock: spacing.value(3),
		borderBottom: `1px solid ${colors.gray[4]}`,
	},
)

const editorBodyClass = style({
	flex: "1 1 auto",
	minHeight: 0,
	minWidth: 0,
	overflow: "hidden",
	"& > div": {
		height: "100%",
		minHeight: 0,
	},
	"& .cm-editor": {
		height: "100%",
		overflow: "hidden",
	},
	"& .cm-scroller": {
		overflow: "auto",
	},
})

const previewBodyClass = style(spacing.padding({ all: 8 }), {
	flex: "1 1 auto",
	minHeight: 0,
	overflow: "auto",
})

const previewHostClass = style({
	minHeight: 0,
	height: "100%",
})

const previewOutdatedClass = style({
	opacity: 0.5,
})

const errorClass = style(spacing.padding({ x: 4, y: 3 }), {
	flexShrink: 0,
	borderBottom: `1px solid ${colors.red[6]}`,
	backgroundColor: colors.red[3],
})

const errorTextClass = style(text({ size: "xs", fontWeight: 400, color: "highContrast" }), {
	color: colors.red[11],
})
