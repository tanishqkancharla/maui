import { style, type CSSProperties, type StyleElement } from "purse-styles"

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

const paddingCache = new Map<string, StyleElement>()

function padding(options: PaddingOptions) {
	const key = JSON.stringify(options)
	const cached = paddingCache.get(key)

	if (cached) {
		return cached
	}

	const paddingStyle = style({
		padding: options.all === undefined ? undefined : spacingValues[options.all],
		paddingInline: options.x === undefined ? undefined : spacingValues[options.x],
		paddingBlock: options.y === undefined ? undefined : spacingValues[options.y],
		paddingTop: options.top === undefined ? undefined : spacingValues[options.top],
		paddingRight:
			options.right === undefined ? undefined : spacingValues[options.right],
		paddingBottom:
			options.bottom === undefined ? undefined : spacingValues[options.bottom],
		paddingLeft: options.left === undefined ? undefined : spacingValues[options.left],
	} as CSSProperties)

	paddingCache.set(key, paddingStyle)
	return paddingStyle
}

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
