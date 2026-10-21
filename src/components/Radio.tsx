import {
	Label as RACLabel,
	Radio as RACRadio,
	RadioGroup as RACRadioGroup,
	type RadioGroupProps as RACRadioGroupProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
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
import { labelText, P } from "./Typography"

type RadioOptionGroupProps = Omit<
	RACRadioGroupProps,
	"children" | "className" | "style"
> & {
	label: string
	children: React.ReactNode
}

const circle = style(radius.circle, shadow.control, {
	pointerEvents: "none",
	position: "relative",
	width: "14px",
	height: "14px",
	backgroundColor: backgroundColor.element,
})

const dot = style(radius.circle, motion.standard("transform"), {
	position: "absolute",
	top: "4px",
	left: "4px",
	width: "6px",
	height: "6px",
	backgroundColor: colors.gray[3],
	transform: "scale(0)",
})

const root = style(
	flex({ alignItems: "center", gap: 3 }),
	focusRing(`&[data-focus-visible] ${circle}`, shadowVars.control),
	{
		position: "relative",
		width: "fit-content",
		[`&[data-hovered] ${circle}`]: {
			backgroundColor: backgroundColor.elementHover,
		},
		[`&[data-selected] ${circle}`]: {
			backgroundColor: colors.accent[9],
		},
		[`&[data-selected][data-hovered] ${circle}`]: {
			backgroundColor: surfaceWash(
				colors.gray[12],
				surfaceMixPercent.hover,
				colors.accent[9],
			),
		},
		[`&[data-selected] ${dot}`]: {
			transform: "scale(1)",
		},
	},
)

const group = style(flex({ direction: "column", gap: 3 }))

/** Radio parts: `group` RAC `RadioGroup`, `groupLabel` RAC `Label` inside it, `root` RAC `Radio` (`[data-hovered]`, `[data-selected]`, `[data-focus-visible]`; restyles `circle` and `dot` by their own classes), `circle` the circle span, `dot` the inner dot span. */
export const radioStyles = {
	group,
	groupLabel: labelText,
	root,
	circle,
	dot,
} as const

export function RadioOptionGroup(props: RadioOptionGroupProps) {
	const { label, children, ...radioGroupProps } = props
	const className = useStyles(radioStyles.group)
	const labelClassName = useStyles(radioStyles.groupLabel)

	return (
		<RACRadioGroup {...radioGroupProps} className={className}>
			<RACLabel className={labelClassName}>{label}</RACLabel>
			{children}
		</RACRadioGroup>
	)
}

type RadioOptionProps = {
	value: string
	children: React.ReactNode
}

export function RadioOption(props: RadioOptionProps) {
	const className = useStyles(radioStyles.root)
	const circleClassName = useStyles(radioStyles.circle)
	const dotClassName = useStyles(radioStyles.dot)

	return (
		<RACRadio value={props.value} className={className}>
			<span className={circleClassName}>
				<span className={dotClassName} />
			</span>
			<P>{props.children}</P>
		</RACRadio>
	)
}
