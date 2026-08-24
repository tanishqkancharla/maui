import { useEffect, useState } from "react"
import { style, useStyles } from "purse-styles"
import { highlightCode, isSupportedCodeLang } from "../utils/shiki"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { shadow } from "../tokens/shadow"
import { monospace, text } from "../tokens/text"
import { useTheme } from "../theme/ThemeContext"

const codeBlockClass = style(
	text("xs", 400, "highContrast"),
	monospace,
	shadow.subtle,
	{
		backgroundColor: backgroundColor.app,
		borderRadius: "6px",
		color: colors.gray[12],
		lineHeight: 1.6,
		margin: 0,
		overflowX: "auto",
		padding: "12px",
		"& .shiki": {
			backgroundColor: "transparent !important",
			fontFamily: "inherit",
		},
		"& .shiki code": {
			font: "inherit",
			fontFamily: "inherit",
			fontSize: "inherit",
			lineHeight: "inherit",
			tabSize: "inherit",
		},
		'& .shiki span[style*="font-weight"]': {
			fontWeight: "500 !important",
		},
	},
)

const codeClass = style({
	font: "inherit",
})

export function CodeBlock(props: { children: string; lang: string }) {
	const className = useStyles(codeBlockClass)
	const codeClassName = useStyles(codeClass)
	const [html, setHtml] = useState<string | null>(null)
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		if (!isSupportedCodeLang(props.lang)) {
			setHtml(null)
			return
		}

		let cancelled = false

		highlightCode(props.children, props.lang, resolvedTheme).then((result) => {
			if (!cancelled) {
				setHtml(result)
			}
		})

		return () => {
			cancelled = true
		}
	}, [props.children, props.lang, resolvedTheme])

	if (!html) {
		return (
			<pre className={className}>
				<code className={codeClassName}>{props.children}</code>
			</pre>
		)
	}

	return (
		<div
			className={`maui-code-block ${className}`}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	)
}
