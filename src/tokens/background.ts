import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

const appSurface = defineVars({
	app: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[1],
	},
})

const elementSurface = defineVars({
	element: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[2],
	},
})

// Craft-style foreground wash over the element's own surface.
const elementStates = defineVars({
	elementHover: `color-mix(in oklch, ${colors.gray[12]} 3.5%, ${elementSurface.element})`,
	elementActive: `color-mix(in oklch, ${colors.gray[12]} 7%, ${elementSurface.element})`,
})

export const backgroundColor = {
	...appSurface,
	...elementSurface,
	...elementStates,
}

export const background = {
	app: style({ backgroundColor: backgroundColor.app }),
	element: style({ backgroundColor: backgroundColor.element }),
	elementHover: style({ backgroundColor: backgroundColor.elementHover }),
	elementActive: style({ backgroundColor: backgroundColor.elementActive }),
	accent: style({ backgroundColor: colors.accent[9] }),
	accentHover: style({ backgroundColor: colors.accent[10] }),
}
