import {
	gray as grayLight,
	grayA as grayLightA,
	grayDark,
	grayDarkA,
	teal as tealLight,
	tealA as tealLightA,
	violetDark,
	violetDarkA,
} from "@radix-ui/colors"
import { defineVars } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"

const accent = defineVars({
	1: { default: tealLight.teal1, [DARK_THEME]: violetDark.violet1 },
	2: { default: tealLight.teal2, [DARK_THEME]: violetDark.violet2 },
	3: { default: tealLight.teal3, [DARK_THEME]: violetDark.violet3 },
	4: { default: tealLight.teal4, [DARK_THEME]: violetDark.violet4 },
	5: { default: tealLight.teal5, [DARK_THEME]: violetDark.violet5 },
	6: { default: tealLight.teal6, [DARK_THEME]: violetDark.violet6 },
	7: { default: tealLight.teal7, [DARK_THEME]: violetDark.violet7 },
	8: { default: tealLight.teal8, [DARK_THEME]: violetDark.violet8 },
	9: { default: tealLight.teal9, [DARK_THEME]: violetDark.violet9 },
	10: { default: tealLight.teal10, [DARK_THEME]: violetDark.violet10 },
	11: { default: tealLight.teal11, [DARK_THEME]: violetDark.violet11 },
	12: { default: tealLight.teal12, [DARK_THEME]: violetDark.violet12 },
})

const accentAlpha = defineVars({
	1: { default: tealLightA.tealA1, [DARK_THEME]: violetDarkA.violetA1 },
	2: { default: tealLightA.tealA2, [DARK_THEME]: violetDarkA.violetA2 },
	3: { default: tealLightA.tealA3, [DARK_THEME]: violetDarkA.violetA3 },
	4: { default: tealLightA.tealA4, [DARK_THEME]: violetDarkA.violetA4 },
	5: { default: tealLightA.tealA5, [DARK_THEME]: violetDarkA.violetA5 },
	6: { default: tealLightA.tealA6, [DARK_THEME]: violetDarkA.violetA6 },
	7: { default: tealLightA.tealA7, [DARK_THEME]: violetDarkA.violetA7 },
	8: { default: tealLightA.tealA8, [DARK_THEME]: violetDarkA.violetA8 },
	9: { default: tealLightA.tealA9, [DARK_THEME]: violetDarkA.violetA9 },
	10: { default: tealLightA.tealA10, [DARK_THEME]: violetDarkA.violetA10 },
	11: { default: tealLightA.tealA11, [DARK_THEME]: violetDarkA.violetA11 },
	12: { default: tealLightA.tealA12, [DARK_THEME]: violetDarkA.violetA12 },
})

const gray = defineVars({
	1: { default: grayLight.gray1, [DARK_THEME]: grayDark.gray1 },
	2: { default: grayLight.gray2, [DARK_THEME]: grayDark.gray2 },
	3: { default: grayLight.gray3, [DARK_THEME]: grayDark.gray3 },
	4: { default: grayLight.gray4, [DARK_THEME]: grayDark.gray4 },
	5: { default: grayLight.gray5, [DARK_THEME]: grayDark.gray5 },
	6: { default: grayLight.gray6, [DARK_THEME]: grayDark.gray6 },
	7: { default: grayLight.gray7, [DARK_THEME]: grayDark.gray7 },
	8: { default: grayLight.gray8, [DARK_THEME]: grayDark.gray8 },
	9: { default: grayLight.gray9, [DARK_THEME]: grayDark.gray9 },
	10: { default: grayLight.gray10, [DARK_THEME]: grayDark.gray10 },
	11: { default: grayLight.gray11, [DARK_THEME]: grayDark.gray11 },
	12: { default: grayLight.gray12, [DARK_THEME]: grayDark.gray12 },
})

const grayAlpha = defineVars({
	1: { default: grayLightA.grayA1, [DARK_THEME]: grayDarkA.grayA1 },
	2: { default: grayLightA.grayA2, [DARK_THEME]: grayDarkA.grayA2 },
	3: { default: grayLightA.grayA3, [DARK_THEME]: grayDarkA.grayA3 },
	4: { default: grayLightA.grayA4, [DARK_THEME]: grayDarkA.grayA4 },
	5: { default: grayLightA.grayA5, [DARK_THEME]: grayDarkA.grayA5 },
	6: { default: grayLightA.grayA6, [DARK_THEME]: grayDarkA.grayA6 },
	7: { default: grayLightA.grayA7, [DARK_THEME]: grayDarkA.grayA7 },
	8: { default: grayLightA.grayA8, [DARK_THEME]: grayDarkA.grayA8 },
	9: { default: grayLightA.grayA9, [DARK_THEME]: grayDarkA.grayA9 },
	10: { default: grayLightA.grayA10, [DARK_THEME]: grayDarkA.grayA10 },
	11: { default: grayLightA.grayA11, [DARK_THEME]: grayDarkA.grayA11 },
	12: { default: grayLightA.grayA12, [DARK_THEME]: grayDarkA.grayA12 },
})

export const colors = {
	accent,
	accentAlpha,
	gray,
	grayAlpha,
}
