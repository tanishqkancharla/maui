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

/** Wash percents (press is 2× hover). */
export const surfaceMixPercent = {
	hover: { light: 6, dark: 9 },
	active: { light: 12, dark: 18 },
} as const

type MixPercent = (typeof surfaceMixPercent)[keyof typeof surfaceMixPercent]

/** `color-mix` of a foreground into `base` (transparent by default). */
export const surfaceWash = memoize(
	(
		foreground: string,
		percent: MixPercent,
		base: string = "transparent",
	): string =>
		defineVars({
			wash: {
				default: `color-mix(in oklch, ${foreground} ${percent.light}%, ${base})`,
				[DARK_THEME]: `color-mix(in oklch, ${foreground} ${percent.dark}%, ${base})`,
			},
		}).wash,
)

const elementStates = defineVars({
	elementHover: surfaceWash(
		colors.grayAlpha[9],
		surfaceMixPercent.hover,
		elementSurface.element,
	),
	elementActive: surfaceWash(
		colors.grayAlpha[9],
		surfaceMixPercent.active,
		elementSurface.element,
	),
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
