import { style } from "@vanilla-extract/css"
import dedent from "dedent"
import { colors } from "../utils/colors"
import { baseStyles } from "../utils/styles.css"

const divider = style({
	border: "none",
	borderTop: "1px solid rgb(62 62 58)",
	margin: 0,
	width: "100%",
})

const commandLine = style([
	{
		padding: "6px 10px",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
	baseStyles.bodyText,
])

const prompt = style({
	color: colors.accent.purple9,
	flex: "0 0 auto",
})

const shadows = {
	medium: (hslShadowColor: string) =>
		style({
			boxShadow: dedent(`
        0px -0.5px 0.6px hsl(${hslShadowColor} / 0.36) inset,
        0px -1.6px 1.8px -0.8px hsl(${hslShadowColor} / 0.36) inset,
        0px -4px 4.5px -1.7px hsl(${hslShadowColor} / 0.36) inset,
        0px -9.7px 10.9px -2.5px hsl(${hslShadowColor} / 0.36) inset
      `),
		}),
}

const history = style([
	shadows.medium("0deg 0% 16%"),
	{
		height: 180,
		display: "flex",
		flexDirection: "column-reverse",
		overflowY: "scroll",
	},
])

const input = style([
	baseStyles.bodyText,
	{
		flex: "1 1 auto",
		backgroundColor: "transparent",
		color: "white",
		border: "none",
		outline: "none",
		margin: 0,
		padding: 0,
		"::placeholder": {
			color: colors.base.sand8,
		},
	},
])

const error = style([
	baseStyles.bodyText,
	{
		color: "hsl(358 75% 59%)",
		margin: "0",
		padding: "6px 10px",
	},
])

const cli = style({
	border: "1px solid rgb(62 62 58)",
	display: "flex",
	flexDirection: "column",
	borderRadius: 4,
	maxWidth: 240,
})

export const cliExperimentStyles = {
	divider,
	commandLine,
	prompt,
	history,
	input,
	error,
	cli,
}
