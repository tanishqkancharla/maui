import { useStyles } from "purse-styles"
import type React from "react"
import {
	monospace as monospaceClass,
	text,
	type TextColor,
	type TextSize,
	type TextWeight,
} from "../tokens/text"
import { cls } from "../utils/cls"

export type TextProps = Omit<
	React.ComponentPropsWithoutRef<"span">,
	"color"
> & {
	size?: TextSize
	fontWeight?: TextWeight
	color?: TextColor
	monospace?: boolean
}

// Inline text primitive: a span whose type treatment is set with the same
// size / weight / color axes as `text(...)`, plus an optional monospace stack.
// Defaults match `baseTextStyle` (md / 400 / highContrast).
export function Text({
	size = "md",
	fontWeight = 400,
	color = "highContrast",
	monospace,
	className,
	children,
	...props
}: TextProps) {
	const textClassName = useStyles(
		text(size, fontWeight, color),
		monospace ? monospaceClass : undefined,
	)

	return (
		<span {...props} className={cls(textClassName, className)}>
			{children}
		</span>
	)
}
