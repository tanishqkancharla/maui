import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

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

/** Dark-only top highlight, fill-tinted lift, and a 0.5px edge beneath the lift. */
export function tintedControl(color: string, lightEdge: string) {
	return `inset 0 .5px light-dark(transparent, rgb(255 255 255 / 0.15)), 0 1px 2px light-dark(oklch(from ${color} l c h / 0.35), oklch(from ${color} l c h / 0.18)), 0 3px 8px -3px light-dark(oklch(from ${color} l c h / 0.6), oklch(from ${color} l c h / 0.3)), 0 0 0 .5px light-dark(${lightEdge}, oklch(from ${color} 0.18 calc(c * 0.5) h))`
}

export const shadowVars = defineVars({
	control: {
		// 0.5px edge listed last, so it paints beneath the drop: light reads as a
		// gray A6 border; dark is near-black so the control looks cut into the surface.
		default: `0 .5px 1px #00000018, 0 0 4px -1px #0001, 0 0 0 .5px ${colors.grayAlpha[6]}`,
		[DARK_THEME]: `inset 0 .5px rgb(255 255 255 / 0.09), 0 1px .5px #00000018, 0 0 3px -1px #0005, 0 0 0 .5px rgb(0 0 0 / 0.8)`,
	},
	selectedControl: tintedControl(colors.accent[9], colors.accentAlpha[6]),
	subtle: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px`,
	medium: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px`,
	strong: `rgba(${rgb}, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 12px 12px -6px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 24px 24px -12px`,
})

/** Same offsets as `shadowVars.subtle`, with the ring and blurs tinted from `color`. */
export function tintedSubtle(color: string) {
	return `oklch(from ${color} l c h / 0.08) 0px 0px 0px 1px, oklch(from ${color} l c h / ${blur}) 0px 1px 1px -0.5px, oklch(from ${color} l c h / ${blur}) 0px 3px 3px -1.5px`
}

export const shadow = {
	control: style({ boxShadow: shadowVars.control }),
	subtle: style({ boxShadow: shadowVars.subtle }),
	medium: style({ boxShadow: shadowVars.medium }),
	strong: style({ boxShadow: shadowVars.strong }),
}
