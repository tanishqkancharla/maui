import { defineVars, style } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "./colors"

export const backgroundColor = defineVars({
	app: {
		default: "#ffffff",
		[DARK_THEME]: colors.gray[1],
	},
})

export const background = {
	app: style({ backgroundColor: backgroundColor.app }),
	subtle: style({ backgroundColor: colors.gray[2] }),
	element: style({ backgroundColor: colors.gray[3] }),
	elementHover: style({ backgroundColor: colors.gray[4] }),
	elementActive: style({ backgroundColor: colors.gray[5] }),
	accent: style({ backgroundColor: colors.accent[9] }),
	accentHover: style({ backgroundColor: colors.accent[10] }),
}
