import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

const appSurface = defineVars({
	app: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[1],
	},
})

// Hover/active: Craft-style foreground wash into the app canvas
// (white in light, gray[1] in dark) — not into gray[3].
const elementSurface = defineVars({
	element: colors.gray[3],
	elementHover: `color-mix(in oklch, ${colors.gray[12]} 5%, ${appSurface.app})`,
	elementActive: `color-mix(in oklch, ${colors.gray[12]} 10%, ${appSurface.app})`,
})

export const backgroundColor = {
	...appSurface,
	...elementSurface,
}

export const background = {
	app: style({ backgroundColor: backgroundColor.app }),
	subtle: style({ backgroundColor: colors.gray[2] }),
	element: style({ backgroundColor: backgroundColor.element }),
	elementHover: style({ backgroundColor: backgroundColor.elementHover }),
	elementActive: style({ backgroundColor: backgroundColor.elementActive }),
	accent: style({ backgroundColor: colors.accent[9] }),
	accentHover: style({ backgroundColor: colors.accent[10] }),
}
