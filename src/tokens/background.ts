import { defineVars, style } from "purse-styles"
import { colors } from "./colors"

const DARK = "@media (prefers-color-scheme: dark)"

export const backgroundColor = defineVars({
	app: {
		default: "#ffffff",
		[DARK]: colors.gray[1],
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
