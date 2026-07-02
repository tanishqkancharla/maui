import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"

const spacingValues = {
	1: "2px",
	2: "4px",
	3: "6px",
	4: "9px",
	6: "12px",
	8: "16px",
	12: "24px",
	16: "32px",
} as const

type Space = keyof typeof spacingValues

type PaddingOptions = {
	all?: Space
	x?: Space
	y?: Space
	top?: Space
	right?: Space
	bottom?: Space
	left?: Space
}

const padding = memoize((options: PaddingOptions) =>
	style({
		padding: options.all === undefined ? undefined : spacingValues[options.all],
		paddingInline: options.x === undefined ? undefined : spacingValues[options.x],
		paddingBlock: options.y === undefined ? undefined : spacingValues[options.y],
		paddingTop: options.top === undefined ? undefined : spacingValues[options.top],
		paddingRight:
			options.right === undefined ? undefined : spacingValues[options.right],
		paddingBottom:
			options.bottom === undefined ? undefined : spacingValues[options.bottom],
		paddingLeft: options.left === undefined ? undefined : spacingValues[options.left],
	} as CSSProperties),
)

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
	padding,
} as const
