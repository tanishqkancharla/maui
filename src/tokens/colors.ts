import { defineVars } from "purse-styles"

const DARK = "@media (prefers-color-scheme: dark)"

const accent = defineVars({
	1: { default: "hsl(240, 33.3%, 99.4%)", [DARK]: "hsl(250, 20%, 10.2%)" },
	2: { default: "hsl(225, 100%, 98.4%)", [DARK]: "hsl(255, 30.3%, 12.9%)" },
	3: { default: "hsl(222, 89.5%, 96.3%)", [DARK]: "hsl(253, 37%, 18.4%)" },
	4: { default: "hsl(219, 85.2%, 94.7%)", [DARK]: "hsl(252, 40.1%, 22.5%)" },
	5: { default: "hsl(219, 77.4%, 92.1%)", [DARK]: "hsl(252, 42.2%, 26.2%)" },
	6: { default: "hsl(221, 68.6%, 88.8%)", [DARK]: "hsl(251, 44.3%, 31.1%)" },
	7: { default: "hsl(224, 64.7%, 83.9%)", [DARK]: "hsl(250, 46.8%, 38.9%)" },
	8: { default: "hsl(226, 62.7%, 76.3%)", [DARK]: "hsl(250, 51.8%, 51.2%)" },
	9: { default: "hsl(226, 70%, 55.5%)", [DARK]: "hsl(252, 56%, 57.5%)" },
	10: { default: "hsl(226, 58.6%, 51.3%)", [DARK]: "hsl(251, 63.2%, 63.2%)" },
	11: { default: "hsl(226, 55%, 45%)", [DARK]: "hsl(250, 95%, 76.8%)" },
	12: { default: "hsl(226, 62%, 17%)", [DARK]: "hsl(252, 87%, 96.4%)" },
})

const accentAlpha = defineVars({
	1: { default: "#0000ff02", [DARK]: "hsla(0, 0%, 0%, 0)" },
	2: { default: "#0040ff0a", [DARK]: "hsla(258, 98.2%, 61%, 0.054)" },
	3: { default: "#0047f112", [DARK]: "hsla(252, 98.8%, 65.8%, 0.148)" },
	4: { default: "#0044ff1a", [DARK]: "hsla(253, 99.7%, 65.7%, 0.219)" },
	5: { default: "#0044e824", [DARK]: "hsla(252, 99.7%, 66.4%, 0.286)" },
	6: { default: "#003fe735", [DARK]: "hsla(251, 99.7%, 66.2%, 0.371)" },
	7: { default: "#0037d64d", [DARK]: "hsla(250, 99.7%, 66.3%, 0.514)" },
	8: { default: "#0034d273", [DARK]: "hsla(250, 99.7%, 66.1%, 0.733)" },
	9: { default: "#0031d2a4", [DARK]: "hsla(252, 99.9%, 70.3%, 0.786)" },
	10: { default: "#002ab3ae", [DARK]: "hsla(251, 99.9%, 72.9%, 0.844)" },
	11: { default: "#002c9fc2", [DARK]: "hsla(250, 100%, 77.9%, 0.98)" },
	12: { default: "#00115ee3", [DARK]: "hsla(254, 100%, 97.5%, 0.98)" },
})

const gray = defineVars({
	1: { default: "#fcfcfc", [DARK]: "#111111" },
	2: { default: "#f9f9f9", [DARK]: "#191919" },
	3: { default: "#f0f0f0", [DARK]: "#222222" },
	4: { default: "#e8e8e8", [DARK]: "#2a2a2a" },
	5: { default: "#e0e0e0", [DARK]: "#313131" },
	6: { default: "#d9d9d9", [DARK]: "#3a3a3a" },
	7: { default: "#cecece", [DARK]: "#484848" },
	8: { default: "#bbbbbb", [DARK]: "#606060" },
	9: { default: "#8d8d8d", [DARK]: "#6e6e6e" },
	10: { default: "#838383", [DARK]: "#7b7b7b" },
	11: { default: "#646464", [DARK]: "#b4b4b4" },
	12: { default: "#202020", [DARK]: "#eeeeee" },
})

const grayAlpha = defineVars({
	1: { default: "#00000003", [DARK]: "#00000000" },
	2: { default: "#00000006", [DARK]: "#ffffff09" },
	3: { default: "#0000000f", [DARK]: "#ffffff12" },
	4: { default: "#00000017", [DARK]: "#ffffff1b" },
	5: { default: "#0000001f", [DARK]: "#ffffff22" },
	6: { default: "#00000026", [DARK]: "#ffffff2c" },
	7: { default: "#00000031", [DARK]: "#ffffff3b" },
	8: { default: "#00000044", [DARK]: "#ffffff55" },
	9: { default: "#00000072", [DARK]: "#ffffff64" },
	10: { default: "#0000007c", [DARK]: "#ffffff72" },
	11: { default: "#0000009b", [DARK]: "#ffffffaf" },
	12: { default: "#000000df", [DARK]: "#ffffffed" },
})

export const colors = {
	accent,
	accentAlpha,
	gray,
	grayAlpha,
}
