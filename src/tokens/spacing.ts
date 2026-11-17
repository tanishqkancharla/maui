import { defineVars, style, type CSSProperties } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import { memoize } from "../utils/memoize"

const spacingValues = defineVars({
	1: { default: "2px", [LARGE_SCALE]: "3px" },
	2: { default: "4px", [LARGE_SCALE]: "5px" },
	3: { default: "6px", [LARGE_SCALE]: "8px" },
	4: { default: "9px", [LARGE_SCALE]: "12px" },
	6: { default: "12px", [LARGE_SCALE]: "16px" },
	8: { default: "16px", [LARGE_SCALE]: "20px" },
	12: { default: "24px", [LARGE_SCALE]: "30px" },
	16: { default: "32px", [LARGE_SCALE]: "40px" },
})

export type Space = keyof typeof spacingValues

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
	/**
	 * CSS variable for a scale step (not a numeric pixel value). For cases like
	 * `Prose`'s vertical rhythm where neither gap nor padding applies.
	 */
	value: (step: Space) => spacingValues[step],
} as const
