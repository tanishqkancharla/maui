import type React from "react"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { monospace, text } from "../tokens/text"

type CodeProps = React.HTMLAttributes<HTMLElement>

const markClass = style(
	text("xs", 400, "highContrast"),
	monospace,
	radius.sm,
	spacing.padding({ x: 2, y: 1 }),
	{
		backgroundColor: colors.gray[1],
		display: "inline",
		boxDecorationBreak: "clone",
		whiteSpace: "nowrap",
	},
)

export function Code({ className, children, ...props }: CodeProps) {
	const markClassName = useStyles(markClass)

	return (
		<code {...props} className={joinClassNames(markClassName, className)}>
			{children}
		</code>
	)
}

export function Kbd({ className, children, ...props }: CodeProps) {
	const markClassName = useStyles(markClass)

	return (
		<kbd {...props} className={joinClassNames(markClassName, className)}>
			{children}
		</kbd>
	)
}

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
