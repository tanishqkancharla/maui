import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"

const focusShadow = `0 0 0 1px ${colors.accentAlpha[8]}, 0 0 8px 1px ${colors.accentAlpha[5]}`

/**
 * Accent focus ring — hard edge uses step 8, soft glow uses step 5.
 * Pass an existing box-shadow to retain the control's elevation while focused.
 */
export const focusRing = memoize(
	(selector: string = "&:focus-visible", existingShadow?: string) =>
		style({
			[selector]: {
				outline: "none",
				position: "relative",
				zIndex: 1,
				boxShadow: existingShadow
					? `${focusShadow}, ${existingShadow}`
					: focusShadow,
			},
		} as CSSProperties),
)
