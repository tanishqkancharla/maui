import type React from "react"
import { useId } from "react"
import { style, useStyles } from "purse-styles"
import { menuItem } from "../components/Menu"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>

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
	React.ButtonHTMLAttributes<HTMLButtonElement>,
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
	const iconClassName = useStyles(iconClass)
	const labelClassName = useStyles(itemLabelClass)
	const trailingClassName = useStyles(trailingClass)

	return (
		<li>
			<button
				{...props}
				type="button"
				aria-pressed={active ? true : props["aria-pressed"]}
				className={joinClassNames(itemClassName, className)}
			>
				<span className={iconWrapClassName}>
					{Icon ? <Icon className={iconClassName} /> : null}
				</span>
				<span className={labelClassName}>{children}</span>
				{trailing ? <span className={trailingClassName}>{trailing}</span> : null}
			</button>
		</li>
	)
}

const sidebarClass = style(
	flex({ direction: "column", gap: 8 }),
	radius.lg,
	spacing.padding({ all: 6 }),
	{
		width: "240px",
		minWidth: "240px",
		backgroundColor: "var(--sand-2)",
		boxShadow: "var(--shadow-minimal-flat)",
	}
)

const sectionClass = style(flex({ direction: "column", gap: 4 }))

const sectionLabelClass = style(
	text("xs", 500, "lowContrast"),
	spacing.padding({ x: 3 }),
	{
		letterSpacing: "0.02em",
	}
)

const sectionListClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const itemClass = style(menuItem, {
	display: "grid",
	gridTemplateColumns: "16px minmax(0, 1fr) auto",
	alignItems: "center",
	columnGap: "8px",
	minWidth: 0,
	paddingLeft: "6px",
	paddingRight: "6px",
	paddingTop: "4px",
	paddingBottom: "4px",
	border: 0,
	width: "100%",
	textDecoration: "none",
	textAlign: "left",
	backgroundColor: "transparent",
	"&[aria-pressed='true']": {
		backgroundColor: "var(--sand-A5)",
		color: "var(--accent-11)",
	},
})

const iconWrapClass = style(radius.sm, {
	display: "grid",
	placeItems: "center",
	flexShrink: 0,
	color: "var(--sand-11)",
	width: "20px",
	height: "20px",
	marginBlock: "-2px",
	marginLeft: "-2px",
})

const iconWrapActiveClass = style({
	color: "var(--accent-11)",
})

const iconClass = style({
	width: "16px",
	height: "16px",
})

const itemLabelClass = style({
	flex: "1 1 auto",
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
