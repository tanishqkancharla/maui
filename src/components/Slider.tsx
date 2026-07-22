import { useMemo, useRef } from "react"
import {
	AriaSliderProps,
	useLocale,
	useSlider,
	useSliderThumb,
} from "react-aria"
import { useSliderState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { shadowVars } from "../tokens/shadow"

type SliderProps = AriaSliderProps<number> & {
	label: string
}

const sliderClass = style(focusRing("& .slider-thumb:has(input:focus-visible)"), {
	width: "240px",
	"& .slider-label-row": {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "10px",
	},
	"& label, & output": {
		color: colors.gray[11],
		fontSize: "0.75rem",
		fontFamily: "system-ui, -apple-system",
		letterSpacing: "0.02em",
		lineHeight: "16px",
	},
	"& .slider-track": {
		position: "relative",
		height: "18px",
	},
	"& .slider-track::before": {
		content: '""',
		position: "absolute",
		top: "7px",
		left: 0,
		right: 0,
		height: "4px",
		borderRadius: "999px",
		background: colors.gray[6],
	},
	"& .slider-fill": {
		position: "absolute",
		top: "7px",
		left: 0,
		height: "4px",
		borderRadius: "999px",
		background: colors.accent[10],
	},
	"& .slider-thumb": {
		position: "absolute",
		top: "50%",
		width: "12px",
		height: "12px",
		borderRadius: "100%",
		background: colors.gray[12],
		boxShadow: shadowVars.subtle,
		transform: "translateX(-50%)",
	},
	"& .slider-thumb[data-dragging='true']": {
		background: colors.accent[11],
	},
	"& input": {
		position: "absolute",
		width: "100%",
		height: "100%",
		top: 0,
		left: 0,
		opacity: 0.0001,
		pointerEvents: "none",
	},
})

export function Slider(props: SliderProps) {
	const trackRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { locale } = useLocale()
	const numberFormatter = useMemo(() => new Intl.NumberFormat(locale), [locale])
	const state = useSliderState({ ...props, numberFormatter })
	const { groupProps, labelProps, trackProps, outputProps } = useSlider(
		props,
		state,
		trackRef,
	)
	const { thumbProps, inputProps, isDragging } = useSliderThumb(
		{
			index: 0,
			trackRef,
			inputRef,
		},
		state,
	)
	const className = useStyles(sliderClass)
	const percent = state.getThumbPercent(0) * 100

	return (
		<div className={className} {...groupProps}>
			<div className="slider-label-row">
				<label {...labelProps}>{props.label}</label>
				<output {...outputProps}>{state.getThumbValueLabel(0)}</output>
			</div>
			<div className="slider-track" ref={trackRef} {...trackProps}>
				<div className="slider-fill" style={{ width: `${percent}%` }} />
				<div
					className="slider-thumb"
					data-dragging={isDragging}
					style={{ left: `${percent}%` }}
					{...thumbProps}
				>
					<input ref={inputRef} {...inputProps} />
				</div>
			</div>
		</div>
	)
}
