import { style, useStyles } from "purse-styles"
import React from "react"
import { colors } from "../tokens/colors"
import { flex } from "../tokens/layout"
import { spacing, type Space } from "../tokens/spacing"

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
	children?: React.ReactNode
	alignItems?: React.CSSProperties["alignItems"]
	style?: React.CSSProperties
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
	const { column, children, style: styleProp, gap, alignItems } = props
	const className = useStyles(
		flex({
			direction: column ? "column" : "row",
			gap,
		}),
		alignItems === undefined ? undefined : style({ alignItems }),
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
