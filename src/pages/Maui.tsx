import type React from "react"
import {
	Link as WouterLink,
	Redirect,
	Route,
	Router,
	Switch as WouterSwitch,
	useRoute,
} from "wouter"
import { useHashLocation } from "wouter/use-hash-location"
import { style, useStyles } from "purse-styles"
import { H3, Label } from "../components/Typography"
import { Gap } from "../components/Utils"
import { flex, grid } from "../tokens/layout"
import { menuItem } from "../components/Menu"
import { spacing } from "../tokens/spacing"
import { BackgroundColorTokenPage } from "./BackgroundColorTokenPage"
import { BordersTokenPage } from "./BordersTokenPage"
import { ButtonsPage } from "./ButtonsPage"
import { CodeBlockPage } from "./CodeBlockPage"
import { ColorTokenPage } from "./ColorTokenPage"
import { CornerRadiusTokenPage } from "./CornerRadiusTokenPage"
import { EmailClientPage } from "./EmailClientPage"
import { FileTreePage } from "./FileTreePage"
import { FocusRingTokenPage } from "./FocusRingTokenPage"
import { FormControlsPage } from "./FormControlsPage"
import { FuzzyStringPage } from "./FuzzyStringPage"
import { IconsPage } from "./IconsPage"
import { InboxPage } from "./InboxPage"
import { LayoutTokenPage } from "./LayoutTokenPage"
import { LayoutUtilitiesPage } from "./LayoutUtilitiesPage"
import { LoaderPage } from "./LoaderPage"
import { MenuPage } from "./MenuPage"
import { MessageListPage } from "./MessageListPage"
import { MotionTokenPage } from "./MotionTokenPage"
import { ProsePage } from "./ProsePage"
import { ShadowTokenPage } from "./ShadowTokenPage"
import { SidebarPage } from "./SidebarPage"
import { SizingTokenPage } from "./SizingTokenPage"
import { SpacingTokenPage } from "./SpacingTokenPage"
import { TextTokenPage } from "./TextTokenPage"
import { TooltipPage } from "./TooltipPage"

export function Maui() {
	return (
		<Router hook={useHashLocation}>
			<MauiContent />
		</Router>
	)
}

type NavGroup = {
	label: string
	children: NavItem[]
}

type NavItem = {
	label: string
	path: string
	page: React.ComponentType
}

const navigation: NavGroup[] = [
	{
		label: "Tokens",
		children: [
			{ label: "Color", path: "/tokens/color", page: ColorTokenPage },
			{ label: "Text", path: "/tokens/text", page: TextTokenPage },
			{
				label: "Background color",
				path: "/tokens/background-color",
				page: BackgroundColorTokenPage,
			},
			{
				label: "Corner radius",
				path: "/tokens/corner-radius",
				page: CornerRadiusTokenPage,
			},
			{ label: "Borders", path: "/tokens/borders", page: BordersTokenPage },
			{ label: "Spacing", path: "/tokens/spacing", page: SpacingTokenPage },
			{ label: "Sizing", path: "/tokens/sizing", page: SizingTokenPage },
			{ label: "Shadows", path: "/tokens/shadows", page: ShadowTokenPage },
			{ label: "Motion", path: "/tokens/motion", page: MotionTokenPage },
			{
				label: "Focus ring",
				path: "/tokens/focus-ring",
				page: FocusRingTokenPage,
			},
			{ label: "Layout", path: "/tokens/layout", page: LayoutTokenPage },
		],
	},
	{
		label: "Components",
		children: [
			{ label: "Buttons", path: "/components/buttons", page: ButtonsPage },
			{
				label: "Prose",
				path: "/components/prose",
				page: ProsePage,
			},
			{
				label: "Form controls",
				path: "/components/form-controls",
				page: FormControlsPage,
			},
			{ label: "Menu", path: "/components/menu", page: MenuPage },
			{ label: "Tooltip", path: "/components/tooltip", page: TooltipPage },
			{
				label: "Layout utilities",
				path: "/components/layout-utilities",
				page: LayoutUtilitiesPage,
			},
			{
				label: "FuzzyString",
				path: "/components/fuzzy-string",
				page: FuzzyStringPage,
			},
			{ label: "Icons", path: "/components/icons", page: IconsPage },
			{
				label: "CodeBlock",
				path: "/components/code-block",
				page: CodeBlockPage,
			},
		],
	},
	{
		label: "Patterns",
		children: [
			{ label: "Inbox", path: "/patterns/inbox", page: InboxPage },
			{
				label: "Message list",
				path: "/patterns/message-list",
				page: MessageListPage,
			},
			{ label: "Sidebar", path: "/patterns/sidebar", page: SidebarPage },
			{ label: "File tree", path: "/patterns/file-tree", page: FileTreePage },
			{ label: "Loader", path: "/patterns/loader", page: LoaderPage },
		],
	},
	{
		label: "Apps",
		children: [
			{
				label: "Email client",
				path: "/apps/email-client",
				page: EmailClientPage,
			},
		],
	},
]

const defaultPath = navigation[0].children[0].path

function MauiContent() {
	const shellClassName = useStyles(mauiShellClass)
	const contentClassName = useStyles(contentClass)

	return (
		<div className={shellClassName}>
			<MauiNavigation />

			<div className={contentClassName}>
				<WouterSwitch>
					{navigation.flatMap((group) =>
						group.children.map((item) => (
							<Route key={item.path} path={item.path}>
								<item.page />
							</Route>
						)),
					)}

					<Route>
						<Redirect to={defaultPath} />
					</Route>
				</WouterSwitch>
			</div>
		</div>
	)
}

function MauiNavigation() {
	const navClassName = useStyles(navClass)
	const navListClassName = useStyles(navListClass)
	const groupClassName = useStyles(navGroupClass)
	const childrenClassName = useStyles(navChildrenClass)

	return (
		<nav className={navClassName} aria-label="Maui sections">
			<H3>Maui</H3>
			<Gap height={12} />
			<ul className={navListClassName}>
				{navigation.map((group) => (
					<li className={groupClassName} key={group.label}>
						<Label>{group.label}</Label>
						<ul className={childrenClassName}>
							{group.children.map((item) => (
								<NavLink key={item.path} item={item} />
							))}
						</ul>
					</li>
				))}
			</ul>
		</nav>
	)
}

function NavLink(props: { item: NavItem }) {
	const className = useStyles(navLinkClass)
	const [selected] = useRoute(props.item.path)

	return (
		<li>
			<WouterLink
				className={className}
				href={props.item.path}
				aria-current={selected ? "page" : undefined}
			>
				{props.item.label}
			</WouterLink>
		</li>
	)
}

const mauiShellClass = style(grid({ columns: "sidebarContent", align: "start" }), {
	height: "100%",
	minHeight: 0,
})

const contentClass = style(spacing.padding({ x: 16 }), {
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
})

const navClass = style({
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
})

const navListClass = style(flex({ direction: "column", gap: 8 }), {
	listStyleType: "none",
	padding: 0,
	margin: 0,
})

const navGroupClass = style(flex({ direction: "column", gap: 4 }), {
	margin: 0,
})

const navChildrenClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const navLinkClass = style(menuItem, {
	display: "block",
	textDecoration: "none",
})
