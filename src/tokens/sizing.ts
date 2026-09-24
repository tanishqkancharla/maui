import { style } from "purse-styles"
import type { TextSize } from "./text"

/** Same t-shirt scale as `text(...)` and `Icons.* size`. */
export type IconSize = TextSize

/**
 * Icon box sizes paired with text sizes. Values sit slightly above the
 * matching font-size so stroke icons balance optically next to type.
 * Intrinsic SVG artwork is 24×24 (`xl`). Applied by `Icons.*` via `size`.
 */
export const iconSizeValues: Record<IconSize, string> = {
	"2xs": "12px",
	xs: "14px",
	sm: "16px",
	md: "18px",
	lg: "20px",
	xl: "24px",
}

/** Reading measure for `Prose` and single-column content. */
export const proseMaxWidth = "80ch"

export const sizingTokens = {
	fullWidth: style({ width: "100%" }),
	contentWidth: style({ maxWidth: proseMaxWidth }),
} as const
