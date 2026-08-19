import type React from "react"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { monospace, text } from "../tokens/text"

type CodeProps = React.HTMLAttributes<HTMLElement>

const codeClass = style(
	text("xs", 400, "highContrast"),
	monospace,
	radius.sm,
	spacing.padding({ x: 2, y: 1 }),
	{
		backgroundColor: colors.gray[3],
		display: "inline",
		boxDecorationBreak: "clone",
		whiteSpace: "nowrap",
	},
)

const kbdClass = style(
	text("sm", 400, "lowContrast"),
	radius.sm,
	{
		backgroundColor: colors.gray[3],
		boxDecorationBreak: "clone",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		paddingInline: 3,
		paddingBlock: 0,
		whiteSpace: "nowrap",
	},
)

export function Code({ className, children, ...props }: CodeProps) {
	const codeClassName = useStyles(codeClass)

	return (
		<code {...props} className={joinClassNames(codeClassName, className)}>
			{children}
		</code>
	)
}

export function Kbd({ className, children, ...props }: CodeProps) {
	const kbdClassName = useStyles(kbdClass)

	return (
		<kbd {...props} className={joinClassNames(kbdClassName, className)}>
			{children}
		</kbd>
	)
}

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
