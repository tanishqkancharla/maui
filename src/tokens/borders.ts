import { defineVars, style, type CSSProperties } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"

export type BorderSide = "top" | "right" | "bottom" | "left"
export type BorderColor = "border" | "outline" | "accent"

export const borderColor = defineVars({
	border: `oklch(from ${colors.gray[12]} l c h / 0.05)`,
	outline: `oklch(from ${colors.gray[12]} l c h / 0.1)`,
})

const borderColorValues: Record<BorderColor, string> = {
	border: borderColor.border,
	outline: borderColor.outline,
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
