import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

export const backgroundColor = defineVars({
	app: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[1],
	},
})

// Hover/active follow Craft: mix a little foreground into the element surface
// instead of jumping a full gray step (gray 4 / 5).
const elementHoverColor = `color-mix(in oklch, ${colors.gray[12]} 5%, ${colors.gray[3]})`
const elementActiveColor = `color-mix(in oklch, ${colors.gray[12]} 10%, ${colors.gray[3]})`

export const background = {
	app: style({ backgroundColor: backgroundColor.app }),
	subtle: style({ backgroundColor: colors.gray[2] }),
	element: style({ backgroundColor: colors.gray[3] }),
	elementHover: style({ backgroundColor: elementHoverColor }),
	elementActive: style({ backgroundColor: elementActiveColor }),
	accent: style({ backgroundColor: colors.accent[9] }),
	accentHover: style({ backgroundColor: colors.accent[10] }),
}
