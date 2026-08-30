import { useRef } from "react"
import { useSwitch } from "react-aria"
import { ToggleState, useToggleState } from "react-stately"
import { defineVars, style, useStyles } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { visuallyHidden } from "../tokens/visuallyHidden"
import { labelText } from "./Typography"

/** One step darker than `background.element` (#fff / gray 2). */
const switchOff = defineVars({
	track: {
		default: colors.gray[2],
		[DARK_THEME]: colors.gray[1],
	},
	trackHover: {
		default: colors.gray[3],
		[DARK_THEME]: colors.gray[2],
	},
})

const switchClass = style(
	flex({ align: "center", gap: 3 }),
	focusRing(
		"& .switch-input:focus-visible + .switch-toggle",
		shadowVars.subtle,
	),
	{
		position: "relative",
		width: "fit-content",
		"&:hover .switch-toggle": {
			backgroundColor: switchOff.trackHover,
		},
		"& .switch-input:checked + .switch-toggle": {
			backgroundColor: colors.accent[9],
		},
		"& .switch-input:checked + .switch-toggle .switch-thumb": {
			transform: "translateX(10px)",
		},
	},
)

const switchToggleClass = style(
	radius.pill,
	motion.standard("background-color"),
	shadow.subtle,
	{
		position: "relative",
		width: "24px",
		height: "14px",
		backgroundColor: switchOff.track,
	},
)

const switchThumbClass = style(
	radius.circle,
	motion.standard("transform"),
	{
		position: "absolute",
		top: "2px",
		left: "2px",
		width: "10px",
		height: "10px",
		backgroundColor: "#ffffff",
		boxShadow: "0 1px 2px rgba(0, 0, 0, 0.16)",
	},
)

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
	const inputClassName = useStyles(visuallyHidden)
	const toggleClassName = useStyles(switchToggleClass)
	const thumbClassName = useStyles(switchThumbClass)
	const labelClassName = useStyles(labelText)

	return (
		<label className={className}>
			<input
				{...inputProps}
				className={`${inputClassName} switch-input`}
				ref={ref}
			/>
			<span className={`${toggleClassName} switch-toggle`}>
				<span className={`${thumbClassName} switch-thumb`} />
			</span>
			<span className={labelClassName}>{label}</span>
		</label>
	)
}
