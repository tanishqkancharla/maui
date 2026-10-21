import {
	Label as RACLabel,
	Slider as RACSlider,
	SliderOutput,
	SliderThumb,
	SliderTrack,
	type SliderProps as RACSliderProps,
} from "react-aria-components"
import { defineVars, style, useStyles } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { shadowVars } from "../tokens/shadow"
import { labelText } from "./Typography"

type SliderProps = Omit<
	RACSliderProps<number>,
	"children" | "className" | "style"
> & {
	label: string
}

const sliderSize = defineVars({
	thumb: { default: "12px", [LARGE_SCALE]: "20px" },
	track: { default: "18px", [LARGE_SCALE]: "40px" },
})

const root = style({ width: "240px" })

const header = style({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	marginBottom: "10px",
})

const track = style({
	position: "relative",
	height: sliderSize.track,
	"&::before": {
		content: '""',
		position: "absolute",
		top: "calc(50% - 2px)",
		left: 0,
		right: 0,
		height: "4px",
		borderRadius: "999px",
		background: colors.gray[6],
	},
})

const fill = style({
	position: "absolute",
	top: "calc(50% - 2px)",
	left: 0,
	height: "4px",
	borderRadius: "999px",
	background: colors.accent[10],
})

const thumb = style(focusRing("&[data-focus-visible]", shadowVars.control), {
	top: "50%",
	width: sliderSize.thumb,
	height: sliderSize.thumb,
	borderRadius: "100%",
	background: colors.gray[12],
	boxShadow: shadowVars.control,
	"&[data-dragging]": {
		background: colors.accent[11],
	},
})

/** Slider parts: `root` RAC `Slider`, `header` div holding the label and output, `label` RAC `Label` and RAC `SliderOutput`, `track` RAC `SliderTrack` (draws the rail in `::before`), `fill` a div in the track whose inline `width` you set from `state.getThumbPercent(0)`, `thumb` RAC `SliderThumb` (`[data-focus-visible]`, `[data-dragging]`). */
export const sliderStyles = {
	root,
	header,
	label: labelText,
	track,
	fill,
	thumb,
} as const

export function Slider(props: SliderProps) {
	const { label, ...sliderProps } = props
	const className = useStyles(sliderStyles.root)
	const headerClassName = useStyles(sliderStyles.header)
	const labelClassName = useStyles(sliderStyles.label)
	const trackClassName = useStyles(sliderStyles.track)
	const fillClassName = useStyles(sliderStyles.fill)
	const thumbClassName = useStyles(sliderStyles.thumb)

	return (
		<RACSlider {...sliderProps} className={className}>
			<div className={headerClassName}>
				<RACLabel className={labelClassName}>{label}</RACLabel>
				<SliderOutput className={labelClassName} />
			</div>
			<SliderTrack className={trackClassName}>
				{({ state }) => (
					<>
						<div
							className={fillClassName}
							style={{ width: `${state.getThumbPercent(0) * 100}%` }}
						/>
						<SliderThumb className={thumbClassName} />
					</>
				)}
			</SliderTrack>
		</RACSlider>
	)
}
