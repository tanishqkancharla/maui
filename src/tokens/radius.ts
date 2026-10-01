import { defineVars, style } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"

const values = defineVars({
	"2xs": { default: "2px", [LARGE_SCALE]: "3px" },
	xs: { default: "3px", [LARGE_SCALE]: "4px" },
	sm: { default: "4px", [LARGE_SCALE]: "6px" },
	md: { default: "6px", [LARGE_SCALE]: "8px" },
	lg: { default: "8px", [LARGE_SCALE]: "12px" },
	xl: { default: "12px", [LARGE_SCALE]: "16px" },
})

export const radius = {
	none: style({ borderRadius: 0 }),
	"2xs": style({ borderRadius: values["2xs"] }),
	xs: style({ borderRadius: values.xs }),
	sm: style({ borderRadius: values.sm }),
	md: style({ borderRadius: values.md }),
	lg: style({ borderRadius: values.lg }),
	xl: style({ borderRadius: values.xl }),
	pill: style({ borderRadius: "999px" }),
	circle: style({ borderRadius: "100%" }),
} as const
