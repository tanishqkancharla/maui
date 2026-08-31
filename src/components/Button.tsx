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
import { shadow, shadowVars, tintedSubtle } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type ButtonVariant = "default" | "quiet" | "primary"

const buttonBaseClass = style(
	text({ size: "xs", fontWeight: 400, color: "highContrast" }),
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

/** Opaque hex or `rgb()`. Palette names stay ColorName (`"blue"` is Radix, not CSS `blue`). */
export type ButtonCssColor = `#${string}` | `rgb(${string}`
export type ButtonVariantColor = ColorName | ButtonCssColor

function isCssColor(value: string): value is ButtonCssColor {
	return value.startsWith("#") || value.startsWith("rgb")
}

function paletteFill(name: ColorName): ColorScale {
	return colors[name]
}

/** Drop origin alpha so custom fills stay solid. */
function opaqueColor(color: string) {
	return `oklch(from ${color} l c h / 1)`
}

/** Hover/active of a one-off fill: same hue, a step darker. */
function darkerFill(color: string) {
	return `oklch(from ${color} calc(l - 0.04) c h)`
}

/**
 * White or near-black from fill lightness. Threshold sits between Radix
 * orange-9 (white text) and amber-9 (dark text).
 */
function onSolidText(color: string) {
	return `oklch(from ${color} clamp(0.2, (0.75 - l) * 100, 0.99) 0 0)`
}

const coloredButtonClass = memoize(
	(variant: "primary" | "quiet", color: ButtonVariantColor) => {
		if (isCssColor(color)) {
			const fill = opaqueColor(color)
			if (variant === "primary") {
				const edge = tintedSubtle(fill)
				const hover = darkerFill(fill)
				return style(buttonBaseClass, focusRing("&:focus-visible", edge), {
					color: onSolidText(fill),
					backgroundColor: fill,
					boxShadow: edge,
					"&:hover": {
						backgroundColor: hover,
					},
					"&:active": {
						backgroundColor: hover,
					},
				})
			}

			return style(buttonBaseClass, focusRing("&:focus-visible"), {
				color: fill,
				backgroundColor: surfaceWash(
					fill,
					surfaceMixPercent.hover,
					"transparent",
				),
				boxShadow: "none",
				"&:hover": {
					color: darkerFill(fill),
					backgroundColor: surfaceWash(
						fill,
						surfaceMixPercent.active,
						"transparent",
					),
				},
				"&:active": {
					backgroundColor: surfaceWash(
						fill,
						surfaceMixPercent.active,
						"transparent",
					),
				},
			})
		}

		const scale = paletteFill(color)
		if (variant === "primary") {
			const edge = tintedSubtle(scale[9])
			return style(buttonBaseClass, focusRing("&:focus-visible", edge), {
				color: darkTextOnSolid.has(color) ? scale[12] : "white",
				backgroundColor: scale[9],
				boxShadow: edge,
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
	variantColor?: ButtonVariantColor
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
	variantColor: ButtonVariantColor | undefined,
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
