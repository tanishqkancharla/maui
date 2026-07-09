import { style, useStyles } from "purse-styles"
import React from "react"

type PaddingProps = {
	top?: number
	left?: number
	right?: number
	bottom?: number
	x?: number
	y?: number
	xy?: number
	children?: React.ReactNode
}

export function Padding(props: PaddingProps) {
	const paddingTop = props.top || props.y || props.xy || 0
	const paddingLeft = props.left || props.x || props.xy || 0
	const paddingRight = props.right || props.x || props.xy || 0
	const paddingBottom = props.bottom || props.y || props.xy || 0

	return (
		<div style={{ paddingTop, paddingLeft, paddingRight, paddingBottom }}>
			{props.children}
		</div>
	)
}

type FlexProps = {
	gap?: number
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
	const { column, children, style, ...rest } = props
	const direction = column ? "column" : "row"

	return (
		<div
			style={{ display: "flex", flexDirection: direction, ...rest, ...style }}
		>
			{children}
		</div>
	)
}
type GapProps =
	| {
			width: number
	  }
	| {
			height: number
	  }

export function Gap(props: GapProps) {
	return <div style={{ ...props }} />
}

export function Spacer() {
	return <div style={{ flex: "1 1 auto" }} />
}

const hrClass = style({
	border: "none",
	borderTop: "1.5px solid var(--gray-5)",
	marginTop: "1.5rem",
	marginBottom: "1.5rem",
	width: "100%",
})

export function Divider() {
	const className = useStyles(hrClass)

	return <hr className={className} />
}
