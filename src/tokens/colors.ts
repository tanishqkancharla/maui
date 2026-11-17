import * as radix from "@radix-ui/colors"
import { defineVars } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"

const STEPS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
export type ColorScaleStep = (typeof STEPS)[number]
export type ColorScale = { readonly [K in ColorScaleStep]: string }

export const paletteNames = [
	"gray",
	"mauve",
	"slate",
	"sage",
	"olive",
	"sand",
	"tomato",
	"red",
	"ruby",
	"crimson",
	"pink",
	"plum",
	"purple",
	"violet",
	"iris",
	"indigo",
	"blue",
	"cyan",
	"teal",
	"jade",
	"green",
	"grass",
	"bronze",
	"gold",
	"brown",
	"orange",
	"amber",
	"yellow",
	"lime",
	"mint",
	"sky",
] as const

export type PaletteName = (typeof paletteNames)[number]

export const colorNames = ["accent", ...paletteNames] as const
export type ColorName = (typeof colorNames)[number]

type RadixScale = Record<string, string>

function radixScale(name: PaletteName, alpha = false): ColorScale {
	const lightKey = (alpha ? `${name}A` : name) as keyof typeof radix
	const darkKey = (alpha ? `${name}DarkA` : `${name}Dark`) as keyof typeof radix
	const light = radix[lightKey] as RadixScale
	const dark = radix[darkKey] as RadixScale
	const prefix = alpha ? `${name}A` : name
	const steps = {} as {
		[K in ColorScaleStep]: { default: string; [DARK_THEME]?: string }
	}
	for (const step of STEPS) {
		const lightValue = light[`${prefix}${step}`]
		const darkValue = dark[`${prefix}${step}`]
		if (lightValue === undefined || darkValue === undefined) {
			throw new Error(`Radix scale ${prefix} is missing step ${step}`)
		}
		steps[step] = {
			default: lightValue,
			[DARK_THEME]: darkValue,
		}
	}
	return defineVars(steps)
}

const palettes = Object.fromEntries(
	paletteNames.map((name) => [name, radixScale(name)]),
) as { [N in PaletteName]: ColorScale }

const paletteAlphas = Object.fromEntries(
	paletteNames.map((name) => [`${name}Alpha`, radixScale(name, true)]),
) as { [N in PaletteName as `${N}Alpha`]: ColorScale }

/** Brand pair: teal in light, violet in dark. */
const accent = defineVars({
	1: { default: radix.teal.teal1, [DARK_THEME]: radix.violetDark.violet1 },
	2: { default: radix.teal.teal2, [DARK_THEME]: radix.violetDark.violet2 },
	3: { default: radix.teal.teal3, [DARK_THEME]: radix.violetDark.violet3 },
	4: { default: radix.teal.teal4, [DARK_THEME]: radix.violetDark.violet4 },
	5: { default: radix.teal.teal5, [DARK_THEME]: radix.violetDark.violet5 },
	6: { default: radix.teal.teal6, [DARK_THEME]: radix.violetDark.violet6 },
	7: { default: radix.teal.teal7, [DARK_THEME]: radix.violetDark.violet7 },
	8: { default: radix.teal.teal8, [DARK_THEME]: radix.violetDark.violet8 },
	9: { default: radix.teal.teal9, [DARK_THEME]: radix.violetDark.violet9 },
	10: { default: radix.teal.teal10, [DARK_THEME]: radix.violetDark.violet10 },
	11: { default: radix.teal.teal11, [DARK_THEME]: radix.violetDark.violet11 },
	12: { default: radix.teal.teal12, [DARK_THEME]: radix.violetDark.violet12 },
})

const accentAlpha = defineVars({
	1: { default: radix.tealA.tealA1, [DARK_THEME]: radix.violetDarkA.violetA1 },
	2: { default: radix.tealA.tealA2, [DARK_THEME]: radix.violetDarkA.violetA2 },
	3: { default: radix.tealA.tealA3, [DARK_THEME]: radix.violetDarkA.violetA3 },
	4: { default: radix.tealA.tealA4, [DARK_THEME]: radix.violetDarkA.violetA4 },
	5: { default: radix.tealA.tealA5, [DARK_THEME]: radix.violetDarkA.violetA5 },
	6: { default: radix.tealA.tealA6, [DARK_THEME]: radix.violetDarkA.violetA6 },
	7: { default: radix.tealA.tealA7, [DARK_THEME]: radix.violetDarkA.violetA7 },
	8: { default: radix.tealA.tealA8, [DARK_THEME]: radix.violetDarkA.violetA8 },
	9: { default: radix.tealA.tealA9, [DARK_THEME]: radix.violetDarkA.violetA9 },
	10: { default: radix.tealA.tealA10, [DARK_THEME]: radix.violetDarkA.violetA10 },
	11: { default: radix.tealA.tealA11, [DARK_THEME]: radix.violetDarkA.violetA11 },
	12: { default: radix.tealA.tealA12, [DARK_THEME]: radix.violetDarkA.violetA12 },
})

export const colors = {
	accent,
	accentAlpha,
	...palettes,
	...paletteAlphas,
}

export const scaleSteps = STEPS
