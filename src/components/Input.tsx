import { useRef } from "react"
import {
	AriaNumberFieldProps,
	AriaSearchFieldProps,
	AriaTextFieldOptions,
	useButton,
	useLocale,
	useNumberField,
	useSearchField,
	useTextField,
} from "react-aria"
import { useNumberFieldState, useSearchFieldState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { shadow } from "../tokens/shadow"
import { text } from "../tokens/text"
import { Icons } from "./Icons"

const inputText = text("sm", 400, "highContrast")

const inputClass = style(inputText, focusRing(), shadow.subtle, {
	background: colors.gray[3],
	width: "100%",
	color: colors.gray[12],
	border: "none",
	padding: "6px 8px",
	borderRadius: "4px",
	height: "28px",
	transition: "border-color 80ms ease-in-out",
	"&:hover": {
		background: colors.gray[4],
	},
	"&::placeholder": {
		fontStyle: "italic",
		color: colors.gray[8],
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
	position: "relative",
	width: "100%",
	"& input": {
		paddingRight: "30px",
		appearance: "none",
	},
	"&:hover input": {
		background: colors.gray[4],
	},
	'& input::-webkit-search-cancel-button': {
		appearance: "none",
	},
	"& button": {
		position: "absolute",
		top: "50%",
		right: "6px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "16px",
		height: "16px",
		transform: "translateY(-50%)",
		zIndex: 2,
		border: "none",
		borderRadius: "50%",
		background: "transparent",
		color: colors.gray[9],
		padding: 0,
	},
	"& button svg": {
		width: "16px",
		height: "16px",
	},
	"& button:hover": {
		color: colors.gray[12],
	},
})

export function SearchField(props: AriaSearchFieldProps) {
	const ref = useRef<HTMLInputElement>(null)
	const state = useSearchFieldState(props)
	const { inputProps } = useSearchField(props, state, ref)
	const inputClassName = useStyles(inputClass)
	const searchClassName = useStyles(searchFieldClass)

	return (
		<div className={searchClassName}>
			<input className={inputClassName} ref={ref} {...inputProps} />
			{state.value !== "" && (
				<button
					aria-label="Clear search"
					type="button"
					onMouseDown={(event) => event.preventDefault()}
					onClick={() => state.setValue("")}
				>
					<Icons.CircleX />
				</button>
			)}
		</div>
	)
}

const numberFieldClass = style(
	focusRing("& button:focus-visible"),
	shadow.subtle,
	{
		display: "flex",
		alignItems: "center",
		width: "100%",
		"& input": {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			boxShadow: "none",
		},
		"& .number-stepper": {
			display: "flex",
			height: "28px",
		},
		"& button": {
			display: "flex",
			placeItems: "center",
			justifyContent: "center",
			width: "24px",
			border: "none",
			borderLeft: `1px solid ${borderColor.border}`,
			background: colors.gray[3],
			color: colors.gray[11],
			padding: 0,
		},
		"& button:first-child": {
			borderRadius: 0,
		},
		"& button:last-child": {
			borderTopRightRadius: "4px",
			borderBottomRightRadius: "4px",
		},
		"& button svg": {
			width: "14px",
			height: "14px",
		},
		"& button:hover": {
			background: colors.gray[4],
		},
		"& button:disabled": {
			color: colors.gray[8],
		},
	},
)

export function NumberField(props: AriaNumberFieldProps) {
	const ref = useRef<HTMLInputElement>(null)
	const incrementRef = useRef<HTMLButtonElement>(null)
	const decrementRef = useRef<HTMLButtonElement>(null)
	const { locale } = useLocale()
	const state = useNumberFieldState({ ...props, locale })
	const { inputProps, groupProps, incrementButtonProps, decrementButtonProps } =
		useNumberField(props, state, ref)
	const { buttonProps: incrementProps } = useButton(
		incrementButtonProps,
		incrementRef,
	)
	const { buttonProps: decrementProps } = useButton(
		decrementButtonProps,
		decrementRef,
	)
	const inputClassName = useStyles(inputClass)
	const numberClassName = useStyles(numberFieldClass)

	return (
		<div className={numberClassName} {...groupProps}>
			<input className={inputClassName} ref={ref} {...inputProps} />
			<div className="number-stepper">
				<button {...decrementProps} ref={decrementRef} type="button">
					<Icons.Minus />
				</button>
				<button {...incrementProps} ref={incrementRef} type="button">
					<Icons.Plus />
				</button>
			</div>
		</div>
	)
}

const quietInputClass = style(inputText, focusRing(), shadow.subtle, {
	width: "100%",
	color: colors.gray[12],
	padding: "6px 8px",
	borderRadius: "4px",
	height: "28px",
	background: "transparent",
	border: "none",
	transition: "background 80ms ease-in-out",
	"&:hover": {
		background: colors.gray[3],
	},
	"&::placeholder": {
		fontStyle: "italic",
		color: colors.gray[8],
	},
})

export function QuietTextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	const className = useStyles(quietInputClass)

	return <input className={className} {...inputProps} />
}
