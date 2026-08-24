import type React from "react"
import {
	Link as WouterLink,
	Redirect,
	Route,
	Router,
	Switch as WouterSwitch,
	useRoute,
} from "wouter"
import { style, useStyles } from "purse-styles"
import { Select, SelectItem } from "../components/Select"
import { H3, Label } from "../components/Typography"
import { navigationItem } from "../components/navigationItem"
import { colors } from "../tokens/colors"
import { flex, grid } from "../tokens/layout"
import { spacing } from "../tokens/spacing"
import { type ThemePreference, useTheme } from "../theme/ThemeContext"
import { AboutPage } from "./AboutPage"
import { AiChatPage } from "./AiChatPage"
import { AssistantMessagePage } from "./AssistantMessagePage"
import { AvatarPage } from "./AvatarPage"
import { BadgePage } from "./BadgePage"
import { BackgroundColorTokenPage } from "./BackgroundColorTokenPage"
import { BordersTokenPage } from "./BordersTokenPage"
import { ButtonsPage } from "./ButtonsPage"
import { CalendarPage } from "./CalendarPage"
import { CodePage } from "./CodePage"
import { ColorTokenPage } from "./ColorTokenPage"
import { CornerRadiusTokenPage } from "./CornerRadiusTokenPage"
import { EditorPage } from "./EditorPage"
import { EmailClientPage } from "./EmailClientPage"
import { FocusRingTokenPage } from "./FocusRingTokenPage"
import { FormControlsPage } from "./FormControlsPage"
import { FuzzyStringPage } from "./FuzzyStringPage"
import { IconsPage } from "./IconsPage"
import { InboxPage } from "./InboxPage"
import { JsxEditorPage } from "./JsxEditorPage"
import { LayoutTokenPage } from "./LayoutTokenPage"
import { LayoutUtilitiesPage } from "./LayoutUtilitiesPage"
import { ListBoxPage } from "./ListBoxPage"
import { LoaderPage } from "./LoaderPage"
import { MenuPage } from "./MenuPage"
import { MessageListPage } from "./MessageListPage"
import { MotionTokenPage } from "./MotionTokenPage"
import { ProsePage } from "./ProsePage"
import { ShadowTokenPage } from "./ShadowTokenPage"
import { SidebarPage } from "./SidebarPage"
import { SizingTokenPage } from "./SizingTokenPage"
import { SelectPage } from "./SelectPage"
import { SpacingTokenPage } from "./SpacingTokenPage"
import { TextPage } from "./TextPage"
import { TextTokenPage } from "./TextTokenPage"
import { TooltipPage } from "./TooltipPage"

export function Maui() {
	return (
		<Router>
			<MauiContent />
		</Router>
	)
}

type NavItem = {
	label: string
	path: string
	page: React.ComponentType
}

type NavGroup = {
	label: string
	children: NavItem[]
}

type NavEntry = NavItem | NavGroup

function isNavGroup(entry: NavEntry): entry is NavGroup {
	return "children" in entry
}

function navItems(entries: NavEntry[]): NavItem[] {
	return entries.flatMap((entry) =>
		isNavGroup(entry) ? entry.children : [entry],
	)
}

const navigation: NavEntry[] = [
	{ label: "Editor", path: "/editor", page: JsxEditorPage },
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
			{ label: "Avatar", path: "/components/avatar", page: AvatarPage },
			{ label: "Badge", path: "/components/badge", page: BadgePage },
			{ label: "Buttons", path: "/components/buttons", page: ButtonsPage },
			{
				label: "Prose",
				path: "/components/prose",
				page: ProsePage,
			},
			{ label: "Editor", path: "/components/editor", page: EditorPage },
			{ label: "Text", path: "/components/text", page: TextPage },
			{
				label: "Form controls",
				path: "/components/form-controls",
				page: FormControlsPage,
			},
			{ label: "Select", path: "/components/select", page: SelectPage },
			{
				label: "List box",
				path: "/components/list-box",
				page: ListBoxPage,
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
				label: "Code",
				path: "/components/code",
				page: CodePage,
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
			{
				label: "Assistant message",
				path: "/patterns/assistant-message",
				page: AssistantMessagePage,
			},
			{ label: "Sidebar", path: "/patterns/sidebar", page: SidebarPage },
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
			{ label: "AI chat", path: "/apps/ai-chat", page: AiChatPage },
			{
				label: "Calendar",
				path: "/apps/calendar",
				page: CalendarPage,
			},
		],
	},
	{ label: "About", path: "/about", page: AboutPage },
]

