import type React from "react"
import { style, useStyles } from "purse-styles"
import { radius } from "../tokens/radius"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>

export function Badge({ className, children, ...props }: BadgeProps) {
	const badgeClassName = useStyles(badgeClass)

	return (
		<span {...props} className={joinClassNames(badgeClassName, className)}>
			{children}
		</span>
	)
}

const badgeClass = style(radius.pill, {
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	minWidth: "20px",
	height: "18px",
	paddingInline: "4px",
	backgroundColor: "var(--sand-A4)",
	color: "var(--sand-11)",
	fontFamily:
		'"SF Compact", "SF Compact Text", "SF Pro Text", system-ui, sans-serif',
	fontSize: "12px",
	fontWeight: 500,
	fontVariantNumeric: "tabular-nums",
	lineHeight: "16px",
	whiteSpace: "nowrap",
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
