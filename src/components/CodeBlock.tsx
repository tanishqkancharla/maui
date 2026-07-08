import { useEffect, useState } from "react"
import { style, useStyles } from "purse-styles"
import { highlightCode, isSupportedCodeLang } from "../utils/shiki"
import { border } from "../tokens/borders"
import { monospace, text } from "../tokens/text"

const codeBlockClass = style(text("xs", 400, "highContrast"), monospace, border([], "outline"), {
	background: "var(--gray-2)",
	borderRadius: "6px",
	color: "var(--gray-12)",
	lineHeight: 1.6,
	margin: 0,
	overflowX: "auto",
	padding: "12px",
})

const codeClass = style({
	font: "inherit",
})

export function CodeBlock(props: { children: string; lang: string }) {
	const className = useStyles(codeBlockClass)
	const codeClassName = useStyles(codeClass)
	const [html, setHtml] = useState<string | null>(null)

	useEffect(() => {
		if (!isSupportedCodeLang(props.lang)) {
			setHtml(null)
			return
		}

		let cancelled = false

		highlightCode(props.children, props.lang).then((result) => {
			if (!cancelled) {
				setHtml(result)
			}
		})

		return () => {
			cancelled = true
		}
	}, [props.children, props.lang])

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
