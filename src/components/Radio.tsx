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
import { partRule, partSelector } from "../utils/partSelector"
import { labelText, P } from "./Typography"

type RadioOptionGroupProps = Omit<
	RACRadioGroupProps,
	"children" | "className" | "style"
> & {
	label: string
	children: React.ReactNode
}

const group = style(flex({ direction: "column", gap: 3 }))

export function RadioOptionGroup(props: RadioOptionGroupProps) {
	const { label, children, ...radioGroupProps } = props
	const className = useStyles(group)
	const labelClassName = useStyles(labelText)

	return (
		<RACRadioGroup {...radioGroupProps} className={className}>
			<RACLabel className={labelClassName}>{label}</RACLabel>
			{children}
		</RACRadioGroup>
	)
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

const radio = style(
	flex({ alignItems: "center", gap: 3 }),
	focusRing(
		`&[data-focus-visible] ${partSelector(circle)}`,
		shadowVars.control,
	),
	{
		position: "relative",
		width: "fit-content",
	},
	partRule("[data-hovered]", circle, {
		backgroundColor: backgroundColor.elementHover,
	}),
	partRule("[data-selected]", circle, {
		backgroundColor: colors.accent[9],
	}),
	partRule("[data-selected][data-hovered]", circle, {
		backgroundColor: surfaceWash(
			colors.gray[12],
			surfaceMixPercent.hover,
			colors.accent[9],
		),
	}),
	partRule("[data-selected]", dot, {
		transform: "scale(1)",
	}),
)

type RadioOptionProps = {
	value: string
	children: React.ReactNode
}

export function RadioOption(props: RadioOptionProps) {
	const className = useStyles(radio)
	const circleClassName = useStyles(circle)
	const dotClassName = useStyles(dot)

	return (
		<RACRadio value={props.value} className={className}>
			<span className={circleClassName}>
				<span className={dotClassName} />
			</span>
			<P>{props.children}</P>
		</RACRadio>
	)
}
