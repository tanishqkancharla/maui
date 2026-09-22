import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { memoize } from "../utils/memoize"
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

/** Transparent-wash percents (press is 2× hover). */
export const surfaceMixPercent = {
	hover: { light: 6, dark: 9 },
	active: { light: 12, dark: 18 },
} as const

type MixPercent = number | { readonly light: number; readonly dark: number }

/** `color-mix` of a foreground into `base` (transparent by default). */
export function surfaceWash(
	foreground: string,
	percent: MixPercent,
	base: string = "transparent",
): string {
	if (typeof percent !== "number") {
		return themeWash(foreground, percent, base)
	}
	return `color-mix(in oklch, ${foreground} ${percent}%, ${base})`
}

const themeWash = memoize(
	(
		foreground: string,
		percent: { readonly light: number; readonly dark: number },
		base: string,
	): string =>
		defineVars({
			wash: {
				default: surfaceWash(foreground, percent.light, base),
				[DARK_THEME]: surfaceWash(foreground, percent.dark, base),
			},
		}).wash,
)

// Craft-style foreground wash over the element's own surface.
const elementStates = defineVars({
	elementHover: surfaceWash(colors.gray[12], 3.5, elementSurface.element),
	elementActive: surfaceWash(colors.gray[12], 7, elementSurface.element),
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
