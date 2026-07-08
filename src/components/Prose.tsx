import { style, useStyles } from "purse-styles"
import React from "react"
import { type ProseSize, proseRhythm } from "../tokens/prose"

/**
 * Set inside a `Prose` container so typography components can opt into the
 * prose type scale at the container's size. `null` means "not in prose" -
 * components fall back to their application (`text`) treatment.
 */
const ProseContext = React.createContext<ProseSize | null>(null)

/**
 * Returns the current prose size, or `null` when rendered outside a `Prose`
 * container. Typography components use this to decide between prose and
 * application type treatments.
 */
export function useProseSize(): ProseSize | null {
	return React.useContext(ProseContext)
}

/**
 * Vertical rhythm for long-form/docs content (headings, paragraphs, and the
 * demo panels between them). Typography components carry no margin of their
 * own, so this is the one place spacing between them is defined - as a
 * property of this container, not of the elements passing through it.
 *
 * `size` selects the prose type scale that descendant typography components
 * inherit via context.
 */
export function Prose(props: {
	children: React.ReactNode
	size?: ProseSize
	className?: string
	style?: React.CSSProperties
}) {
	const size = props.size ?? "md"
	const proseClassName = useStyles(proseContainerClass, proseRhythm(size))
	const className = props.className
		? `${proseClassName} ${props.className}`
		: proseClassName

	return (
		<ProseContext.Provider value={size}>
			<section className={className} style={props.style}>
				{props.children}
			</section>
		</ProseContext.Provider>
	)
}

// Reading measure for long-form content. Set once here on the container
// rather than on every typography component, so the constraint is a property
// of the prose column and doesn't follow those components into app UI. The
// per-size vertical rhythm lives in `proseRhythm` and is composed in above.
export const proseMaxWidth = "72ch"

const proseContainerClass = style({
	maxWidth: proseMaxWidth,
})
