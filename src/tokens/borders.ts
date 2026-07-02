import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"

export type BorderSide = "top" | "right" | "bottom" | "left"
export type BorderColor = "subtle" | "divider" | "accent"
export type BorderWidth = 1 | 2

const borderColorValues: Record<BorderColor, string> = {
	subtle: "var(--sand-6)",
	divider: "var(--sand-5)",
	accent: "var(--accent-8)",
}

export const border = memoize(
	(sides: BorderSide[], color: BorderColor, width: BorderWidth = 1) => {
		const borderValue = `${width}px solid ${borderColorValues[color]}`

		return sides.length === 0
			? style({ border: borderValue })
			: style(
					Object.fromEntries(
						sides.map((side) => [`border${capitalize(side)}`, borderValue]),
					) as CSSProperties,
				)
	},
)

function capitalize(value: string) {
	return `${value[0].toUpperCase()}${value.slice(1)}`
}
