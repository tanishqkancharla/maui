import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"

const shadowParams = defineVars({
	foregroundRgb: {
		default: "0, 0, 0",
		[DARK_THEME]: "255, 255, 255",
	},
	blurOpacity: {
		default: "0.06",
		[DARK_THEME]: "0.12",
	},
})

const rgb = shadowParams.foregroundRgb
const blur = shadowParams.blurOpacity

export const shadowVars = defineVars({
	subtle: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px`,
	medium: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px`,
	strong: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 12px 12px -6px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 24px 24px -12px`,
})

/** Same offsets as `shadowVars.subtle`, hue from `color`. Ring/blur alphas scale with the origin alpha. */
export function tintedSubtle(color: string) {
	return `oklch(from ${color} l c h / calc(alpha * 0.08)) 0px 0px 0px 1px, oklch(from ${color} l c h / calc(alpha * ${blur})) 0px 1px 1px -0.5px, oklch(from ${color} l c h / calc(alpha * ${blur})) 0px 3px 3px -1.5px`
}

export const shadow = {
	subtle: style({ boxShadow: shadowVars.subtle }),
	medium: style({ boxShadow: shadowVars.medium }),
	strong: style({ boxShadow: shadowVars.strong }),
}
