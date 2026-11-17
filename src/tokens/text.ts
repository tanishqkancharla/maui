import type React from "react"
import { defineVars, style } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
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

const fontSizes = defineVars({
	"2xs": { default: "10px", [LARGE_SCALE]: "12px" },
	xs: { default: "12px", [LARGE_SCALE]: "15px" },
	sm: { default: "13px", [LARGE_SCALE]: "16px" },
	md: { default: "14px", [LARGE_SCALE]: "17px" },
	lg: { default: "16px", [LARGE_SCALE]: "20px" },
	xl: { default: "22px", [LARGE_SCALE]: "28px" },
})

const lineHeights = defineVars({
	"2xs": { default: "14px", [LARGE_SCALE]: "18px" },
	xs: { default: "18px", [LARGE_SCALE]: "22px" },
	sm: { default: "20px", [LARGE_SCALE]: "24px" },
	md: { default: "22px", [LARGE_SCALE]: "26px" },
	lg: { default: "24px", [LARGE_SCALE]: "30px" },
	xl: { default: "30px", [LARGE_SCALE]: "36px" },
})

const textSizeStyles: Record<
	TextSize,
	Omit<React.CSSProperties, "color" | "fontWeight">
> = {
	"2xs": {
		fontSize: fontSizes["2xs"],
		fontFamily,
		lineHeight: lineHeights["2xs"],
	},
	xs: {
		fontSize: fontSizes.xs,
		fontFamily,
		lineHeight: lineHeights.xs,
	},
	sm: {
		fontSize: fontSizes.sm,
		fontFamily,
		lineHeight: lineHeights.sm,
	},
	md: {
		fontSize: fontSizes.md,
		fontFamily,
		lineHeight: lineHeights.md,
	},
	lg: {
		fontSize: fontSizes.lg,
		fontFamily,
		lineHeight: lineHeights.lg,
	},
	xl: {
		fontSize: fontSizes.xl,
		fontFamily,
		lineHeight: lineHeights.xl,
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
	/** `font-variant-numeric: tabular-nums`. */
	tabular?: boolean
}

export const text = memoize((options: TextOptions = {}) => {
	const size = options.size ?? "md"
	const fontWeight = options.fontWeight ?? 400
	const color = options.color ?? "highContrast"
	return style({
		...textSizeStyles[size],
		fontWeight,
		color: textColorStyles[color],
		...(options.tabular && { fontVariantNumeric: "tabular-nums" }),
		...(options.monospace ? monoFontStyle : {}),
	})
})
