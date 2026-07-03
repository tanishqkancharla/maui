import { style } from "purse-styles"

export const radius = {
	none: style({ borderRadius: 0 }),
	"2xs": style({ borderRadius: "2px" }),
	xs: style({ borderRadius: "3px" }),
	sm: style({ borderRadius: "4px" }),
	md: style({ borderRadius: "6px" }),
	lg: style({ borderRadius: "8px" }),
	pill: style({ borderRadius: "999px" }),
	circle: style({ borderRadius: "100%" }),
} as const
