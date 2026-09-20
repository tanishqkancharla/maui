import React, { useCallback } from "react"
import { useId, useObjectRef } from "react-aria"
import {
	Button as RACButton,
	type ButtonProps as RACButtonProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import {
	colors,
	type ColorName,
	type ColorScale,
} from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { shadow, shadowVars, tintedSubtle } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type ButtonVariant = "default" | "quiet" | "primary"

const disabledRaised = {
	cursor: "default",
	opacity: 1,
	color: colors.gray[8],
	backgroundColor: backgroundColor.element,
	boxShadow: shadowVars.subtle,
} as const

const disabledQuiet = {
	cursor: "default",
	opacity: 1,
	color: colors.gray[8],
	backgroundColor: "transparent",
	boxShadow: "none",
} as const

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
		"&:disabled": disabledRaised,
	},
)

const buttonTextClass = style({
	display: "block",
	minWidth: 0,
	textBox: "trim-both cap alphabetic",
})

/**
 * RAC `data-pressed` is true while the pointer is down. MenuTrigger’s
 * PressResponder also keeps it while the menu is open. `aria-expanded`
 * covers Select / ComboBox / DatePicker / DialogTrigger overlays.
 */
function pressedOrExpanded(styles: Record<string, string>) {
	return {
		"&:active:not(:disabled), &[data-pressed]:not(:disabled), &[aria-expanded='true']:not(:disabled)":
			styles,
	}
}

const buttonClass = style(buttonBaseClass, {
	backgroundColor: backgroundColor.element,
	"&:hover:not(:disabled)": {
		backgroundColor: backgroundColor.elementHover,
	},
	...pressedOrExpanded({
		backgroundColor: backgroundColor.elementActive,
	}),
})

function paletteAlpha(name: ColorName): ColorScale {
	return colors[`${name}Alpha`]
}

const quietClass = memoize((color: string, hoverColor: string, wash: string) =>
	style(
		buttonBaseClass,
		focusRing("&:focus-visible"),
		motion.standard("box-shadow", "color"),
		{
			color,
			backgroundColor: "transparent",
			boxShadow: "none",
			"&:hover:not(:disabled)": {
				color: hoverColor,
				backgroundColor: surfaceWash(wash, surfaceMixPercent.hover),
			},
			...pressedOrExpanded({
				color: hoverColor,
				backgroundColor: surfaceWash(wash, surfaceMixPercent.active),
			}),
			"&:disabled": disabledQuiet,
		},
	),
)

const quietButtonClass = quietClass(
	colors.gray[11],
	colors.gray[12],
	colors.grayAlpha[9],
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

export function isCssColor(value: string): value is ButtonCssColor {
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
					"&:hover:not(:disabled)": {
						backgroundColor: hover,
					},
					...pressedOrExpanded({
						backgroundColor: hover,
					}),
					"&:disabled": disabledRaised,
				})
			}

			return quietClass(fill, darkerFill(fill), fill)
		}

		const scale = paletteFill(color)
		if (variant === "primary") {
			const edge = tintedSubtle(scale[9])
			return style(buttonBaseClass, focusRing("&:focus-visible", edge), {
				color: darkTextOnSolid.has(color) ? scale[12] : "white",
				backgroundColor: scale[9],
				boxShadow: edge,
				"&:hover:not(:disabled)": {
					backgroundColor: scale[10],
				},
				...pressedOrExpanded({
					backgroundColor: scale[10],
				}),
				"&:disabled": disabledRaised,
			})
		}

		return quietClass(scale[11], scale[12], paletteAlpha(color)[9])
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

export type ButtonProps = Omit<RACButtonProps, "children" | "className"> & {
	children: React.ReactNode
	className?: string
	variant?: ButtonVariant
	variantColor?: ButtonVariantColor
}

export function useButton(
	props: Pick<ButtonProps, "onClick" | "onFocus">,
	forwardedRef?: React.ForwardedRef<HTMLButtonElement>,
): [
	ButtonData,
	Pick<ButtonAttributes, "ref"> & Pick<RACButtonProps, "onClick" | "onFocus">,
] {
	const ref = useObjectRef(forwardedRef)
	const id = useId()
	const [focused, focusProps] = useFocus(id, ref)

	const onClickRef = useRefCurrent(props.onClick)
	const onFocusRef = useRefCurrent(props.onFocus)

	const onClick = useCallback<NonNullable<RACButtonProps["onClick"]>>(
		(event) => {
			focusProps.onFocus(event)
			onClickRef.current?.(event)
		},
		[],
	)
	const onFocus = useCallback<NonNullable<RACButtonProps["onFocus"]>>(
		(event) => {
			focusProps.onFocus(event)
			onFocusRef.current?.(event)
		},
		[],
	)

	return [
		{ focused, id },
		{ ref, onClick, onFocus },
	]
}

export const Button = React.forwardRef(function Button(
	props: ButtonProps,
	forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
	const {
		children,
		className: classNameProp,
		onClick,
		onFocus,
		type = "button",
		variant = "default",
		variantColor,
		isDisabled,
		...buttonProps
	} = props
	const [, attributes] = useButton({ onClick, onFocus }, forwardedRef)
	const className = useStyles(buttonVariantClass(variant, variantColor))
	const textClassName = useStyles(buttonTextClass)
	const mergedClassName = [className, classNameProp].filter(Boolean).join(" ")

	return (
		<RACButton
			{...buttonProps}
			ref={attributes.ref}
			type={type}
			isDisabled={isDisabled}
			className={mergedClassName}
			onClick={attributes.onClick}
			onFocus={attributes.onFocus}
		>
			{renderButtonChildren(children, textClassName)}
		</RACButton>
	)
})

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
