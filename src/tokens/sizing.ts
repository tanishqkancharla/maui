import { style } from "purse-styles"
import { memoize } from "../utils/memoize"
import type { TextSize } from "./text"

/** Same t-shirt scale as `text(...)`. */
export type IconSize = TextSize

/**
 * Icon box sizes paired with text sizes. Values sit slightly above the
 * matching font-size so stroke icons balance optically next to type.
 * Intrinsic SVG artwork is 24×24 (`xl`).
 */
export const iconSizeValues: Record<IconSize, string> = {
	"2xs": "12px",
	xs: "14px",
	sm: "16px",
	md: "18px",
	lg: "20px",
	xl: "24px",
}

export const icon = memoize((size: IconSize) =>
	style({
		width: iconSizeValues[size],
		height: iconSizeValues[size],
		flexShrink: 0,
	}),
)

export const sizingTokens = {
	/** @deprecated Prefer `icon("sm")` — kept as the default inline icon size. */
	icon: icon("sm"),
	fullWidth: style({ width: "100%" }),
	contentWidth: style({ maxWidth: "72ch" }),
} as const
