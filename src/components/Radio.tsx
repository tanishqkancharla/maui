import { createContext, useContext, useRef } from "react"
import { AriaRadioGroupProps, useRadio, useRadioGroup } from "react-aria"
import { RadioGroupState, useRadioGroupState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { focusRing } from "../tokens/focusRing"

const RadioOptionGroupContext = createContext<RadioGroupState | null>(null)

type RadioOptionGroupProps = AriaRadioGroupProps & {
	label: string
	children: React.ReactNode
}

const radioGroupClass = style({
	display: "flex",
	flexDirection: "column",
	gap: "6px",
	"& .radio-group-label": {
		color: "var(--sand-11)",
		fontSize: "0.75rem",
		fontFamily: "system-ui, -apple-system",
		letterSpacing: "0.02em",
		lineHeight: "16px",
	},
})

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
				<span className="radio-group-label" {...labelProps}>
					{label}
				</span>
				{children}
			</div>
		</RadioOptionGroupContext.Provider>
	)
}

const radioClass = style(focusRing("& .radio-input:focus-visible + .radio-toggle"), {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	position: "relative",
	width: "fit-content",
	padding: "6px 0",
	gap: "6px",
	"& .radio-input": {
		position: "absolute",
		top: 0,
		left: 0,
		margin: 0,
		padding: 0,
		opacity: 0.0001,
	},
	"& .radio-toggle": {
		pointerEvents: "none",
		position: "relative",
		height: "14px",
		width: "14px",
		borderRadius: "100%",
		backgroundColor: "var(--sand-7)",
		transition: "all 130ms ease-in-out",
	},
	"& .radio-toggle::after": {
		content: '""',
		position: "absolute",
		top: "4px",
		left: "4px",
		width: "6px",
		height: "6px",
		borderRadius: "100%",
		background: "var(--sand-3)",
		transform: "scale(0)",
		transition: "transform 130ms ease-in-out",
	},
	"& input:checked + .radio-toggle": {
		backgroundColor: "var(--accent-color)",
	},
	"& input:checked + .radio-toggle::after": {
		transform: "scale(1)",
	},
	"&:hover .radio-toggle": {
		backgroundColor: "var(--sand-8)",
	},
	"&:hover input:checked + .radio-toggle": {
		backgroundColor: "var(--accent-color)",
	},
})

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

	return (
		<label className={className} {...labelProps}>
			<input className="radio-input" ref={ref} {...inputProps} />
			<span className="radio-toggle" />
			<span>{props.children}</span>
		</label>
	)
}
