import { defineVars } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"

export const avatar = {
	green: defineVars({
		background: {
			default: "hsl(160, 45%, 90%)",
			[DARK_THEME]: "hsl(160, 35%, 22%)",
		},
		foreground: {
			default: "hsl(160, 65%, 28%)",
			[DARK_THEME]: "hsl(160, 60%, 78%)",
		},
	}),
	orange: defineVars({
		background: {
			default: "hsl(24, 70%, 91%)",
			[DARK_THEME]: "hsl(24, 40%, 22%)",
		},
		foreground: {
			default: "hsl(24, 75%, 35%)",
			[DARK_THEME]: "hsl(24, 80%, 78%)",
		},
	}),
	pink: defineVars({
		background: {
			default: "hsl(320, 55%, 92%)",
			[DARK_THEME]: "hsl(320, 30%, 22%)",
		},
		foreground: {
			default: "hsl(320, 55%, 38%)",
			[DARK_THEME]: "hsl(320, 70%, 80%)",
		},
	}),
} as const