const defaultPath = "/tokens/color"

function MauiContent() {
	const shellClassName = useStyles(mauiShellClass)
	const contentClassName = useStyles(contentClass)

	return (
		<div className={shellClassName}>
			<MauiNavigation />

			<div className={contentClassName}>
				<WouterSwitch>
					{navItems(navigation).map((item) => (
						<Route key={item.path} path={item.path}>
							<item.page />
						</Route>
					))}

					<Route path="/patterns/calendar">
						<Redirect to="/apps/calendar" />
					</Route>
					<Route path="/components/code-block">
						<Redirect to="/components/code" />
					</Route>
					<Route path="/patterns/editor">
						<Redirect to="/components/editor" />
					</Route>
					<Route path="/temp/syntax">
						<Redirect to="/editor" />
					</Route>

					<Route>
						<Redirect to={defaultPath} />
					</Route>
				</WouterSwitch>
			</div>
		</div>
	)
}

function isThemePreference(value: unknown): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark"
}

function MauiNavigation() {
	const navClassName = useStyles(navClass)
	const navListClassName = useStyles(navListClass)
	const groupClassName = useStyles(navGroupClass)
	const childrenClassName = useStyles(navChildrenClass)
	const brandClassName = useStyles(navBrandClass)
	const markClassName = useStyles(navMarkClass)
	const { preference, setPreference } = useTheme()

	return (
		<nav className={navClassName} aria-label="Maui sections">
			<div className={brandClassName}>
				<span className={markClassName} aria-hidden="true" />
				<H3>Maui</H3>
			</div>
			<Select
				label="Theme"
				aria-label="Theme"
				selectedKey={preference}
				onSelectionChange={(key) => {
					if (isThemePreference(key)) {
						setPreference(key)
					}
				}}
			>
				<SelectItem id="system">System</SelectItem>
				<SelectItem id="light">Light</SelectItem>
				<SelectItem id="dark">Dark</SelectItem>
			</Select>
			<ul className={navListClassName}>
				{navigation.map((entry) =>
					isNavGroup(entry) ? (
						<li className={groupClassName} key={entry.label}>
							<Label>{entry.label}</Label>
							<ul className={childrenClassName}>
								{entry.children.map((item) => (
									<NavLink key={item.path} item={item} inset />
								))}
							</ul>
						</li>
					) : (
						<NavLink key={entry.path} item={entry} />
					),
				)}
			</ul>
		</nav>
	)
}

function NavLink(props: { item: NavItem; inset?: boolean }) {
	const className = useStyles(props.inset ? navLinkInsetClass : navLinkClass)
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

const mauiShellClass = style(
	grid({ columns: "sidebarContent", align: "start" }),
	{
		height: "100%",
		minHeight: 0,
	},
)

const contentClass = style(spacing.padding({ x: 16 }), {
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
})

const navClass = style(
	flex({ direction: "column", gap: 8 }),
	spacing.padding({ all: 2 }),
	{
		height: "100%",
		minHeight: 0,
		overflowY: "auto",
	},
)

const navBrandClass = style(flex({ direction: "column", gap: 12 }), {
	paddingTop: spacing.value(6),
})

const navMarkClass = style({
	width: "10px",
	height: "10px",
	borderRadius: "999px",
	backgroundColor: colors.accent[9],
})

const navListClass = style(flex({ direction: "column", gap: 8 }), {
	listStyleType: "none",
	padding: 0,
	margin: 0,
})

const navGroupClass = style(flex({ direction: "column", gap: 2 }), {
	margin: 0,
})

const navChildrenClass = style(flex({ direction: "column" }), {
	listStyleType: "none",
	margin: 0,
	padding: 0,
	gap: "1px",
})

const navLinkClass = style(navigationItem, {
	display: "block",
	textDecoration: "none",
	paddingInlineStart: 0,
})

const navLinkInsetClass = style(navLinkClass, {
	paddingInlineStart: spacing.value(4),
})
