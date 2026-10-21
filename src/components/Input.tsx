import { useRef, useState, type Ref } from "react"
import {
	AriaNumberFieldProps,
	AriaSearchFieldProps,
	AriaTextFieldOptions,
	mergeProps,
	useButton,
	useLocale,
	useNumberField,
	useObjectRef,
	useSearchField,
	useTextField,
} from "react-aria"
import { useNumberFieldState, useSearchFieldState } from "react-stately"
import { defineVars, style, useStyles } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { controlSize, iconSizeValues } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { monospace, text } from "../tokens/text"
import { CircleX, Minus, Plus } from "../icons"
import { memoize } from "../utils/memoize"
import { Kbd } from "./Code"

const inputText = text({ size: "sm", fontWeight: 400, color: "highContrast" })
const numberFieldDivider = `color-mix(in oklch, ${colors.gray[12]} 5%, ${backgroundColor.element})`

const inputClass = style(
	inputText,
	focusRing("&:focus-visible", shadowVars.control),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	shadow.control,
	{
		width: "100%",
		minWidth: 0,
		height: controlSize.height,
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
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.control}`,
		},
		"&::placeholder": {
			fontStyle: "italic",
			color: colors.gray[8],
		},
	},
)

const smallInputClass = style(spacing.padding({ x: 3 }), {
	height: controlSize.smHeight,
	paddingBlock: 0,
})

const fieldClass = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(2),
	width: "100%",
	minWidth: 0,
})

const errorClass = style(
	text({ size: "xs", fontWeight: 400, color: "highContrast" }),
	{
		color: "light-dark(#ce2c31, #e5484d)",
	},
)

type KeyboardHintProps = {
	/** A single-character shortcut displayed at the inline end while unfocused. */
	keyboardHint?: string
}

type BaseTextFieldProps = AriaTextFieldOptions<"input"> & KeyboardHintProps
export type TextFieldSize = "default" | "sm"
export type TextFieldProps = BaseTextFieldProps & {
	/** `sm` matches `Button size="sm"` for dense rows such as tree items. */
	size?: TextFieldSize
	ref?: Ref<HTMLInputElement>
}
export type SearchFieldProps = AriaSearchFieldProps &
	KeyboardHintProps & {
		"aria-keyshortcuts"?: string
	}

const inputFrameClass = style({
	position: "relative",
	width: "100%",
})

const inputWithHintClass = style({
	paddingRight: "28px",
})

const keyboardHintClass = style(
	monospace,
	{
		position: "absolute",
		top: "50%",
		right: spacing.value(4),
		transform: "translateY(-50%)",
		pointerEvents: "none",
	},
)

function useKeyboardHint() {
	const [isFocused, setIsFocused] = useState(false)
	return {
		isFocused,
		focusProps: {
			onFocus: () => setIsFocused(true),
			onBlur: () => setIsFocused(false),
		},
	}
}

function KeyboardHint(props: { children: string }) {
	const className = useStyles(textFieldStyles.keyboardHint)
	return (
		<Kbd variant="quiet" className={className} aria-hidden="true">
			{props.children}
		</Kbd>
	)
}

/** `root` on the field wrapper; `input` on RAC `Input` (`:hover`, `:disabled`, `aria-invalid`, `:focus-visible`, `::placeholder`); `frame` wraps the input when a keyboard hint is shown; `keyboardHint` on a Maui `Kbd variant="quiet"` inside `frame`; `error` on RAC `FieldError`. */
export const textFieldStyles = {
	root: fieldClass,
	input: memoize(
		({
			size = "default",
			keyboardHint,
		}: Pick<TextFieldProps, "size" | "keyboardHint"> = {}) =>
			style(
				inputClass,
				size === "sm" && smallInputClass,
				keyboardHint ? inputWithHintClass : undefined,
			),
	),
	frame: inputFrameClass,
	keyboardHint: keyboardHintClass,
	error: errorClass,
} as const

export function TextField(props: TextFieldProps) {
	const {
		keyboardHint,
		size = "default",
		ref: forwardedRef,
		...fieldProps
	} = props
	const ref = useObjectRef(forwardedRef)
	const {
		inputProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
		validationDetails,
	} = useTextField(fieldProps, ref)
	const { isFocused, focusProps } = useKeyboardHint()
	const frameClassName = useStyles(textFieldStyles.frame)
	const fieldClassName = useStyles(textFieldStyles.root)
	const errorClassName = useStyles(textFieldStyles.error)
	const className = useStyles(textFieldStyles.input({ size, keyboardHint }))
	const errorMessage =
		typeof fieldProps.errorMessage === "function"
			? fieldProps.errorMessage({
					isInvalid,
					validationErrors,
					validationDetails,
				})
			: fieldProps.errorMessage
	const input = (
		<input
			className={className}
			ref={ref}
			{...mergeProps(inputProps, focusProps)}
		/>
	)
	const control = keyboardHint ? (
		<div className={frameClassName}>
			{input}
			{!isFocused ? <KeyboardHint>{keyboardHint}</KeyboardHint> : null}
		</div>
	) : (
		input
	)

	const showError = isInvalid && errorMessage != null && errorMessage !== ""

	// Keep one wrapper in every state so the input is not remounted, and does
	// not lose focus, when the error appears or disappears while typing. Spans
	// keep the field valid inside a <label>.
	return (
		<span className={fieldClassName}>
			{control}
			{showError ? (
				<span {...errorMessageProps} className={errorClassName}>
					{errorMessage}
				</span>
			) : null}
		</span>
	)
}

const searchFieldSize = defineVars({
	clearSize: { default: "16px", [LARGE_SCALE]: "40px" },
	clearInset: { default: "6px", [LARGE_SCALE]: "0px" },
	padding: { default: "30px", [LARGE_SCALE]: "40px" },
})

const searchFieldClass = style(focusRing("& button:focus-visible"), {
	position: "relative",
	width: "100%",
	"& input": {
		paddingRight: searchFieldSize.padding,
		appearance: "none",
	},
	"& input::-webkit-search-cancel-button": {
		appearance: "none",
	},
	"& button": {
		position: "absolute",
		top: "50%",
		right: searchFieldSize.clearInset,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: searchFieldSize.clearSize,
		height: searchFieldSize.clearSize,
		transform: "translateY(-50%)",
		zIndex: 2,
		border: "none",
		borderRadius: "50%",
		background: "transparent",
		color: colors.gray[9],
		padding: 0,
	},
	"& button svg": {
		width: iconSizeValues.sm,
		height: iconSizeValues.sm,
	},
	"& button:hover": {
		color: colors.gray[12],
	},
})

/** `root` on a wrapper around the input and clear button; it styles its descendant `input` and `button` (the clear button), so it needs that markup; `input` on RAC `Input` (same states as `textFieldStyles.input`); `keyboardHint` on a Maui `Kbd variant="quiet"` inside `root`. */
export const searchFieldStyles = {
	root: searchFieldClass,
	input: inputClass,
	keyboardHint: keyboardHintClass,
} as const

export function SearchField(props: SearchFieldProps) {
	const {
		keyboardHint,
		"aria-keyshortcuts": ariaKeyShortcuts,
		...fieldProps
	} = props
	const ref = useRef<HTMLInputElement>(null)
	const state = useSearchFieldState(fieldProps)
	const { inputProps } = useSearchField(fieldProps, state, ref)
	const { isFocused, focusProps } = useKeyboardHint()
	const inputClassName = useStyles(searchFieldStyles.input)
	const searchClassName = useStyles(searchFieldStyles.root)

	return (
		<div className={searchClassName}>
			<input
				className={inputClassName}
				ref={ref}
				{...mergeProps(inputProps, focusProps)}
				aria-keyshortcuts={ariaKeyShortcuts}
			/>
			{keyboardHint && !isFocused && state.value === "" ? (
				<KeyboardHint>{keyboardHint}</KeyboardHint>
			) : null}
			{state.value !== "" && (
				<button
					aria-label="Clear search"
					type="button"
					onMouseDown={(event) => event.preventDefault()}
					onClick={() => state.setValue("")}
				>
					<CircleX />
				</button>
			)}
		</div>
	)
}

const numberFieldSize = defineVars({
	stepperWidth: { default: "24px", [LARGE_SCALE]: "40px" },
})

const numberFieldClass = style(
	focusRing("&:has(:focus-visible)", shadowVars.control),
	radius.sm,
	shadow.control,
	{
		display: "flex",
		alignItems: "center",
		width: "100%",
		height: controlSize.height,
		overflow: "hidden",
		color: colors.gray[12],
		background: backgroundColor.element,
		"&:has(input:disabled)": {
			color: colors.gray[8],
			background: colors.gray[2],
		},
		"&:has(input[aria-invalid='true']):not(:has(:focus-visible))": {
			boxShadow: `0 0 0 1px light-dark(#ce2c31, #e5484d), ${shadowVars.control}`,
		},
		"& .number-stepper": {
			display: "flex",
			alignSelf: "stretch",
		},
		"& button": {
			display: "flex",
			placeItems: "center",
			justifyContent: "center",
			width: numberFieldSize.stepperWidth,
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
			width: iconSizeValues.xs,
			height: iconSizeValues.xs,
		},
		"& button:hover:not(:disabled), & button:active:not(:disabled)": {
			background: backgroundColor.elementHover,
		},
		"& button:disabled": {
			color: colors.gray[8],
		},
	},
)

