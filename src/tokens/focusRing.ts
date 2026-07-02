import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"

const focusRingRule = {
	outline: "none",
	position: "relative",
	zIndex: 1,
	boxShadow: "0 0 0 1px #0f89fd7f, 0 0 8px 1px #0077ff24",
} as const

export const focusRing = memoize((selector: string = "&:focus-visible") =>
	style({
		[selector]: focusRingRule,
	} as CSSProperties),
)
