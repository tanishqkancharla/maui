import { createContext, useContext, useRef } from "react"
import { AriaRadioGroupProps, useRadio, useRadioGroup } from "react-aria"
import { RadioGroupState, useRadioGroupState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { visuallyHidden } from "../tokens/visuallyHidden"
import { Label, P } from "./Typography"

const RadioOptionGroupContext = createContext<RadioGroupState | null>(null)

type RadioOptionGroupProps = AriaRadioGroupProps & {
	label: string
	children: React.ReactNode
}

const radioGroupClass = style(flex({ direction: "column", gap: 3 }))

export function RadioOptionGroup(props: RadioOptionGroupProps) {
	const { label, children, ...radioGroupProps } = props
	const state = useRadioGroupState(radioGroupProps)
	const { radioGroupProps: groupProps, labelProps } = useRadioGroup(
		radioGroupProps,
		state,
	)
	const className = useStyles(radioGroupClass)

	return (
		<RadioOptionGroupContext.Provider value={state}>
			<div className={className} {...groupProps}>
				<Label {...labelProps}>{label}</Label>
				{children}
			</div>
		</RadioOptionGroupContext.Provider>
	)
}

const radioClass = style(
	flex({ align: "center", gap: 3 }),
	focusRing("& .radio-input:focus-visible + .radio-toggle"),
	{
		position: "relative",
		width: "fit-content",
		"&:hover .radio-toggle": {
			backgroundColor: colors.gray[8],
		},
		"& .radio-input:checked + .radio-toggle": {
			backgroundColor: colors.accent[9],
		},
		"& .radio-input:checked + .radio-toggle .radio-dot": {
			transform: "scale(1)",
		},
	},
)

const radioToggleClass = style(
	radius.circle,
	motion.standard("background-color"),
	shadow.subtle,
	{
		pointerEvents: "none",
		position: "relative",
		width: "14px",
		height: "14px",
		backgroundColor: colors.gray[7],
	},
)

const radioDotClass = style(
	radius.circle,
	motion.standard("transform"),
	{
		position: "absolute",
		top: "4px",
		left: "4px",
		width: "6px",
		height: "6px",
		backgroundColor: colors.gray[3],
		transform: "scale(0)",
	},
)

type RadioOptionProps = {
	value: string
	children: React.ReactNode
}

export function RadioOption(props: RadioOptionProps) {
	const state = useContext(RadioOptionGroupContext)
	if (!state) {
		throw new Error("RadioOption must be used within a RadioOptionGroup")
	}

	const ref = useRef<HTMLInputElement>(null)
	const { inputProps, labelProps } = useRadio(props, state, ref)
	const className = useStyles(radioClass)
	const inputClassName = useStyles(visuallyHidden)
	const toggleClassName = useStyles(radioToggleClass)
	const dotClassName = useStyles(radioDotClass)

	return (
		<label className={className} {...labelProps}>
			<input
				{...inputProps}
				className={`${inputClassName} radio-input`}
				ref={ref}
			/>
			<span className={`${toggleClassName} radio-toggle`}>
				<span className={`${dotClassName} radio-dot`} />
			</span>
			<P>{props.children}</P>
		</label>
	)
}
