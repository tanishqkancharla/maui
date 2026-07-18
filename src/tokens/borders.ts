import { style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"

export type BorderSide = "top" | "right" | "bottom" | "left"
export type BorderColor = "border" | "outline" | "accent"

const borderColorValues: Record<BorderColor, string> = {
	border: "var(--border)",
	outline: "var(--outline)",
	accent: colors.accent[8],
}

export const border = memoize((sides: BorderSide[], color: BorderColor) => {
	const borderValue = `1px solid ${borderColorValues[color]}`

	return sides.length === 0
		? style({ border: borderValue })
		: style(
				Object.fromEntries(
					sides.map((side) => [`border${capitalize(side)}`, borderValue]),
				) as CSSProperties,
			)
})

function capitalize(value: string) {
	return `${value[0].toUpperCase()}${value.slice(1)}`
}