const numberInputClass = style(
	text({ size: "sm", fontWeight: 400, color: "highContrast", tabular: true }),
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

/** `root` on RAC `Group`; keys off `:has(:focus-visible)`, `:has(input:disabled)`, `:has(input[aria-invalid='true'])` and styles descendant `button`s inside a `.number-stepper` wrapper, so it needs that markup; `input` on RAC `Input` (`:hover`, `:disabled`, `::placeholder`). */
export const numberFieldStyles = {
	root: numberFieldClass,
	input: numberInputClass,
} as const

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
	const inputClassName = useStyles(numberFieldStyles.input)
	const numberClassName = useStyles(numberFieldStyles.root)

	return (
		<div className={numberClassName} {...groupProps}>
			<input className={inputClassName} ref={ref} {...inputProps} />
			<div className="number-stepper">
				<button {...decrementProps} ref={decrementRef} type="button">
					<Minus />
				</button>
				<button {...incrementProps} ref={incrementRef} type="button">
					<Plus />
				</button>
			</div>
		</div>
	)
}

const quietInputClass = style(
	inputText,
	focusRing(),
	radius.sm,
	spacing.padding({ x: 4, y: 2 }),
	{
		width: "100%",
		minWidth: 0,
		height: controlSize.height,
		color: colors.gray[12],
		background: "transparent",
		border: "none",
		"&:hover:not(:disabled)": {
			background: surfaceWash(colors.gray[12], surfaceMixPercent.hover),
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

/** `input` on RAC `Input` (`:hover`, `:disabled`, `aria-invalid`, `:focus-visible`, `::placeholder`) and is the root when there is no keyboard hint; `frame` wraps the input when a keyboard hint is shown; `keyboardHint` on a Maui `Kbd variant="quiet"` inside `frame`. */
export const quietTextFieldStyles = {
	input: memoize(
		({ keyboardHint }: Pick<BaseTextFieldProps, "keyboardHint"> = {}) =>
			style(quietInputClass, keyboardHint ? inputWithHintClass : undefined),
	),
	frame: inputFrameClass,
	keyboardHint: keyboardHintClass,
} as const

export function QuietTextField(props: BaseTextFieldProps) {
	const { keyboardHint, ...fieldProps } = props
	const ref = useRef<HTMLInputElement>(null)
	const { inputProps } = useTextField(fieldProps, ref)
	const { isFocused, focusProps } = useKeyboardHint()
	const frameClassName = useStyles(quietTextFieldStyles.frame)
	const className = useStyles(quietTextFieldStyles.input({ keyboardHint }))
	const input = (
		<input
			className={className}
			ref={ref}
			{...mergeProps(inputProps, focusProps)}
		/>
	)

	if (!keyboardHint) return input

	return (
		<div className={frameClassName}>
			{input}
			{!isFocused ? <KeyboardHint>{keyboardHint}</KeyboardHint> : null}
		</div>
	)
}
