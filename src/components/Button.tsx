import React, { useCallback, useLayoutEffect, useState } from "react"
import {
	AnimatePresence,
	motion,
	useIsPresent,
	useReducedMotion,
	type Transition,
} from "motion/react"
import { useId, useObjectRef } from "react-aria"
import {
	Button as RACButton,
	ProgressBar,
	type ButtonProps as RACButtonProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { ActivityIndicator } from "./ActivityIndicator"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import { colors, type ColorName, type ColorScale } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { shadowVars, tintedControl } from "../tokens/shadow"
import { controlSize, iconSizeValues } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type ButtonVariant = "default" | "quiet" | "primary"
export type ButtonSize = "default" | "sm"

const buttonShadow = shadowVars.control

const pendingTransition = { duration: 0.15, ease: "easeInOut" } as const

const disabledRaised = {
	cursor: "default",
	opacity: 1,
	color: colors.gray[8],
	backgroundColor: backgroundColor.element,
	backgroundImage: "none",
	boxShadow: buttonShadow,
} as const

const disabledQuiet = {
	cursor: "default",
	opacity: 1,
	color: colors.gray[8],
	backgroundColor: "transparent",
	boxShadow: "none",
} as const

const buttonBaseClass = style(
	text({ size: "xs", fontWeight: 500, color: "highContrast" }),
	focusRing("&:focus-visible", buttonShadow),
	spacing.padding({ x: 6, y: 4 }),
	radius.sm,
	{
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.value(2),
		width: "fit-content",
		height: controlSize.height,
		minWidth: controlSize.minTarget,
		border: "none",
		boxShadow: buttonShadow,
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		transition: `padding-inline-start ${pendingTransition.duration}s ease-in-out`,
		"@media (prefers-reduced-motion: reduce)": {
			transition: "none",
		},
		"& > svg, & [data-button-content] > svg": {
			flexShrink: 0,
		},
		"&:has(> svg), &:has([data-button-content] > svg)": {
			paddingBlock: spacing.value(3),
		},
		"&:has(> svg:first-child:not(:only-child)), &:has([data-button-content] > svg:first-child:not(:only-child))":
			{
				paddingInlineStart: spacing.value(4),
			},
		"&:has(> svg:last-child:not(:only-child)), &:has([data-button-content] > svg:last-child:not(:only-child))":
			{
				paddingInlineEnd: spacing.value(4),
			},
		"&:has(> svg:only-child), &:has([data-button-content] > svg:only-child)": {
			paddingInline: spacing.value(3),
		},
		"&[data-pending]": {
			paddingInlineStart: `calc((${controlSize.height} - ${iconSizeValues.xs}) / 2)`,
		},
		"&:disabled": disabledRaised,
	},
)

const buttonTextClass = style({
	display: "block",
	minWidth: 0,
	textBox: "trim-both cap alphabetic",
})

const pendingIndicatorClass = style({
	display: "inline-flex",
	flexShrink: 0,
	"& > span": { display: "inline-flex" },
})

const contentRootClass = style({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "inherit",
	minWidth: 0,
})

const contentLayerClass = style({
	display: "inline-flex",
	alignItems: "center",
	gap: "inherit",
	flexShrink: 0,
	"&[inert]": {
		position: "absolute",
		insetBlock: 0,
		insetInlineStart: 0,
		width: "max-content",
	},
})

const smallButtonClass = style(
	text({ size: "2xs", fontWeight: 500, color: "highContrast" }),
	{
		height: controlSize.smHeight,
		gap: spacing.value(1),
		paddingInline: spacing.value(4),
		paddingBlock: spacing.value(2),
		"& > svg, & [data-button-content] > svg": {
			width: iconSizeValues.xs,
			height: iconSizeValues.xs,
		},
		"&:has(> svg), &:has([data-button-content] > svg)": {
			paddingBlock: spacing.value(2),
		},
		"&:has(> svg:first-child:not(:only-child)), &:has([data-button-content] > svg:first-child:not(:only-child))":
			{
				paddingInlineStart: spacing.value(3),
			},
		"&:has(> svg:last-child:not(:only-child)), &:has([data-button-content] > svg:last-child:not(:only-child))":
			{
				paddingInlineEnd: spacing.value(3),
			},
		"&:has(> svg:only-child), &:has([data-button-content] > svg:only-child)": {
			width: controlSize.smHeight,
			paddingInline: 0,
		},
		"&[data-pending]": {
			paddingInlineStart: `calc((${controlSize.smHeight} - ${iconSizeValues["2xs"]}) / 2)`,
		},
	},
)

const buttonClass = style(buttonBaseClass, {
	backgroundColor: backgroundColor.element,
	"&:hover:not(:disabled):not([data-pending])": {
		backgroundColor: backgroundColor.elementHover,
	},
})

function paletteAlpha(name: ColorName): ColorScale {
	return colors[`${name}Alpha`]
}

const quietClass = memoize((color: string, hoverColor: string, wash: string) =>
	style(buttonBaseClass, focusRing("&:focus-visible"), {
		color,
		backgroundColor: "transparent",
		boxShadow: "none",
		"&:hover:not(:disabled):not([data-pending])": {
			color: hoverColor,
			backgroundColor: surfaceWash(wash, surfaceMixPercent.hover),
		},
		"&:disabled": disabledQuiet,
	}),
)

const quietButtonClass = quietClass(
	colors.gray[11],
	colors.gray[12],
	colors.grayAlpha[9],
)

/**
 * @internal Shared shell under every Button variant (no fill, no hover).
 * Only for Maui controls that layer their own fill on top (TabBar's selected
 * tab); use `buttonStyles.root` everywhere else.
 */
export const buttonBaseStyle = buttonBaseClass

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

/** Darken a one-off fill while preserving its hue. */
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

/** Darker shade of a fill (OKLCH lightness offset) at an alpha. */
function fillShade(color: string, lightnessOffset: number, alpha = 1) {
	return `oklch(from ${color} calc(l - ${lightnessOffset}) c h / ${alpha})`
}

/**
 * Diagonal from a slightly darker, more saturated, warmer-rotated fill to the
 * fill. The offsets are the OKLCH delta between Campsite's #FB432C → #FF591E.
 */
function primaryButtonGradient(color: string) {
	return `linear-gradient(to top left, oklch(from ${color} calc(l - 0.027) calc(c * 1.05) calc(h - 6.8)), ${color})`
}

/** Hover lightens the top of the gradient instead of replacing the fill. */
const primaryHoverSheen = `linear-gradient(to bottom, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0))`

const primaryClass = memoize(
	(fill: string, textColor: string, lightEdge: string) => {
		const primaryShadow = tintedControl(fill, lightEdge)
		const gradient = primaryButtonGradient(fill)
		return style(buttonBaseClass, focusRing("&:focus-visible", primaryShadow), {
			color: textColor,
			backgroundColor: fill,
			backgroundImage: gradient,
			boxShadow: primaryShadow,
			"&:hover:not(:disabled):not([data-pending])": {
				backgroundImage: `${primaryHoverSheen}, ${gradient}`,
			},
			"&:disabled": disabledRaised,
		})
	},
)

const coloredButtonClass = memoize(
	(variant: "primary" | "quiet", color: ButtonVariantColor) => {
		if (isCssColor(color)) {
			const fill = opaqueColor(color)
			if (variant === "primary") {
				// No alpha scale for a custom fill; approximate step A6 with the fill at 35%.
				return primaryClass(fill, onSolidText(fill), fillShade(fill, 0, 0.35))
			}

			return quietClass(fill, darkerFill(fill), fill)
		}

		const scale = paletteFill(color)
		if (variant === "primary") {
			return primaryClass(
				scale[9],
				darkTextOnSolid.has(color) ? scale[12] : "white",
				paletteAlpha(color)[6],
			)
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
	size?: ButtonSize
	variant?: ButtonVariant
	variantColor?: ButtonVariantColor
	/** Visible text beside the indicator while pending. Defaults to children. */
	pendingLabel?: string
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

/** `root` goes on the RAC `Button` (native `:hover` / `:focus-visible` / `:disabled`; icons are direct `> svg` children); `label` goes on a `<span>` wrapping each text run. */
export const buttonStyles = {
	root: memoize(
		({
			variant = "default",
			size = "default",
			variantColor,
		}: Pick<ButtonProps, "variant" | "size" | "variantColor"> = {}) =>
			style(
				buttonVariantClass(variant, variantColor),
				size === "sm" && smallButtonClass,
			),
	),
	label: buttonTextClass,
} as const

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
		size = "default",
		variant = "default",
		variantColor,
		isDisabled,
		pendingLabel,
		...buttonProps
	} = props
	const [, attributes] = useButton({ onClick, onFocus }, forwardedRef)
	const className = useStyles(
		buttonStyles.root({ variant, size, variantColor }),
	)
	const textClassName = useStyles(buttonStyles.label)
	const indicatorClassName = useStyles(pendingIndicatorClass)
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
			{({ isPending }) => (
				<ButtonContents isPending={isPending}>
					{isPending && (
						<ProgressBar
							isIndeterminate
							aria-label="Pending"
							className={indicatorClassName}
						>
							<span aria-hidden="true">
								<ActivityIndicator
									variant="primary"
									size={size === "sm" ? "2xs" : "xs"}
								/>
							</span>
						</ProgressBar>
					)}
					{renderButtonChildren(
						isPending ? (pendingLabel ?? children) : children,
						textClassName,
					)}
				</ButtonContents>
			)}
		</RACButton>
	)
})

