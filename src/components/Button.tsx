import React, { useCallback, useRef } from "react"
import { useId } from "react-aria"
import { style, useStyles } from "purse-styles"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import { colors, type ColorName, type ColorScale } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type ButtonVariant = "default" | "quiet" | "primary"

const buttonBaseClass = style(
	text("xs", 400, "highContrast"),
	focusRing("&:focus-visible", shadowVars.subtle),
	motion.standard("box-shadow", "background-color", "color"),
	shadow.subtle,
	spacing.padding({ x: 6, y: 4 }),
	{
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.value(2),
		borderRadius: "4px",
		width: "fit-content",
		height: "28px",
		border: "none",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		"& > svg": {
			flexShrink: 0,
		},
		"&:has(> svg)": {
			paddingBlock: spacing.value(3),
		},
		"&:has(> svg:first-child:not(:only-child))": {
			paddingInlineStart: spacing.value(4),
		},
		"&:has(> svg:last-child:not(:only-child))": {
			paddingInlineEnd: spacing.value(4),
		},
		"&:has(> svg:only-child)": {
			paddingInline: spacing.value(3),
		},
	},
)

const buttonTextClass = style({
	display: "block",
	minWidth: 0,
	textBox: "trim-both cap alphabetic",
})

const buttonClass = style(buttonBaseClass, {
	backgroundColor: backgroundColor.element,
	"&:hover": {
		backgroundColor: backgroundColor.elementHover,
	},
	"&:active": {
		backgroundColor: backgroundColor.elementActive,
	},
})

const quietButtonClass = style(
	buttonBaseClass,
	focusRing("&:focus-visible"),
	{
		color: colors.gray[11],
		backgroundColor: "transparent",
		boxShadow: "none",
		"&:hover": {
			color: colors.gray[12],
			backgroundColor: backgroundColor.elementHover,
		},
	},
)

const darkTextOnSolid: ReadonlySet<ColorName> = new Set([
	"amber",
	"lime",
	"mint",
	"sky",
	"yellow",
])

const coloredButtonClass = memoize(
	(variant: "primary" | "quiet", name: ColorName) => {
		const scale: ColorScale = colors[name]
		if (variant === "primary") {
			return style(buttonBaseClass, {
				color: darkTextOnSolid.has(name) ? scale[12] : "white",
				backgroundColor: scale[9],
				"&:hover": {
					backgroundColor: scale[10],
				},
				"&:active": {
					backgroundColor: scale[10],
				},
			})
		}

		return style(buttonBaseClass, focusRing("&:focus-visible"), {
			color: scale[11],
			backgroundColor: surfaceWash(
				scale[9],
				surfaceMixPercent.hover,
				"transparent",
			),
			boxShadow: "none",
			"&:hover": {
				color: scale[12],
				backgroundColor: surfaceWash(
					scale[9],
					surfaceMixPercent.active,
					"transparent",
				),
			},
			"&:active": {
				backgroundColor: surfaceWash(
					scale[9],
					surfaceMixPercent.active,
					"transparent",
				),
			},
		})
	},
)

type ButtonAttributes = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

type ButtonData = {
	id: string
	focused: boolean
}

export type ButtonProps = Omit<ButtonAttributes, "children" | "ref"> & {
	children: React.ReactNode
	variant?: ButtonVariant
	variantColor?: ColorName
}

export function useButton(props: ButtonProps): [ButtonData, ButtonAttributes] {
	const ref = useRef<HTMLButtonElement>(null)
	const id = useId()
	const [focused, focusProps] = useFocus(id, ref)

	const onClickRef = useRefCurrent(props.onClick)
	const onFocusRef = useRefCurrent(props.onFocus)

	const onClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		focusProps.onFocus(event)
		onClickRef.current?.(event)
	}, [])
	const onFocus = useCallback((event: React.FocusEvent<HTMLButtonElement>) => {
		focusProps.onFocus(event)
		onFocusRef.current?.(event)
	}, [])

	return [
		{ focused, id },
		{ ref, onClick, onFocus },
	]
}

export function Button(props: ButtonProps) {
	const {
		children,
		className: classNameProp,
		onClick,
		onFocus,
		type = "button",
		variant = "default",
		variantColor,
		...buttonProps
	} = props
	const [data, attributes] = useButton({ children, onClick, onFocus })
	const className = useStyles(buttonVariantClass(variant, variantColor))
	const textClassName = useStyles(buttonTextClass)
	const mergedClassName = [className, classNameProp].filter(Boolean).join(" ")

	return (
		<button
			{...buttonProps}
			{...attributes}
			type={type}
			className={mergedClassName}
		>
			{renderButtonChildren(children, textClassName)}
		</button>
	)
}

function buttonVariantClass(
	variant: ButtonVariant,
	variantColor: ColorName | undefined,
) {
	if (variant === "primary") {
		return coloredButtonClass("primary", variantColor ?? "accent")
	}
	if (variant === "quiet" && variantColor) {
		return coloredButtonClass("quiet", variantColor)
	}
	if (variant === "quiet") {
		return quietButtonClass
	}
	return buttonClass
}

function renderButtonChildren(children: React.ReactNode, className: string) {
	const rendered: React.ReactNode[] = []
	let textRun: (string | number)[] = []

	const flushTextRun = () => {
		if (textRun.length === 0) return

		rendered.push(
			<span className={className} key={`text-${rendered.length}`}>
				{textRun}
			</span>,
		)
		textRun = []
	}

	for (const child of React.Children.toArray(children)) {
		if (typeof child === "string" || typeof child === "number") {
			textRun.push(child)
			continue
		}

		flushTextRun()
		rendered.push(child)
	}

	flushTextRun()
	return rendered
}
