import { useRef } from "react"
import { useCheckbox } from "react-aria"
import { useToggleState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { visuallyHidden } from "../tokens/visuallyHidden"
import { labelText } from "./Typography"

type CheckboxProps = {
	label?: string
	checked: boolean
	setChecked: (checked: boolean) => void
}

const checkboxClass = style(
	flex({ align: "center", gap: 3 }),
	focusRing(
		"& .checkbox-input:focus-visible + .checkbox-toggle",
		shadowVars.subtle,
	),
	{
		position: "relative",
		width: "fit-content",
		"&:hover .checkbox-toggle": {
			backgroundColor: colors.gray[8],
		},
		"& .checkbox-input:checked + .checkbox-toggle": {
			backgroundColor: colors.accent[9],
		},
		"& .checkbox-input:checked + .checkbox-toggle .checkbox-icon": {
			opacity: 1,
			transform: "scale(1)",
		},
	},
)

const checkboxToggleClass = style(
	flex({ align: "center", justify: "center" }),
	radius["2xs"],
	motion.standard("background-color"),
	shadow.subtle,
	{
		pointerEvents: "none",
		width: "14px",
		height: "14px",
		backgroundColor: colors.gray[7],
	},
)

const checkboxIconClass = style(
	motion.standard("opacity", "transform"),
	{
		width: "10px",
		height: "10px",
		paddingTop: "0.5px",
		paddingLeft: "0.5px",
		fill: colors.gray[3],
		opacity: 0,
		transform: "scale(0)",
	},
)

export function Checkbox(props: CheckboxProps) {
	const { label, checked, setChecked } = props
	const state = useToggleState({ isSelected: checked, onChange: setChecked })
	const ref = useRef<HTMLInputElement>(null)
	const { inputProps } = useCheckbox({ "aria-label": props.label }, state, ref)
	const className = useStyles(checkboxClass)
	const inputClassName = useStyles(visuallyHidden)
	const toggleClassName = useStyles(checkboxToggleClass)
	const iconClassName = useStyles(checkboxIconClass)
	const labelClassName = useStyles(labelText)

	return (
		<label className={className}>
			<input
				{...inputProps}
				className={`${inputClassName} checkbox-input`}
				ref={ref}
			/>
			<span className={`${toggleClassName} checkbox-toggle`}>
				<svg
					focusable="false"
					aria-hidden="true"
					className={`${iconClassName} checkbox-icon`}
					viewBox="0 0 11 11"
				>
					<path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z"></path>
				</svg>
			</span>
			{label && <span className={labelClassName}>{label}</span>}
		</label>
	)
}
