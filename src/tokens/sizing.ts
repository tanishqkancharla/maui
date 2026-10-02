import { defineVars, style } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import type { TextSize } from "./text"

/** Same t-shirt scale as `text(...)` and `Icons.* size`. */
export type IconSize = TextSize

/**
 * Icon box sizes paired with text sizes. Values sit slightly above the
 * matching font-size so stroke icons balance optically next to type.
 * Intrinsic SVG artwork is 24×24 (`xl`). Applied by `Icons.*` via `size`.
 */
export const iconSizeValues: Record<IconSize, string> = defineVars({
	"2xs": { default: "12px", [LARGE_SCALE]: "16px" },
	xs: { default: "14px", [LARGE_SCALE]: "18px" },
	sm: { default: "16px", [LARGE_SCALE]: "20px" },
	md: { default: "18px", [LARGE_SCALE]: "24px" },
	lg: { default: "20px", [LARGE_SCALE]: "26px" },
	xl: { default: "24px", [LARGE_SCALE]: "30px" },
})

/** Shared control height and minimum touch target. */
export const controlSize = defineVars({
	height: { default: "28px", [LARGE_SCALE]: "40px" },
	smHeight: { default: "24px", [LARGE_SCALE]: "40px" },
	minTarget: { default: "0px", [LARGE_SCALE]: "40px" },
})

/** Reading measure for long-form columns. */
export const proseMaxWidth = "80ch"

/** Composable prose column. `sizing.contentWidth` is this same style. */
export const proseContainerStyle = style({
	maxWidth: proseMaxWidth,
})

export const sizingTokens = {
	fullWidth: style({ width: "100%" }),
	contentWidth: proseContainerStyle,
} as const
