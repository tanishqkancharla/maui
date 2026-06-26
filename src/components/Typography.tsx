import { style, useStyles } from "purse-styles"
import React from "react"
import { text } from "../utils/text"

export const typographyMaxWidth = "72ch"

const h1Class = style(text("xl", 600, "highContrast"), {
	marginTop: "1.5rem",
	marginBottom: "0.5rem",
})

export function H1(props: { children: string }) {
	const className = useStyles(h1Class)

	return <h1 className={className}>{props.children}</h1>
}

const h2Class = style(text("lg", 500, "highContrast"), {
	marginTop: "1.5rem",
	marginBottom: "0.5rem",
})

export function H2(props: { children: string }) {
	const className = useStyles(h2Class)

	return <h2 className={className}>{props.children}</h2>
}

const h3Class = style(text("md", 500, "highContrast"), {
	marginTop: "1.5rem",
	marginBottom: "0.5rem",
})

export function H3(props: { children: string }) {
	const className = useStyles(h3Class)

	return <h3 className={className}>{props.children}</h3>
}

const h4Class = style(text("sm", 600, "highContrast"), {
	margin: "1.25em 0",
	maxWidth: typographyMaxWidth,
})

export function H4(props: { children: string }) {
	const className = useStyles(h4Class)

	return <h4 className={className}>{props.children}</h4>
}

const pClass = style(text("sm", 400, "lowContrast"), {
	margin: "1.25em 0",
	maxWidth: typographyMaxWidth,
})

export function P(props: { children: React.ReactNode }) {
	const className = useStyles(pClass)

	return <p className={className}>{props.children}</p>
}

const labelClass = style(text("sm", 500, "lowContrast"), {
	userSelect: "none",
})

export function Label(
	props: React.LabelHTMLAttributes<HTMLLabelElement> & {
		children: React.ReactNode
	},
) {
	const className = useStyles(labelClass)

	return (
		<label {...props} className={className}>
			{props.children}
		</label>
	)
}

const blockquoteClass = style(text("sm", 400, "lowContrast"), {
	borderLeft: "2px solid var(--accent-color)",
	margin: "1.45em 0",
	paddingLeft: "12px",
	fontStyle: "italic",
	maxWidth: typographyMaxWidth,
})

export function Blockquote(props: { children: string }) {
	const className = useStyles(blockquoteClass)

	return <blockquote className={className}>{props.children}</blockquote>
}

const aClass = text("sm", 400, "highContrast")

export function Link(props: { children: string; href: string }) {
	const className = useStyles(aClass)

	return (
		<a href={props.href} className={className}>
			{props.children}
		</a>
	)
}
