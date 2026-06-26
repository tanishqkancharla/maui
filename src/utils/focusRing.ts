import { style, type CSSProperties, type StyleElement } from "purse-styles"

const focusRingRule = {
	outline: "1px solid var(--accent-8)",
	outlineOffset: "1px",
} as const

const focusRingCache = new Map<string, StyleElement>()

export function focusRing(selector = "&:focus-visible") {
	const cached = focusRingCache.get(selector)

	if (cached) {
		return cached
	}

	const focusRingStyle = style({
		[selector]: focusRingRule,
	} as CSSProperties)

	focusRingCache.set(selector, focusRingStyle)
	return focusRingStyle
}
