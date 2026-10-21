import { Switch as RACSwitch } from "react-aria-components"
import { defineVars, style, useStyles } from "purse-styles"
import { DARK_THEME } from "../theme/dataTheme"
import { LARGE_SCALE } from "../theme/dataScale"
import { surfaceMixPercent, surfaceWash } from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { motion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { controlSize } from "../tokens/sizing"
import { partRule, partSelector } from "../utils/partSelector"
import { labelText } from "./Typography"

const switchSize = defineVars({
	width: { default: "24px", [LARGE_SCALE]: "36px" },
	height: { default: "14px", [LARGE_SCALE]: "22px" },
	thumb: { default: "10px", [LARGE_SCALE]: "18px" },
})

/** One step darker than `background.element` (#fff / gray 2). */
const switchOff = defineVars({
	track: {
		default: colors.gray[2],
		[DARK_THEME]: colors.gray[1],
	},
})

const switchOffHover = surfaceWash(
	colors.gray[12],
	surfaceMixPercent.hover,
	switchOff.track,
)
const switchOnHover = surfaceWash(
	colors.gray[12],
	surfaceMixPercent.hover,
	colors.accent[9],
)

const track = style(radius.pill, shadow.control, {
	position: "relative",
	flexShrink: 0,
	width: switchSize.width,
	height: switchSize.height,
	backgroundColor: switchOff.track,
})

const thumb = style(radius.circle, motion.standard("transform"), {
	position: "absolute",
	top: "2px",
	left: "2px",
	width: switchSize.thumb,
	height: switchSize.thumb,
	backgroundColor: "#ffffff",
	boxShadow: "0 1px 2px rgba(0, 0, 0, 0.16)",
})

const root = style(
	flex({ alignItems: "center", gap: 3 }),
	focusRing(`&[data-focus-visible] ${partSelector(track)}`, shadowVars.control),
	{
		position: "relative",
		width: "fit-content",
		minHeight: controlSize.minTarget,
	},
	partRule("[data-hovered]", track, {
		backgroundColor: switchOffHover,
	}),
	partRule("[data-selected]", track, {
		backgroundColor: colors.accent[9],
	}),
	partRule("[data-selected][data-hovered]", track, {
		backgroundColor: switchOnHover,
	}),
	partRule("[data-selected]", thumb, {
		transform: `translateX(calc(${switchSize.width} - ${switchSize.thumb} - 4px))`,
	}),
)

type SwitchProps = {
	label: string
	selected: boolean
	onChange: (selected: boolean) => void
}

/** Switch parts: `root` RAC `Switch` (`[data-hovered]`, `[data-selected]`, `[data-focus-visible]`; restyles `track` and `thumb` by their own classes), `track` the track span, `thumb` the knob span inside the track, `label` the label text span. */
export const switchStyles = { root, track, thumb, label: labelText } as const

export function Switch(props: SwitchProps) {
	const { selected, onChange, label } = props
	const className = useStyles(switchStyles.root)
	const trackClassName = useStyles(switchStyles.track)
	const thumbClassName = useStyles(switchStyles.thumb)
	const labelClassName = useStyles(switchStyles.label)

	return (
		<RACSwitch className={className} isSelected={selected} onChange={onChange}>
			<span className={trackClassName}>
				<span className={thumbClassName} />
			</span>
			<span className={labelClassName}>{label}</span>
		</RACSwitch>
	)
}
