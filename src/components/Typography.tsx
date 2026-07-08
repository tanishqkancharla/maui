import { style, useStyles } from "purse-styles"
import React from "react"
import { prose } from "../tokens/prose"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { useProseSize } from "./Prose"

// Typography components carry no margin, and no reading measure. Both are
// layout concerns owned by the container: use gap (for app UI) or Prose (for
// long-form/docs content) to control spacing and max-width around these
// elements.

// Each heading/text component renders at its application (`text`) size by
// default, and switches to the prose scale when it lives inside a `Prose`
// container (see `useProseSize`). Prose sizes/weights come from `prose(size)`.
const appH1Class = text("xl", 700, "highContrast")

export function H1(props: { children: string }) {
	const proseSize = useProseSize()
	const className = useStyles(proseSize ? prose(proseSize).h1 : appH1Class)

	return <h1 className={className}>{props.children}</h1>
}

const appH2Class = text("lg", 600, "highContrast")

export function H2(props: { children: string }) {
	const proseSize = useProseSize()
	const className = useStyles(proseSize ? prose(proseSize).h2 : appH2Class)

	return <h2 className={className}>{props.children}</h2>
}

const appH3Class = text("md", 600, "highContrast")

export function H3(props: { children: string }) {
	const proseSize = useProseSize()
	const className = useStyles(proseSize ? prose(proseSize).h3 : appH3Class)

	return <h3 className={className}>{props.children}</h3>
}

const appH4Class = text("md", 600, "highContrast")

export function H4(props: { children: string }) {
	const proseSize = useProseSize()
	const className = useStyles(proseSize ? prose(proseSize).h4 : appH4Class)

	return <h4 className={className}>{props.children}</h4>
}

// Layout is identical in both treatments; only the type scale differs, so it
// lives in a shared class composed with whichever text token applies.
const pLayoutClass = style({
	margin: 0,
})
const appPClass = text("md", 400, "highContrast")

export function P(props: { children: React.ReactNode }) {
	const proseSize = useProseSize()
	const textClass = proseSize ? prose(proseSize).paragraph : appPClass
	const className = useStyles(textClass, pLayoutClass)

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

// Structural blockquote styling (border, padding, margin reset) is shared;
// only the type scale differs between app and prose treatments.
const blockquoteFrameClass = style({
	borderLeft: "2px solid var(--accent-color)",
	paddingLeft: "12px",
	fontStyle: "italic",
	// Browsers apply a default horizontal margin to <blockquote>; this is the
	// one place a Typography component needs its own margin override, since
	// it's correcting a user-agent default rather than opining on rhythm.
	marginInline: 0,
})
const appBlockquoteClass = text("md", 500, "lowContrast")

export function Blockquote(props: { children: string }) {
	const proseSize = useProseSize()
	const textClass = proseSize ? prose(proseSize).blockquote : appBlockquoteClass
	const className = useStyles(textClass, blockquoteFrameClass)

	return <blockquote className={className}>{props.children}</blockquote>
}

// App-context list treatment. Inside `Prose`, lists take their size and
// internal spacing from `prose(size).list` instead (see `Ul`/`Ol`).
const appListClass = style(text("md", 400, "highContrast"), {
	paddingInlineStart: spacing.value(8),
	"& > li + li": {
		marginTop: spacing.value(2),
	},
	"& li > ul, & li > ol": {
		marginTop: spacing.value(2),
	},
})
const listResetClass = style({ margin: 0 })
const ulMarkerClass = style({ listStyleType: "disc" })
const olMarkerClass = style({ listStyleType: "decimal" })

export function Ul(props: { children: React.ReactNode }) {
	const proseSize = useProseSize()
	const listClass = proseSize ? prose(proseSize).list : appListClass
	const className = useStyles(listResetClass, listClass, ulMarkerClass)

	return <ul className={className}>{props.children}</ul>
}

export function Ol(props: { children: React.ReactNode }) {
	const proseSize = useProseSize()
	const listClass = proseSize ? prose(proseSize).list : appListClass
	const className = useStyles(listResetClass, listClass, olMarkerClass)

	return <ol className={className}>{props.children}</ol>
}

const liClass = style({
	"&::marker": {
		color: "var(--gray-11)",
	},
})

export function Li(props: { children: React.ReactNode }) {
	const className = useStyles(liClass)

	return <li className={className}>{props.children}</li>
}

const appLinkClass = text("md", 400, "highContrast")

export function Link(props: { children: string; href: string }) {
	const proseSize = useProseSize()
	const className = useStyles(proseSize ? prose(proseSize).link : appLinkClass)

	return (
		<a href={props.href} className={className}>
			{props.children}
		</a>
	)
}
