import { defineVars, style } from "purse-styles"
import { borderColor } from "./borders"

const DARK = "@media (prefers-color-scheme: dark)"

const shadowParams = defineVars({
	foregroundRgb: {
		default: "32, 32, 32",
		[DARK]: "238, 238, 238",
	},
	blurOpacity: "0.12",
})

const rgb = shadowParams.foregroundRgb
const blur = shadowParams.blurOpacity

export const shadowVars = defineVars({
	thin: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px`,
	minimal: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px`,
	minimalFlat: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px`,
	middle: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px`,
	strong: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, ${blur}) 0px 1px 1px -0.5px, rgba(0, 0, 0, ${blur}) 0px 3px 3px -1.5px, rgba(0, 0, 0, ${blur}) 0px 6px 6px -3px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 12px 12px -6px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 24px 24px -12px`,
	modalSmall: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(${rgb}, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 1px 1px -0.5px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 3px 3px 0px, rgba(0, 0, 0, calc(${blur} * 0.33)) 0px 6px 6px 0px, rgba(0, 0, 0, calc(${blur} * 0.33)) 0px 12px 12px 0px, rgba(0, 0, 0, calc(${blur} * 0.33)) 0px 24px 24px 0px`,
	panelFocused: `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 1px 1px -0.5px, rgba(0, 0, 0, calc(${blur} * 0.67)) 0px 3px 3px 1px, rgba(0, 0, 0, calc(${blur} * 0.5)) 0px 6px 6px 2px, rgba(0, 0, 0, calc(${blur} * 0.5)) 0px 12px 12px 3px, rgba(0, 0, 0, calc(${blur} * 0.33)) 0px 24px 24px 4px`,
})

export const shadow = {
	thin: style({ boxShadow: shadowVars.thin }),
	minimal: style({ boxShadow: shadowVars.minimal }),
	minimalFlat: style({ boxShadow: shadowVars.minimalFlat }),
	middle: style({ boxShadow: shadowVars.middle }),
	strong: style({ boxShadow: shadowVars.strong }),
	modalSmall: style({ boxShadow: shadowVars.modalSmall }),
	panelFocused: style({ boxShadow: shadowVars.panelFocused }),
	border: style({ boxShadow: `0 0 0 1px ${borderColor.border}` }),
	bottomBorder: style({
		boxShadow: `inset 0 -1.5px 0 ${borderColor.border}`,
	}),
	bottomBorderThin: style({
		boxShadow: `inset 0 -1px 0 ${borderColor.border}`,
	}),
}
