import { useRef } from "react"
import { useSwitch } from "react-aria"
import { ToggleState, useToggleState } from "react-stately"
import { style, useStyles } from "purse-styles"

const switchClass = style({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	position: "relative",
	width: "fit-content",
	padding: "6px",
	gap: "6px",
	"& .switch-input": {
		position: "absolute",
		top: 0,
		left: 0,
		margin: 0,
		padding: 0,
		opacity: 0.0001,
	},
	"& .switch-toggle": {
		position: "relative",
		width: "26px",
		height: "16px",
		padding: "1px",
	},
	"& .switch-toggle::before": {
		content: '""',
		zIndex: 2,
		position: "absolute",
		top: "3.5px",
		left: "4px",
		display: "block",
		width: "9px",
		height: "9px",
		borderRadius: "100%",
		backgroundColor: "black",
		transition: "all 130ms ease-in-out",
	},
	"&:hover .switch-toggle::before": {
		backgroundColor: "var(--sand-2)",
	},
	"& .switch-input:checked + .switch-toggle::before": {
		left: "15px",
	},
	"& .switch-input:checked + .switch-toggle::after": {
		backgroundColor: "var(--accent-color)",
	},
	"& .switch-toggle::after": {
		content: '""',
		position: "absolute",
		display: "block",
		width: "26px",
		height: "14px",
		borderRadius: "8px",
		backgroundColor: "var(--sand-7)",
		transition: "all 130ms ease-in-out",
	},
	"&:hover .switch-toggle::after": {
		backgroundColor: "var(--sand-8)",
	},
	"&:focus-visible .switch-toggle::after": {
		outline: "1px solid var(--accent-color)",
	},
})

type SwitchProps = {
	label: string
	selected: boolean
	onChange: (selected: boolean) => void
}

export function Switch(props: SwitchProps) {
	const { selected, onChange, label } = props
	const state: ToggleState = useToggleState({ isSelected: selected, onChange })
	const ref = useRef(null)

	const { inputProps } = useSwitch({ "aria-label": label }, state, ref)
	const className = useStyles(switchClass)

	return (
		<label className={className}>
			<input {...inputProps} className="switch-input" ref={ref} />
			<span className="switch-toggle"></span>
			<span className="switch-label">{props.label}</span>
		</label>
	)
}
