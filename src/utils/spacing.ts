import { style } from "purse-styles"

const spacingValues = {
	1: "2px",
	2: "4px",
	3: "6px",
	4: "8px",
	6: "12px",
	8: "16px",
	12: "24px",
	16: "32px",
} as const

export const spacing = {
	gap: {
		1: style({ gap: spacingValues[1] }),
		2: style({ gap: spacingValues[2] }),
		3: style({ gap: spacingValues[3] }),
		4: style({ gap: spacingValues[4] }),
		6: style({ gap: spacingValues[6] }),
		8: style({ gap: spacingValues[8] }),
		12: style({ gap: spacingValues[12] }),
		16: style({ gap: spacingValues[16] }),
	},
	padding: {
		1: style({ padding: spacingValues[1] }),
		2: style({ padding: spacingValues[2] }),
		3: style({ padding: spacingValues[3] }),
		4: style({ padding: spacingValues[4] }),
		6: style({ padding: spacingValues[6] }),
		8: style({ padding: spacingValues[8] }),
		12: style({ padding: spacingValues[12] }),
		16: style({ padding: spacingValues[16] }),
	},
} as const
