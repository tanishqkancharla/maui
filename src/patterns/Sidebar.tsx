import type React from "react"
import { useId } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import type { IconProps } from "../components/Icons"
import { navigationItem } from "../components/navigationItem"
import { background } from "../tokens/background"
import { colors } from "../tokens/colors"
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
	React.ComponentProps<typeof Button>,
	"children" | "type" | "variant"
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
			<Button
				{...props}
				type="button"
				variant="quiet"
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
			</Button>
		</li>
	)
}

const sidebarClass = style(
	flex({ direction: "column", gap: 8 }),
	radius.lg,
	spacing.padding({ all: 6 }),
	background.element,
	{
		width: "240px",
		minWidth: "240px",
	},
	shadow.subtle,
)

const sectionClass = style(flex({ direction: "column", gap: 4 }))

const sectionLabelClass = style(
	text("xs", 500, "lowContrast"),
	spacing.padding({ x: 3 }),
	{
		letterSpacing: "0.02em",
	},
)

const sectionListClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const itemClass = style(navigationItem, {
	display: "grid",
	gridTemplateColumns: "16px minmax(0, 1fr) auto",
	alignItems: "center",
	columnGap: spacing.value(3),
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
	width: "16px",
	height: "16px",
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
