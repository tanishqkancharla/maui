import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"

/** Accent focus ring — hard edge uses step 8, soft glow uses step 5. */
const focusRingRule = {
	outline: "none",
	position: "relative",
	zIndex: 1,
	boxShadow: `0 0 0 1px ${colors.accentAlpha[8]}, 0 0 8px 1px ${colors.accentAlpha[5]}`,
} as const

export const focusRing = memoize((selector: string = "&:focus-visible") =>
	style({
		[selector]: focusRingRule,
	} as CSSProperties),
)
