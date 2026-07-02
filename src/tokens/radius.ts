import { style } from "purse-styles"

export const radius = {
	none: style({ borderRadius: 0 }),
	indicator: style({ borderRadius: "2px" }),
	swatch: style({ borderRadius: "3px" }),
	control: style({ borderRadius: "4px" }),
	panel: style({ borderRadius: "6px" }),
	switch: style({ borderRadius: "8px" }),
	pill: style({ borderRadius: "999px" }),
	circle: style({ borderRadius: "100%" }),
} as const