function ButtonContents({
	isPending,
	children,
}: {
	isPending: boolean
	children: React.ReactNode
}) {
	const [width, setWidth] = useState<number>()
	const reduceMotion = useReducedMotion()
	const className = useStyles(contentRootClass)
	const transition = reduceMotion ? { duration: 0 } : pendingTransition

	return (
		<motion.span
			className={className}
			initial={false}
			animate={{ width: width ?? "auto" }}
			transition={transition}
		>
			<AnimatePresence initial={false}>
				<ButtonContentLayer
					key={isPending ? "pending" : "ready"}
					onResize={setWidth}
					transition={transition}
				>
					{children}
				</ButtonContentLayer>
			</AnimatePresence>
		</motion.span>
	)
}

function ButtonContentLayer({
	children,
	onResize,
	transition,
}: {
	children: React.ReactNode
	onResize: (width: number) => void
	transition: Transition
}) {
	const ref = React.useRef<HTMLSpanElement>(null)
	const isPresent = useIsPresent()
	const className = useStyles(contentLayerClass)

	useLayoutEffect(() => {
		const node = ref.current
		if (!node || !isPresent) return
		const measure = () => onResize(node.getBoundingClientRect().width)
		measure()
		const observer = new ResizeObserver(measure)
		observer.observe(node)
		return () => observer.disconnect()
	}, [isPresent, onResize, ref])

	return (
		<motion.span
			ref={ref}
			className={className}
			data-button-content={isPresent ? "" : undefined}
			aria-hidden={!isPresent || undefined}
			inert={!isPresent || undefined}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={transition}
		>
			{children}
		</motion.span>
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
