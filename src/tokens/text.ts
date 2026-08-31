import type React from "react"
import { style } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"

export type TextSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor = "lowContrast" | "highContrast" | "accent" | "onAccent"

export const fontFamily =
	'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"'

export const monoFontFamily =
	'"Commit Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'

/**
 * Shared Commit Mono treatment. `ss05` is Commit Mono’s “smart kerning”:
 * letters stay on the monospace grid but slide toward narrower neighbors
 * (https://commitmono.com/).
 */
export const monoFontStyle = {
	fontFamily: monoFontFamily,
	fontVariantNumeric: "tabular-nums",
	fontFeatureSettings: '"ss05" 1',
	tabSize: "2",
	MozTabSize: "2",
} as const satisfies React.CSSProperties

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

export const baseTextStyle = {
	...textSizeStyles.md,
	fontWeight: 400 as const,
	color: colors.gray[12],
}

export const monospace = style(monoFontStyle)

const textColorStyles: Record<TextColor, React.CSSProperties["color"]> = {
	lowContrast: colors.gray[11],
	highContrast: colors.gray[12],
	accent: colors.accent[11],
	onAccent: "white",
}

export type TextOptions = {
	size?: TextSize
	fontWeight?: TextWeight
	color?: TextColor
	monospace?: boolean
}

export const text = memoize((options: TextOptions = {}) => {
	const size = options.size ?? "md"
	const fontWeight = options.fontWeight ?? 400
	const color = options.color ?? "highContrast"
	return style({
		...textSizeStyles[size],
		fontWeight,
		color: textColorStyles[color],
		...(options.monospace ? monoFontStyle : {}),
	})
})
