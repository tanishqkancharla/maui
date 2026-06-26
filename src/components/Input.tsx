import { sandDark } from "@radix-ui/colors"
import { useRef } from "react"
import {
	AriaNumberFieldProps,
	AriaSearchFieldProps,
	AriaTextFieldOptions,
	useLocale,
	useNumberField,
	useSearchField,
	useTextField,
} from "react-aria"
import { useNumberFieldState, useSearchFieldState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { baseStyles } from "../utils/purseStyles"
import { focusRing } from "../utils/focusRing"

const inputClass = style(baseStyles.bodyText, focusRing(), {
	background: sandDark.sand3,
	width: "100%",
	color: "white",
	padding: "6px 8px",
	borderRadius: "4px",
	height: "28px",
	border: `1px solid ${sandDark.sand6}`,
	transition: "border-color 80ms ease-in-out",
	"&:hover": {
		background: sandDark.sand4,
	},

	"&::placeholder": {
		fontStyle: "italic",
		color: sandDark.sand8,
	},
})

type InputProps = AriaTextFieldOptions<"input">

export function TextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	const className = useStyles(inputClass)
	return <input className={className} ref={ref} {...inputProps} />
}

const searchFieldClass = style(focusRing("& button:focus-visible"), {
	display: "flex",
	alignItems: "center",
	width: "100%",
	gap: "6px",
	"& input": {
		flex: "1 1 auto",
		minWidth: 0,
	},
	"& button": {
		width: "20px",
		height: "20px",
		border: "none",
		borderRadius: "4px",
		background: "var(--sand-6)",
		color: "var(--sand-12)",
		lineHeight: "18px",
		padding: 0,
	},
	"& button:hover": {
		background: "var(--sand-7)",
	},
})

export function SearchField(props: AriaSearchFieldProps) {
	const ref = useRef<HTMLInputElement>(null)
	const state = useSearchFieldState(props)
	const { inputProps, clearButtonProps } = useSearchField(props, state, ref)
	const inputClassName = useStyles(inputClass)
	const searchClassName = useStyles(searchFieldClass)

	return (
		<div className={searchClassName}>
			<input className={inputClassName} ref={ref} {...inputProps} />
			{state.value !== "" && (
				<button {...clearButtonProps} type="button">
					×
				</button>
			)}
		</div>
	)
}

const numberFieldClass = style(focusRing("& button:focus-visible"), {
	display: "flex",
	alignItems: "center",
	width: "100%",
	"& input": {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	"& .number-stepper": {
		display: "flex",
		flexDirection: "column",
		height: "28px",
	},
	"& button": {
		width: "24px",
		flex: "1 1 0",
		border: `1px solid ${sandDark.sand6}`,
		borderLeft: "none",
		background: "var(--sand-4)",
		color: "var(--sand-12)",
		fontSize: "9px",
		lineHeight: "10px",
		padding: 0,
	},
	"& button:first-child": {
		borderTopRightRadius: "4px",
		borderBottom: "none",
	},
	"& button:last-child": {
		borderBottomRightRadius: "4px",
	},
	"& button:hover": {
		background: "var(--sand-5)",
	},
	"& button:disabled": {
		color: "var(--sand-8)",
	},
})

export function NumberField(props: AriaNumberFieldProps) {
	const ref = useRef<HTMLInputElement>(null)
	const { locale } = useLocale()
	const state = useNumberFieldState({ ...props, locale })
	const { inputProps, groupProps, incrementButtonProps, decrementButtonProps } =
		useNumberField(props, state, ref)
	const inputClassName = useStyles(inputClass)
	const numberClassName = useStyles(numberFieldClass)

	return (
		<div className={numberClassName} {...groupProps}>
			<input className={inputClassName} ref={ref} {...inputProps} />
			<div className="number-stepper">
				<button {...incrementButtonProps} type="button">
					▲
				</button>
				<button {...decrementButtonProps} type="button">
					▼
				</button>
			</div>
		</div>
	)
}

const quietInputClass = style(baseStyles.bodyText, focusRing(), {
	flex: "1 1 auto",
	backgroundColor: "transparent",
	color: "white",
	border: "none",
	margin: 0,
	padding: 0,
	"&::placeholder": {
		fontStyle: "italic",
		color: sandDark.sand8,
	},
})

export function QuietTextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	const className = useStyles(quietInputClass)

	return <input className={className} {...inputProps} />
}
