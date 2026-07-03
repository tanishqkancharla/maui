import type React from "react"
import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

export type TextSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor = "lowContrast" | "highContrast" | "accent" | "onAccent"

const fontFamily =
	'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'

const monoFontFamily =
	'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'

const textSizeStyles: Record<
	TextSize,
	Omit<React.CSSProperties, "color" | "fontWeight">
> = {
	"2xs": {
		fontSize: "10px",
		fontFamily,
		lineHeight: "14px",
	},
	xs: {
		fontSize: "12px",
		fontFamily,
		lineHeight: "18px",
	},
	sm: {
		fontSize: "13px",
		fontFamily,
		lineHeight: "20px",
	},
	md: {
		fontSize: "14px",
		fontFamily,
		lineHeight: "22px",
	},
	lg: {
		fontSize: "16px",
		fontFamily,
		lineHeight: "24px",
	},
	xl: {
		fontSize: "22px",
		fontFamily,
		lineHeight: "30px",
	},
}

export const monospace = style({
	fontFamily: monoFontFamily,
	fontVariantNumeric: "tabular-nums",
	tabSize: "2",
	MozTabSize: "2",
})

const textColorStyles: Record<TextColor, React.CSSProperties["color"]> = {
	lowContrast: "var(--sand-11)",
	highContrast: "var(--sand-12)",
	accent: "var(--accent-11)",
	onAccent: "white",
}

export const text = memoize(
	(size: TextSize, fontWeight: TextWeight, color: TextColor) =>
		style({
			...textSizeStyles[size],
			fontWeight,
			color: textColorStyles[color],
		}),
)
