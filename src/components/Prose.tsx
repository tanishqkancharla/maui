import { style, useStyles } from "purse-styles"
import type React from "react"
import { spacing } from "../tokens/spacing"

/**
 * Vertical rhythm for long-form/docs content (headings, paragraphs, and the
 * demo panels between them). Typography components carry no margin of their
 * own, so this is the one place spacing between them is defined - as a
 * property of this container, not of the elements passing through it.
 */
export function Prose(props: {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
}) {
	const proseClassName = useStyles(proseClass)
	const className = props.className
		? `${proseClassName} ${props.className}`
		: proseClassName

	return (
		<section className={className} style={props.style}>
			{props.children}
		</section>
	)
}

// Matches a preceding sibling only if it's NOT itself a heading, so stacked
// headings (H2 immediately followed by H3) hug together instead of both
// getting a big "new section" break.
const notHeading = ":not(h1):not(h2):not(h3):not(h4)"

export const proseClass = style({
	"& > * + *": {
		marginTop: spacing.value(8), // 16px - default gap between blocks
	},
	"& > h1 + *, & > h2 + *, & > h3 + *, & > h4 + *": {
		marginTop: spacing.value(6), // 12px - hug a heading to what follows it
	},
	[`& > ${notHeading} + h3, & > ${notHeading} + h4`]: {
		marginTop: spacing.value(12), // 24px - break before a subsection heading
	},
	[`& > ${notHeading} + h1, & > ${notHeading} + h2`]: {
		marginTop: spacing.value(16), // 32px - break before a top-level heading
	},
})
