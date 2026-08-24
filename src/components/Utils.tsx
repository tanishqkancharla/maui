import { style, useStyles } from "purse-styles"
import React from "react"
import { border, type BorderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing, type Space } from "../tokens/spacing"

export type FlexShadow = keyof typeof shadow
export type FlexRadius = keyof typeof radius
export type FlexBorder = true | BorderColor

type PaddingProps = {
	top?: Space
	left?: Space
	right?: Space
	bottom?: Space
	x?: Space
	y?: Space
	xy?: Space
	children?: React.ReactNode
}

export function Padding(props: PaddingProps) {
	const className = useStyles(
		spacing.padding({
			top: props.top ?? props.y ?? props.xy,
			bottom: props.bottom ?? props.y ?? props.xy,
			left: props.left ?? props.x ?? props.xy,
			right: props.right ?? props.x ?? props.xy,
		}),
	)

	return <div className={className}>{props.children}</div>
}

type FlexProps = {
	gap?: Space
	p?: Space
	px?: Space
	py?: Space
	pt?: Space
	pb?: Space
	padding?: Space
	children?: React.ReactNode
	alignItems?: React.CSSProperties["alignItems"]
	style?: React.CSSProperties
	border?: FlexBorder
	shadow?: FlexShadow
	radius?: FlexRadius
} & (
	| {
			row?: undefined
			column: true
	  }
	| {
			row: true
			column?: undefined
	  }
)

export function Flex(props: FlexProps) {
	const {
		column,
		children,
		style: styleProp,
		gap,
		p,
		px,
		py,
		pt,
		pb,
		padding,
		alignItems,
		border: borderProp,
		shadow: shadowProp,
		radius: radiusProp,
	} = props
	const resolvedBorder =
		shadowProp || borderProp == null
			? undefined
			: borderProp === true
				? "outline"
				: borderProp
	const className = useStyles(
		flex({
			direction: column ? "column" : "row",
			gap,
		}),
		p === undefined &&
			px === undefined &&
			py === undefined &&
			pt === undefined &&
			pb === undefined &&
			padding === undefined
			? undefined
			: spacing.padding({
					all: p ?? padding,
					x: px,
					y: py,
					top: pt,
					bottom: pb,
				}),
		alignItems === undefined ? undefined : style({ alignItems }),
		shadowProp ? shadow[shadowProp] : undefined,
		resolvedBorder ? border([], resolvedBorder) : undefined,
		radiusProp ? radius[radiusProp] : undefined,
	)
	const rawStyle = styleProp as unknown
	const inlineStyle =
		rawStyle != null && typeof rawStyle === "object" && !Array.isArray(rawStyle)
			? (rawStyle as React.CSSProperties)
			: undefined

	return (
		<div className={className} style={inlineStyle}>
			{children}
		</div>
	)
}

type GapProps =
	| {
			width: Space
	  }
	| {
			height: Space
	  }

export function Gap(props: GapProps) {
	const className = useStyles(
		"width" in props
			? style({ width: spacing.value(props.width), flexShrink: 0 })
			: style({ height: spacing.value(props.height), flexShrink: 0 }),
	)

	return <div className={className} />
}

export function Spacer() {
	const className = useStyles(style({ flex: "1 1 auto" }))

	return <div className={className} />
}

const hrClass = style({
	border: "none",
	borderTop: `1.5px solid ${colors.gray[5]}`,
	marginTop: "1.5rem",
	marginBottom: "1.5rem",
	width: "100%",
})

export function Divider() {
	const className = useStyles(hrClass)

	return <hr className={className} />
}
