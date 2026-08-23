import { javascript } from "@codemirror/lang-javascript"
import { style, useStyles } from "purse-styles"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { useTheme } from "../../theme/ThemeContext"
import { backgroundColor } from "../../tokens/background"
import { border } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
import { spacing } from "../../tokens/spacing"
import { Text } from "../../components/Text"
import { defaultJsx } from "./catalog"
import { mauiAutocomplete } from "./completions"
import { mauiCodeMirrorTheme } from "./editorTheme"
import { evaluateJsx } from "./evaluate"
import { prettifyJsx } from "./prettify"

const STORAGE_KEY = "maui-jsx-editor"

type PreviewErrorBoundaryProps = {
	resetKey: string
	children: React.ReactNode
}

type PreviewErrorBoundaryState = {
	error: Error | null
}

class PreviewErrorBoundary extends React.Component<
	PreviewErrorBoundaryProps,
	PreviewErrorBoundaryState
> {
	state: PreviewErrorBoundaryState = { error: null }

	static getDerivedStateFromError(error: Error): PreviewErrorBoundaryState {
		return { error }
	}

	componentDidUpdate(prevProps: PreviewErrorBoundaryProps) {
		if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
			this.setState({ error: null })
		}
	}

	render() {
		if (this.state.error) {
			return (
				<Text size="sm" color="lowContrast">
					{this.state.error.message}
				</Text>
			)
		}

		return this.props.children
	}
}

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

	const shellClassName = useStyles(shellClass)
	const rootClassName = useStyles(rootClass)
	const paneClassName = useStyles(paneClass)
	const paneHeaderClassName = useStyles(paneHeaderClass)
	const editorBodyClassName = useStyles(editorBodyClass)
	const previewBodyClassName = useStyles(previewBodyClass)
	const errorClassName = useStyles(errorClass)

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

	useEffect(() => {
		if (compiled.ok) {
			setPreview(compiled.element)
		}
	}, [compiled])

	const formatSource = useCallback(async () => {
		const next = await prettifyJsx(sourceRef.current)
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
			mauiAutocomplete,
			...mauiCodeMirrorTheme(resolvedTheme === "dark"),
		],
		[resolvedTheme],
	)

	return (
		<div className={shellClassName}>
			<div className={rootClassName}>
				<section className={paneClassName} aria-label="JSX editor">
					<div className={paneHeaderClassName}>
						<Text size="xs" color="lowContrast">
							JSX
						</Text>
					</div>
					<div className={editorBodyClassName}>
						<CodeMirror
							value={source}
							height="100%"
							theme="none"
							extensions={extensions}
							basicSetup={{
								foldGutter: false,
								highlightActiveLineGutter: false,
							}}
							onChange={setSource}
						/>
					</div>
				</section>

				<section className={paneClassName} aria-label="Design preview">
					<div className={paneHeaderClassName}>
						<Text size="xs" color="lowContrast">
							Preview
						</Text>
					</div>
					{!compiled.ok && (
						<div className={errorClassName} role="status">
							<Text size="xs" color="accent">
								{compiled.error}
							</Text>
						</div>
					)}
					<div className={previewBodyClassName}>
						<PreviewErrorBoundary resetKey={compiled.ok ? source : "error"}>
							{preview}
						</PreviewErrorBoundary>
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
	height: "100%",
})

const rootClass = style({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr)",
	gridTemplateRows: "minmax(10rem, 1fr) minmax(10rem, 1fr)",
	gap: spacing.value(4),
	minHeight: 0,
	flex: "1 1 auto",
	height: "100%",
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

const paneHeaderClass = style(flex({ direction: "row", align: "center" }), {
	flexShrink: 0,
	paddingInline: spacing.value(4),
	paddingBlock: spacing.value(3),
	borderBottom: `1px solid ${colors.gray[4]}`,
})

const editorBodyClass = style({
	flex: "1 1 auto",
	minHeight: 0,
	overflow: "hidden",
	"& .cm-editor": {
		height: "100%",
	},
})

const previewBodyClass = style(spacing.padding({ all: 8 }), {
	flex: "1 1 auto",
	minHeight: 0,
	overflow: "auto",
})

const errorClass = style(spacing.padding({ x: 4, y: 3 }), {
	flexShrink: 0,
	borderBottom: `1px solid ${colors.gray[4]}`,
	backgroundColor: colors.accent[3],
})
