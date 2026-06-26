import { style, type CSSProperties, type StyleElement } from "purse-styles"

const focusRingRule = {
	outline: "none",
	position: "relative",
	zIndex: 1,
	boxShadow: "0 0 0 1px #0f89fd7f, 0 0 8px 1px #0077ff24",
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
