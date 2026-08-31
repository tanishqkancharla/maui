import type React from "react"
import { useId } from "react"
import { style, useStyles } from "purse-styles"
import type { IconProps } from "../components/Icons"
import { navigationItem } from "../components/navigationItem"
import { background } from "../tokens/background"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

type IconComponent = React.ComponentType<IconProps>

type SidebarProps = React.ComponentPropsWithoutRef<"nav">

export function Sidebar({ className, children, ...props }: SidebarProps) {
	const sidebarClassName = useStyles(sidebarClass)

	return (
		<nav {...props} className={joinClassNames(sidebarClassName, className)}>
			{children}
		</nav>
	)
}

type SidebarSectionProps = {
	label: string
	children: React.ReactNode
	className?: string
}

export function SidebarSection(props: SidebarSectionProps) {
	const labelId = useId()
	const sectionClassName = useStyles(sectionClass)
	const labelClassName = useStyles(sectionLabelClass)
	const listClassName = useStyles(sectionListClass)

	return (
		<section className={joinClassNames(sectionClassName, props.className)}>
			<div id={labelId} className={labelClassName}>
				{props.label}
			</div>
			<ul className={listClassName} aria-labelledby={labelId}>
				{props.children}
			</ul>
		</section>
	)
}

type SidebarItemProps = Omit<
	React.ComponentPropsWithoutRef<"button">,
	"children" | "type"
> & {
	active?: boolean
	children: React.ReactNode
	icon?: IconComponent
	trailing?: React.ReactNode
}

export function SidebarItem({
	active,
	children,
	className,
	icon: Icon,
	trailing,
	...props
}: SidebarItemProps) {
	const itemClassName = useStyles(itemClass)
	const iconWrapClassName = useStyles(
		iconWrapClass,
		...(active ? [iconWrapActiveClass] : []),
	)
	const labelClassName = useStyles(itemLabelClass)
	const trailingClassName = useStyles(trailingClass)

	return (
		<li>
			<button
				{...props}
				type="button"
				aria-current={active ? "page" : undefined}
				className={joinClassNames(itemClassName, className)}
			>
				<span className={iconWrapClassName}>
					{Icon ? <Icon size="sm" /> : null}
				</span>
				<span className={labelClassName}>{children}</span>
				{trailing ? (
					<span className={trailingClassName}>{trailing}</span>
				) : null}
			</button>
		</li>
	)
}

const iconColumn = "16px"
const iconToText = spacing.value(3)

const sidebarClass = style(
	flex({ direction: "column", gap: 8 }),
	radius.lg,
	spacing.padding({ all: 2 }),
	background.element,
	{
		width: "240px",
		minWidth: "240px",
	},
	shadow.subtle,
)

const sectionClass = style(flex({ direction: "column", gap: 2 }))

const sectionLabelClass = style(
	text({ size: "xs", fontWeight: 500, color: "lowContrast" }),
	{
		paddingInlineStart: `calc(${spacing.value(4)} + ${iconColumn} + ${iconToText})`,
		paddingInlineEnd: spacing.value(4),
	},
)

const sectionListClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const itemClass = style(navigationItem, focusRing("&:focus-visible"), {
	display: "grid",
	gridTemplateColumns: `${iconColumn} minmax(0, 1fr) auto`,
	alignItems: "center",
	columnGap: iconToText,
	minWidth: 0,
	border: 0,
	width: "100%",
	height: "auto",
	textDecoration: "none",
	textAlign: "left",
	backgroundColor: "transparent",
	color: colors.gray[12],
	"&[aria-current='page']": {
		color: colors.accent[9],
		fontWeight: 500,
		backgroundColor: "transparent",
	},
})

const iconWrapClass = style({
	display: "grid",
	placeItems: "center",
	flexShrink: 0,
	color: colors.gray[11],
	width: iconColumn,
	height: iconColumn,
})

const iconWrapActiveClass = style({
	color: colors.accent[9],
})

const itemLabelClass = style({
	fontSize: "13px",
	lineHeight: "20px",
	minWidth: 0,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const trailingClass = style({
	flexShrink: 0,
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
