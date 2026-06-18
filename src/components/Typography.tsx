import { style, useStyles } from "purse-styles"
import React from "react"

export const typographyMaxWidth = "500px"

export function H1(props: { children: string }) {
	return <h1>{props.children}</h1>
}

export function H2(props: { children: string }) {
	return <h2>{props.children}</h2>
}

export function H3(props: { children: string }) {
	return <h3>{props.children}</h3>
}

const h4Class = style({
	margin: "1.25em 0",
	color: "var(--sand-12)",
	fontWeight: 600,
	fontSize: "0.9rem",
	fontFamily: "system-ui, -apple-system",
	letterSpacing: "0.015em",
	lineHeight: 1.4,
	maxWidth: typographyMaxWidth,
})

export function H4(props: { children: string }) {
	const className = useStyles(h4Class)

	return <h4 className={className}>{props.children}</h4>
}

const pClass = style({
	margin: "1.25em 0",
	color: "var(--sand-11)",
	fontSize: "0.9rem",
	fontFamily: "system-ui, -apple-system",
	letterSpacing: "0.015em",
	lineHeight: 1.4,
	maxWidth: typographyMaxWidth,
})

export function P(props: { children: React.ReactNode }) {
	const className = useStyles(pClass)

	return <p className={className}>{props.children}</p>
}

const blockquoteClass = style({
	borderLeft: "2px solid var(--accent-color)",
	margin: "1.45em 0",
	paddingLeft: "12px",
	fontStyle: "italic",
	color: "var(--sand-10)",
	fontSize: "0.9rem",
	fontFamily: "system-ui, -apple-system",
	letterSpacing: "0.015em",
	lineHeight: 1.4,
	maxWidth: typographyMaxWidth,
})

export function Blockquote(props: { children: string }) {
	const className = useStyles(blockquoteClass)

	return <blockquote className={className}>{props.children}</blockquote>
}

const aClass = style({
	color: "var(--sand-12)",
	fontFamily: "system-ui, -apple-system",
	letterSpacing: "0.015em",
	lineHeight: "19px",
})

export function Link(props: { children: string; href: string }) {
	const className = useStyles(aClass)

	return (
		<a href={props.href} className={className}>
			{props.children}
		</a>
	)
}
