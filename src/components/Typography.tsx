import { style, useStyles } from "purse-styles"
import React from "react"
import { text } from "../tokens/text"

export const typographyMaxWidth = "72ch"

// Typography components carry no margin. Vertical rhythm is a layout
// concern, not a type concern: use gap (for app UI) or Prose (for
// long-form/docs content) to control the space around these elements.

const h1Class = text("xl", 700, "highContrast")

export function H1(props: { children: string }) {
	const className = useStyles(h1Class)

	return <h1 className={className}>{props.children}</h1>
}

const h2Class = text("lg", 600, "highContrast")

export function H2(props: { children: string }) {
	const className = useStyles(h2Class)

	return <h2 className={className}>{props.children}</h2>
}

const h3Class = text("md", 600, "highContrast")

export function H3(props: { children: string }) {
	const className = useStyles(h3Class)

	return <h3 className={className}>{props.children}</h3>
}

const h4Class = style(text("md", 600, "highContrast"), {
	maxWidth: typographyMaxWidth,
})

export function H4(props: { children: string }) {
	const className = useStyles(h4Class)

	return <h4 className={className}>{props.children}</h4>
}

const pClass = style(text("md", 400, "highContrast"), {
	maxWidth: typographyMaxWidth,
})

export function P(props: { children: React.ReactNode }) {
	const className = useStyles(pClass)

	return <p className={className}>{props.children}</p>
}

export const labelText = style(text("xs", 500, "lowContrast"), {
	userSelect: "none",
})

export function Label(
	props: React.LabelHTMLAttributes<HTMLLabelElement> & {
		children: React.ReactNode
	},
) {
	const className = useStyles(labelText)

	return (
		<label {...props} className={className}>
			{props.children}
		</label>
	)
}

const blockquoteClass = style(text("md", 400, "lowContrast"), {
	borderLeft: "2px solid var(--accent-color)",
	paddingLeft: "12px",
	fontStyle: "italic",
	maxWidth: typographyMaxWidth,
	// Browsers apply a default horizontal margin to <blockquote>; this is the
	// one place a Typography component needs its own margin override, since
	// it's correcting a user-agent default rather than opining on rhythm.
	marginInline: 0,
})

export function Blockquote(props: { children: string }) {
	const className = useStyles(blockquoteClass)

	return <blockquote className={className}>{props.children}</blockquote>
}

const aClass = text("md", 400, "highContrast")

export function Link(props: { children: string; href: string }) {
	const className = useStyles(aClass)

	return (
		<a href={props.href} className={className}>
			{props.children}
		</a>
	)
}
