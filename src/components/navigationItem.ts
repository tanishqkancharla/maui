import { style } from "purse-styles"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

export const navigationItem = style(
	spacing.padding({ x: 4, y: 2 }),
	text("sm", 400, "highContrast"),
	radius.sm,
	{
		margin: 0,
		outline: "none",
		cursor: "default",
		userSelect: "none",
		"&:hover": {
			background: backgroundColor.elementHover,
		},
		"&[aria-current='page']": {
			color: colors.accent[9],
			fontWeight: 500,
		},
	},
)
