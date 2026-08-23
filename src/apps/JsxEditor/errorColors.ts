import { red, redDark } from "@radix-ui/colors"
import { defineVars } from "purse-styles"
import { DARK_THEME } from "../../theme/dataTheme"

export const errorColors = defineVars({
	3: { default: red.red3, [DARK_THEME]: redDark.red3 },
	6: { default: red.red6, [DARK_THEME]: redDark.red6 },
	9: { default: red.red9, [DARK_THEME]: redDark.red9 },
	11: { default: red.red11, [DARK_THEME]: redDark.red11 },
})
