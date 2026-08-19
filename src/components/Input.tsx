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
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { Icons } from "./Icons"

const inputText = text("sm", 400, "highContrast")
const numberFieldDivider = `color-mix(in oklch, ${colors.gray[12]} 5%, ${backgroundColor.element})`

const inputClass = style(
	inputText,
	focusRing("&:focus-visible", shadowVars.subtle),
	motion.standard("background", "border-color"),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	shadow.subtle,
	{
		width: "100%",
		minWidth: 0,
		height: "28px",
		color: colors.gray[12],
		border: "none",
		background: backgroundColor.element,
		"&:hover:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"&:disabled": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&[aria-invalid='true']:not(:focus-visible)": {
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.subtle}`,
		},
		"&::placeholder": {
			fontStyle: "italic",
			color: colors.gray[8],
		},
	},
)

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
	"& input::-webkit-search-cancel-button": {
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
	focusRing("&:has(:focus-visible)", shadowVars.subtle),
	motion.standard("background", "border-color"),
	radius.sm,
	shadow.subtle,
	{
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: "28px",
		overflow: "hidden",
		color: colors.gray[12],
		background: backgroundColor.element,
		"&:has(input:disabled)": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&:has(input[aria-invalid='true']):not(:has(:focus-visible))": {
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.subtle}`,
		},
		"& .number-stepper": {
			display: "flex",
			alignSelf: "stretch",
		},
		"& button": {
			display: "flex",
			placeItems: "center",
			justifyContent: "center",
			width: "24px",
			border: "none",
			borderLeft: `1px solid ${numberFieldDivider}`,
			background: "transparent",
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
		"& button:hover:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"& button:active:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"& button:disabled": {
			color: colors.gray[8],
		},
	},
)

const numberInputClass = style(
	inputText,
	spacing.padding({ x: 4, y: 2 }),
	{
		flex: "1 1 auto",
		width: "100%",
		minWidth: 0,
		color: "inherit",
		border: "none",
		outline: "none",
		background: "transparent",
		"&:hover:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"&::placeholder": {
			fontStyle: "italic",
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
	const inputClassName = useStyles(numberInputClass)
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

const quietInputClass = style(
	inputText,
	focusRing(),
	motion.standard("background", "border-color"),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	{
		width: "100%",
		minWidth: 0,
		height: "28px",
		color: colors.gray[12],
		background: "transparent",
		border: "none",
		"&:hover:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"&:disabled": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&[aria-invalid='true']:not(:focus-visible)": {
			boxShadow: "0 0 0 1px light-dark(#ce2c31, #e5484d)",
		},
		"&::placeholder": {
			fontStyle: "italic",
			color: colors.gray[8],
		},
	},
)

export function QuietTextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	const className = useStyles(quietInputClass)

	return <input className={className} {...inputProps} />
}
