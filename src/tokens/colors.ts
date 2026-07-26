import { defineVars } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"

// Classic Radix light ramps (not shifted). Dark values unchanged.
const accent = defineVars({
	1: { default: "hsl(240, 33.3%, 99.4%)", [DARK_THEME]: "hsl(250, 20%, 10.2%)" },
	2: { default: "hsl(225, 100%, 98.4%)", [DARK_THEME]: "hsl(255, 30.3%, 12.9%)" },
	3: { default: "hsl(222, 89.5%, 96.3%)", [DARK_THEME]: "hsl(253, 37%, 18.4%)" },
	4: { default: "hsl(219, 85.2%, 94.7%)", [DARK_THEME]: "hsl(252, 40.1%, 22.5%)" },
	5: { default: "hsl(219, 77.4%, 92.1%)", [DARK_THEME]: "hsl(252, 42.2%, 26.2%)" },
	6: { default: "hsl(221, 68.6%, 88.8%)", [DARK_THEME]: "hsl(251, 44.3%, 31.1%)" },
	7: { default: "hsl(224, 64.7%, 83.9%)", [DARK_THEME]: "hsl(250, 46.8%, 38.9%)" },
	8: { default: "hsl(226, 62.7%, 76.3%)", [DARK_THEME]: "hsl(250, 51.8%, 51.2%)" },
	9: { default: "hsl(226, 70%, 55.5%)", [DARK_THEME]: "hsl(252, 56%, 57.5%)" },
	10: { default: "hsl(226, 58.6%, 51.3%)", [DARK_THEME]: "hsl(251, 63.2%, 63.2%)" },
	11: { default: "hsl(226, 55%, 45%)", [DARK_THEME]: "hsl(250, 95%, 76.8%)" },
	12: { default: "hsl(226, 62%, 17%)", [DARK_THEME]: "hsl(252, 87%, 96.4%)" },
})

const accentAlpha = defineVars({
	1: { default: "#0000ff02", [DARK_THEME]: "hsla(0, 0%, 0%, 0)" },
	2: { default: "#0040ff0a", [DARK_THEME]: "hsla(258, 98.2%, 61%, 0.054)" },
	3: { default: "#0047f112", [DARK_THEME]: "hsla(252, 98.8%, 65.8%, 0.148)" },
	4: { default: "#0044ff1a", [DARK_THEME]: "hsla(253, 99.7%, 65.7%, 0.219)" },
	5: { default: "#0044e824", [DARK_THEME]: "hsla(252, 99.7%, 66.4%, 0.286)" },
	6: { default: "#003fe735", [DARK_THEME]: "hsla(251, 99.7%, 66.2%, 0.371)" },
	7: { default: "#0037d64d", [DARK_THEME]: "hsla(250, 99.7%, 66.3%, 0.514)" },
	8: { default: "#0034d273", [DARK_THEME]: "hsla(250, 99.7%, 66.1%, 0.733)" },
	9: { default: "#0031d2a4", [DARK_THEME]: "hsla(252, 99.9%, 70.3%, 0.786)" },
	10: { default: "#002ab3ae", [DARK_THEME]: "hsla(251, 99.9%, 72.9%, 0.844)" },
	11: { default: "#002c9fc2", [DARK_THEME]: "hsla(250, 100%, 77.9%, 0.98)" },
	12: { default: "#00115ee3", [DARK_THEME]: "hsla(254, 100%, 97.5%, 0.98)" },
})

const gray = defineVars({
	1: { default: "#fcfcfc", [DARK_THEME]: "#111111" },
	2: { default: "#f9f9f9", [DARK_THEME]: "#191919" },
	3: { default: "#f0f0f0", [DARK_THEME]: "#222222" },
	4: { default: "#e8e8e8", [DARK_THEME]: "#2a2a2a" },
	5: { default: "#e0e0e0", [DARK_THEME]: "#313131" },
	6: { default: "#d9d9d9", [DARK_THEME]: "#3a3a3a" },
	7: { default: "#cecece", [DARK_THEME]: "#484848" },
	8: { default: "#bbbbbb", [DARK_THEME]: "#606060" },
	9: { default: "#8d8d8d", [DARK_THEME]: "#6e6e6e" },
	10: { default: "#838383", [DARK_THEME]: "#7b7b7b" },
	11: { default: "#646464", [DARK_THEME]: "#b4b4b4" },
	12: { default: "#202020", [DARK_THEME]: "#eeeeee" },
})

const grayAlpha = defineVars({
	1: { default: "#00000003", [DARK_THEME]: "#00000000" },
	2: { default: "#00000006", [DARK_THEME]: "#ffffff09" },
	3: { default: "#0000000f", [DARK_THEME]: "#ffffff12" },
	4: { default: "#00000017", [DARK_THEME]: "#ffffff1b" },
	5: { default: "#0000001f", [DARK_THEME]: "#ffffff22" },
	6: { default: "#00000026", [DARK_THEME]: "#ffffff2c" },
	7: { default: "#00000031", [DARK_THEME]: "#ffffff3b" },
	8: { default: "#00000044", [DARK_THEME]: "#ffffff55" },
	9: { default: "#00000072", [DARK_THEME]: "#ffffff64" },
	10: { default: "#0000007c", [DARK_THEME]: "#ffffff72" },
	11: { default: "#0000009b", [DARK_THEME]: "#ffffffaf" },
	12: { default: "#000000df", [DARK_THEME]: "#ffffffed" },
})

export const colors = {
	accent,
	accentAlpha,
	gray,
	grayAlpha,
}
