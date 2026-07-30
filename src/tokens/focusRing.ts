import { blueA, blueDarkA } from "@radix-ui/colors"
import { defineVars, style, type CSSProperties } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { memoize } from "../utils/memoize"

const focusColor = defineVars({
	edge: { default: blueA.blueA8, [DARK_THEME]: blueDarkA.blueA8 },
	glow: { default: blueA.blueA5, [DARK_THEME]: blueDarkA.blueA5 },
})

const focusShadow = `0 0 0 1px ${focusColor.edge}, 0 0 6px ${focusColor.glow}`

/**
 * Blue focus ring — hard edge uses step 8, soft glow uses step 5.
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
		} as unknown as CSSProperties),
)
