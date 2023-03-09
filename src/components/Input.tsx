import { sandDark, violetDark } from "@radix-ui/colors"
import { useRef } from "react"
import { AriaTextFieldOptions, useTextField } from "react-aria"
import { baseStyles } from "../utils/purseStyles"
import { style } from "../utils/styles"

const inputClass = style(baseStyles.bodyText, {
	background: sandDark.sand3,
	width: "100%",
	color: "white",
	padding: "6px 8px",
	borderRadius: "4px",
	height: "28px",
	border: `1px solid ${sandDark.sand6}`,
	transition: "border-color 80ms ease-in-out",
	":focus": {
		border: `1px solid ${violetDark.violet8}`,
		outline: "none",
	},
	":hover": {
		background: sandDark.sand4,
	},

	"::placeholder": {
		fontStyle: "italic",
		color: sandDark.sand8,
	},
})

type InputProps = AriaTextFieldOptions<"input">

export function TextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	return <input className={inputClass} ref={ref} {...inputProps} />
}

const quietInputClass = style(baseStyles.bodyText, {
	flex: "1 1 auto",
	backgroundColor: "transparent",
	color: "white",
	border: "none",
	outline: "none",
	margin: 0,
	padding: 0,
	"::placeholder": {
		fontStyle: "italic",
		color: sandDark.sand8,
	},
})

export function QuietTextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)

	return <input className={quietInputClass} {...inputProps} />
}
