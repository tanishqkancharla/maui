import type React from "react"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { monospace, text } from "../tokens/text"
import { memoize } from "../utils/memoize"

type CodeProps = React.HTMLAttributes<HTMLElement>

export type KbdVariant = "default" | "quiet"

export type KbdProps = CodeProps & {
	variant?: KbdVariant
}

const codeClass = style(
	monospace,
	radius.sm,
	spacing.padding({ x: 2, y: 1 }),
	{
		backgroundColor: colors.gray[3],
		color: colors.gray[12],
		display: "inline",
		boxDecorationBreak: "slice",
		fontSize: "0.875em",
		whiteSpace: "normal",
		overflowWrap: "anywhere",
	},
)

const kbdClass = style(
	text({ size: "xs", fontWeight: 400, color: "lowContrast" }),
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

const quietKbdClass = style(kbdClass, {
	backgroundColor: "transparent",
})

/** `root` on a `<code>` element (inline, no state). */
export const codeStyles = { root: codeClass } as const

export function Code({ className, children, ...props }: CodeProps) {
	const codeClassName = useStyles(codeStyles.root)

	return (
		<code {...props} className={joinClassNames(codeClassName, className)}>
			{children}
		</code>
	)
}

/** `root({ variant })` on a `<kbd>` element (inline keycap, no state). */
export const kbdStyles = {
	root: memoize(({ variant = "default" }: { variant?: KbdVariant } = {}) =>
		variant === "quiet" ? quietKbdClass : kbdClass,
	),
} as const

export function Kbd({
	className,
	children,
	variant = "default",
	...props
}: KbdProps) {
	const kbdClassName = useStyles(kbdStyles.root({ variant }))

	return (
		<kbd {...props} className={joinClassNames(kbdClassName, className)}>
			{children}
		</kbd>
	)
}

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
