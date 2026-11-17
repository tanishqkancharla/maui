import { Checkbox as RACCheckbox } from "react-aria-components"
import { defineVars, style, useStyles } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { controlSize } from "../tokens/sizing"
import { labelText } from "./Typography"

type CheckboxProps = {
	label?: string
	checked: boolean
	setChecked: (checked: boolean) => void
}

const checkboxSize = defineVars({
	box: { default: "14px", [LARGE_SCALE]: "20px" },
	checkmark: { default: "10px", [LARGE_SCALE]: "14px" },
})

const box = style(
	flex({ alignItems: "center", justifyContent: "center" }),
	radius["2xs"],
	shadow.control,
	{
		pointerEvents: "none",
		flexShrink: 0,
		width: checkboxSize.box,
		height: checkboxSize.box,
		backgroundColor: backgroundColor.element,
	},
)

const check = style(motion.standard("opacity", "transform"), {
	width: checkboxSize.checkmark,
	height: checkboxSize.checkmark,
	paddingTop: "0.5px",
	paddingLeft: "0.5px",
	fill: "white",
	opacity: 0,
	transform: "scale(0)",
})

const root = style(
	flex({ alignItems: "center", gap: 3 }),
	focusRing(`&[data-focus-visible] ${box}`, shadowVars.control),
	focusRing(
		`&[data-selected][data-focus-visible] ${box}`,
		shadowVars.selectedControl,
	),
	{
		position: "relative",
		width: "fit-content",
		minHeight: controlSize.minTarget,
		minWidth: controlSize.minTarget,
		[`&[data-hovered] ${box}`]: {
			backgroundColor: backgroundColor.elementHover,
		},
		[`&[data-selected] ${box}`]: {
			backgroundColor: colors.accent[9],
			boxShadow: shadowVars.selectedControl,
		},
		[`&[data-selected][data-hovered] ${box}`]: {
			backgroundColor: surfaceWash(
				colors.gray[12],
				surfaceMixPercent.hover,
				colors.accent[9],
			),
		},
		[`&[data-selected] ${check}`]: {
			opacity: 1,
			transform: "scale(1)",
		},
	},
)

/** Checkbox parts: `root` RAC `Checkbox` (`[data-hovered]`, `[data-selected]`, `[data-focus-visible]`; restyles `box` and `check` by their own classes), `box` the box span, `check` the checkmark svg, `label` the label text span. */
export const checkboxStyles = { root, box, check, label: labelText } as const

export function Checkbox(props: CheckboxProps) {
	const { label, checked, setChecked } = props
	const className = useStyles(checkboxStyles.root)
	const boxClassName = useStyles(checkboxStyles.box)
	const checkClassName = useStyles(checkboxStyles.check)
	const labelClassName = useStyles(checkboxStyles.label)

	return (
		<RACCheckbox
			className={className}
			isSelected={checked}
			onChange={setChecked}
		>
			<span className={boxClassName}>
				<svg
					focusable="false"
					aria-hidden="true"
					className={checkClassName}
					viewBox="0 0 11 11"
				>
					<path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z"></path>
				</svg>
			</span>
			{label && <span className={labelClassName}>{label}</span>}
		</RACCheckbox>
	)
}
