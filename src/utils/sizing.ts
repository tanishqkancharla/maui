import { style } from "purse-styles"

export const sizingTokens = {
	icon: style({ width: "16px", height: "16px" }),
	fullWidth: style({ width: "100%" }),
	contentWidth: style({ maxWidth: "72ch" }),
} as const
