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

/** Foreground wash percents used by element hover/active and tinted quiet buttons. */
export const surfaceMixPercent = {
	hover: 3.5,
	active: 7,
} as const

export function surfaceWash(
	foreground: string,
	percent: number,
	base: string = elementSurface.element,
) {
	return `color-mix(in oklch, ${foreground} ${percent}%, ${base})`
}

// Craft-style foreground wash over the element's own surface.
const elementStates = defineVars({
	elementHover: surfaceWash(colors.gray[12], surfaceMixPercent.hover),
	elementActive: surfaceWash(colors.gray[12], surfaceMixPercent.active),
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
