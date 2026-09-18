import type React from "react"
import { useEffect, useState } from "react"
import {
	Link as WouterLink,
	Redirect,
	Route,
	Router,
	Switch as WouterSwitch,
	useLocation,
	useRoute,
} from "wouter"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Drawer } from "../components/Drawer"
import { Icons } from "../components/Icons"
import { Select, SelectItem } from "../components/Select"
import { H3, Label } from "../components/Typography"
import { navigationItem } from "../components/navigationItem"
import { colors } from "../tokens/colors"
import { flex, grid } from "../tokens/layout"
import { spacing } from "../tokens/spacing"
import { type ThemePreference, useTheme } from "../theme/ThemeContext"
import { galleryCompactMedia } from "./galleryCompact"
import { AboutPage } from "./AboutPage"
import { AiChatPage } from "./AiChatPage"
import { AssistantMessagePage } from "./AssistantMessagePage"
import { AvatarPage } from "./AvatarPage"
import { BadgePage } from "./BadgePage"
import { BackgroundColorTokenPage } from "./BackgroundColorTokenPage"
import { BordersTokenPage } from "./BordersTokenPage"
import { ButtonsPage } from "./ButtonsPage"
import { DrawerPage } from "./DrawerPage"
import { CalendarPage } from "./CalendarPage"
import { CodePage } from "./CodePage"
import { CrossfadePage } from "./CrossfadePage"
// import { CrossfadeStudioPage } from "./CrossfadeStudioPage"
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
import { LoadingScreenPage } from "./LoadingScreenPage"
import { ListBoxPage } from "./ListBoxPage"
import { ThinkingPage } from "./ThinkingPage"
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
import { TablePage } from "./TablePage"
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
	{ label: "About", path: "/about", page: AboutPage },
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
			{ label: "Drawer", path: "/components/drawer", page: DrawerPage },
			{
				label: "Prose",
				path: "/components/prose",
				page: ProsePage,
			},
			{ label: "Editor", path: "/components/editor", page: EditorPage },
			{ label: "Thinking", path: "/components/thinking", page: ThinkingPage },
			{
				label: "Crossfade",
				path: "/components/crossfade",
				page: CrossfadePage,
			},
			// Dialkit studio — uncomment with CrossfadeStudioPage import to revive.
			// {
			// 	label: "Crossfade studio",
			// 	path: "/studio/crossfade",
			// 	page: CrossfadeStudioPage,
			// },
			{
				label: "Loading screen",
				path: "/components/loading-screen",
				page: LoadingScreenPage,
			},
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
			{ label: "Table", path: "/components/table", page: TablePage },
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
]

const defaultPath = "/tokens/color"

function useGalleryCompact() {
	const [compact, setCompact] = useState(() =>
		typeof window === "undefined"
			? false
			: window.matchMedia(galleryCompactMedia).matches,
	)

	useEffect(() => {
		const media = window.matchMedia(galleryCompactMedia)
		const onChange = () => setCompact(media.matches)
		media.addEventListener("change", onChange)
		return () => media.removeEventListener("change", onChange)
	}, [])

	return compact
}

function MauiContent() {
	const isCompact = useGalleryCompact()
	const [navOpen, setNavOpen] = useState(false)
	const [location] = useLocation()
	const shellClassName = useStyles(
		isCompact ? compactShellClass : mauiShellClass,
	)
	const contentClassName = useStyles(contentClass)
	const compactHeaderClassName = useStyles(compactHeaderClass)

	useEffect(() => {
		setNavOpen(false)
	}, [location])

	useEffect(() => {
		if (!isCompact) {
			setNavOpen(false)
		}
	}, [isCompact])

	return (
		<div className={shellClassName}>
			{isCompact ? (
				<header className={compactHeaderClassName}>
					<Button
						variant="quiet"
						aria-label="Open navigation"
						onPress={() => setNavOpen(true)}
					>
						<Icons.Menu size="sm" />
					</Button>
					<H3>Maui</H3>
				</header>
			) : (
				<MauiNavigation />
			)}

			{isCompact ? (
				<Drawer
					isOpen={navOpen}
					onOpenChange={setNavOpen}
					side="start"
					aria-label="Navigation"
				>
					<MauiNavigation />
				</Drawer>
			) : null}

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
					<Route path="/patterns/loader">
						<Redirect to="/components/thinking" />
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
	const controlClassName = useStyles(navControlClass)
	const { preference, setPreference } = useTheme()

	return (
		<nav className={navClassName} aria-label="Maui sections">
			<div className={brandClassName}>
				<span className={markClassName} aria-hidden="true" />
				<H3>Maui</H3>
			</div>
			<div className={controlClassName}>
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
			</div>
			<ul className={navListClassName}>
				{navigation.map((entry) =>
					isNavGroup(entry) ? (
						<li className={groupClassName} key={entry.label}>
							<Label>{entry.label}</Label>
							<ul className={childrenClassName}>
								{entry.children.map((item) => (
									<NavLink key={item.path} item={item} />
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

const mauiShellClass = style(
	grid({ columns: "sidebarContent", alignItems: "start" }),
	{
		height: "100%",
		minHeight: 0,
	},
)

const compactShellClass = style(flex({ direction: "column" }), {
	height: "100%",
	minHeight: 0,
})

const compactHeaderClass = style(
	flex({ direction: "row", alignItems: "center", gap: 2 }),
	{
		flexShrink: 0,
		minHeight: "36px",
		paddingInline: spacing.value(2),
		paddingBlock: spacing.value(1),
	},
)

const contentClass = style(spacing.padding({ x: 16 }), {
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
	flex: 1,
	[`@media ${galleryCompactMedia}`]: {
		paddingInline: spacing.value(4),
	},
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
	paddingInline: spacing.value(4),
})

const navMarkClass = style({
	width: "10px",
	height: "10px",
	borderRadius: "999px",
	backgroundColor: colors.accent[9],
})

const navListClass = style(flex({ direction: "column", gap: 0 }), {
	listStyleType: "none",
	padding: 0,
	margin: 0,
})

const navGroupClass = style(flex({ direction: "column", gap: 2 }), {
	margin: 0,
	"& > label": {
		marginTop: spacing.value(8),
		marginBottom: spacing.value(2),
		paddingInline: spacing.value(4),
	},
})

const navControlClass = style({
	"& > * > span:first-child": {
		paddingInline: spacing.value(4),
	},
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
})
