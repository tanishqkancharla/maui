import type React from "react"
import { style, useStyles } from "purse-styles"
import { border } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"

type PanelProps = React.ComponentPropsWithoutRef<"div">

const panelClass = style(
	spacing.padding({ all: 16 }),
	border([], "outline"),
	radius.lg,
	{
		backgroundColor: colors.gray[1],
		backgroundImage: `radial-gradient(${colors.grayAlpha[3]} 1px, transparent 1px)`,
		backgroundSize: "12px 12px",
	},
)

export function Panel({ className, children, ...props }: PanelProps) {
	const panelClassName = useStyles(panelClass)

	return (
		<div
			{...props}
			className={[panelClassName, className].filter(Boolean).join(" ")}
		>
			{children}
		</div>
	)
}
