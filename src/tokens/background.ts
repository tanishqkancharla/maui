import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

// Hover/active follow Craft: mix a little foreground into the element surface
// instead of jumping a full gray step (gray 4 / 5).
const elementHover = `color-mix(in oklch, ${colors.gray[12]} 5%, ${colors.gray[3]})`
const elementActive = `color-mix(in oklch, ${colors.gray[12]} 10%, ${colors.gray[3]})`

export const backgroundColor = defineVars({
	app: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[1],
	},
	element: colors.gray[3],
	elementHover,
	elementActive,
})

export const background = {
	app: style({ backgroundColor: backgroundColor.app }),
	subtle: style({ backgroundColor: colors.gray[2] }),
	element: style({ backgroundColor: backgroundColor.element }),
	elementHover: style({ backgroundColor: backgroundColor.elementHover }),
	elementActive: style({ backgroundColor: backgroundColor.elementActive }),
	accent: style({ backgroundColor: colors.accent[9] }),
	accentHover: style({ backgroundColor: colors.accent[10] }),
}
