import type React from "react"
import { style, type StyleElement } from "purse-styles"

export type TextSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl"
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor = "lowContrast" | "highContrast" | "accent" | "onAccent"

const textSizeStyles: Record<
	TextSize,
	Omit<React.CSSProperties, "color" | "fontWeight">
> = {
	"2xs": {
		fontSize: "0.6875rem",
		fontFamily: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;`,
		letterSpacing: "0.01em",
		lineHeight: 1.45,
	},
	xs: {
		fontSize: "0.75rem",
		fontFamily: "system-ui, -apple-system",
		letterSpacing: "0.02em",
		lineHeight: 1.45,
	},
	sm: {
		fontSize: "0.8125rem",
		fontFamily: "system-ui, -apple-system",
		letterSpacing: "0.015em",
		lineHeight: 1.5,
	},
	md: {
		fontSize: "0.9375rem",
		fontFamily: '"SF Pro Display", system-ui, -apple-system',
		lineHeight: 1.5,
	},
	lg: {
		fontSize: "1.125rem",
		fontFamily: '"SF Pro Display", system-ui, -apple-system',
		lineHeight: 1.4,
	},
	xl: {
		fontSize: "1.375rem",
		fontFamily: '"SF Pro Display", system-ui, -apple-system',
		lineHeight: 1.3,
	},
}

const textColorStyles: Record<TextColor, React.CSSProperties["color"]> = {
	lowContrast: "var(--sand-11)",
	highContrast: "var(--sand-12)",
	accent: "var(--accent-11)",
	onAccent: "white",
}

const textCache = new Map<string, StyleElement>()

export function text(size: TextSize, fontWeight: TextWeight, color: TextColor) {
	const key = `${size}:${fontWeight}:${color}`
	const cached = textCache.get(key)

	if (cached) {
		return cached
	}

	const textStyle = style({
		...textSizeStyles[size],
		fontWeight,
		color: textColorStyles[color],
	})

	textCache.set(key, textStyle)
	return textStyle
}
