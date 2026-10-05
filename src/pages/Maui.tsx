import type React from "react"
import { Suspense, useEffect, useState } from "react"
import { useFilter } from "react-aria"
import {
	Link as WouterLink,
	Redirect,
	Route,
	Router,
	Switch as WouterSwitch,
	useLocation,
	useRoute,
} from "wouter"
import { defineVars, style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Drawer } from "../components/Drawer"
import { SearchField } from "../components/Input"
import { Select, SelectItem } from "../components/Select"
import { H3, Label } from "../components/Typography"
import { navigationItem } from "../components/navigationItem"
import { Menu } from "../icons"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { flex, grid } from "../tokens/layout"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { type ThemePreference, useTheme } from "../theme/ThemeContext"
import { isScalePreference, useScale } from "../theme/ScaleContext"
import { LARGE_SCALE } from "../theme/dataScale"
import { galleryCompactMedia } from "./galleryCompact"
import { AboutPage } from "./AboutPage"
import { AvatarPage } from "./AvatarPage"
import { BadgePage } from "./BadgePage"
import { BackgroundColorTokenPage } from "./BackgroundColorTokenPage"
import { BordersTokenPage } from "./BordersTokenPage"
import { ButtonsPage } from "./ButtonsPage"
import { CalendarPage } from "./CalendarPage"
import { CodePage } from "./CodePage"
import { CrossfadePage } from "./CrossfadePage"
// import { CrossfadeStudioPage } from "./CrossfadeStudioPage"
import { ColorTokenPage } from "./ColorTokenPage"
import { CornerRadiusTokenPage } from "./CornerRadiusTokenPage"
import { DialogPage } from "./DialogPage"
import { EmailClientPage } from "./EmailClientPage"
import { FocusRingTokenPage } from "./FocusRingTokenPage"
import { FormControlsPage } from "./FormControlsPage"
import { FuzzyStringPage } from "./FuzzyStringPage"
import { InboxPage } from "./InboxPage"
import {
	AiChatPage,
	AssistantMessagePage,
	DrawerPage,
	EditorPage,
	IconsPage,
	JsxEditorPage,
} from "./GalleryDeferredPages"
import { LayoutTokenPage } from "./LayoutTokenPage"
import { LayoutUtilitiesPage } from "./LayoutUtilitiesPage"
import { LoadingScreenPage } from "./LoadingScreenPage"
import { ListBoxPage } from "./ListBoxPage"
import { ThinkingPage } from "./ThinkingPage"
import { MenuPage } from "./MenuPage"
import { MermaidDiagramPage } from "./MermaidDiagramPage"
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
import { TabBarPage } from "./TabBarPage"
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
			{ label: "Dialog", path: "/components/dialog", page: DialogPage },
			{ label: "Tab bar", path: "/components/tab-bar", page: TabBarPage },
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
			{
				label: "Mermaid diagram",
				path: "/components/mermaid-diagram",
				page: MermaidDiagramPage,
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

const defaultPath = "/about"

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
						<Menu size="sm" />
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
				<Suspense fallback={null}>
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
				</Suspense>
			</div>
		</div>
	)
}

function isThemePreference(value: unknown): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark"
}

function MauiNavigation() {
	const [query, setQuery] = useState("")
	const navClassName = useStyles(navClass)
	const navListClassName = useStyles(navListClass)
	const groupClassName = useStyles(navGroupClass)
	const childrenClassName = useStyles(navChildrenClass)
	const brandClassName = useStyles(navBrandClass)
	const markClassName = useStyles(navMarkClass)
	const controlClassName = useStyles(navControlClass)
	const dividerClassName = useStyles(navDividerClass)
	const emptyClassName = useStyles(navEmptyClass)
	const { preference, setPreference } = useTheme()
	const { preference: scale, setPreference: setScale } = useScale()
	const { contains } = useFilter({ sensitivity: "base" })
	const normalizedQuery = query.trim()
	const filteredNavigation = normalizedQuery
		? navigation.flatMap<NavEntry>((entry) => {
				if (!isNavGroup(entry)) {
					return contains(entry.label, normalizedQuery) ? [entry] : []
				}

				const children = contains(entry.label, normalizedQuery)
					? entry.children
					: entry.children.filter((item) =>
							contains(item.label, normalizedQuery),
						)
				return children.length > 0 ? [{ ...entry, children }] : []
			})
		: navigation

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (
				event.key !== "/" ||
				event.defaultPrevented ||
				event.metaKey ||
				event.ctrlKey ||
				event.altKey
			) {
				return
			}

			if (
				event.target instanceof HTMLElement &&
				(event.target.isContentEditable ||
					event.target.closest("input, textarea, select"))
			) {
				return
			}

			const search = document.getElementById("gallery-navigation-search")
			if (search instanceof HTMLInputElement) {
				event.preventDefault()
				search.focus()
			}
		}

		window.addEventListener("keydown", onKeyDown)
		return () => window.removeEventListener("keydown", onKeyDown)
	}, [])

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
				<Select
					label="Scale"
					aria-label="Scale"
					selectedKey={scale}
					onSelectionChange={(key) => {
						if (isScalePreference(key)) setScale(key)
					}}
				>
					<SelectItem id="system">System</SelectItem>
					<SelectItem id="medium">Medium</SelectItem>
					<SelectItem id="large">Large</SelectItem>
				</Select>
				<SearchField
					id="gallery-navigation-search"
					aria-label="Search pages"
					aria-keyshortcuts="/"
					placeholder="Search pages"
					keyboardHint="/"
					value={query}
					onChange={setQuery}
				/>
				<div className={dividerClassName} aria-hidden="true" />
			</div>
			<ul className={navListClassName}>
				{filteredNavigation.map((entry) =>
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
				{filteredNavigation.length === 0 ? (
					<li className={emptyClassName} aria-live="polite">
						No pages found.
					</li>
				) : null}
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

const navInsets = defineVars({
	padding: { default: "4px", [LARGE_SCALE]: "12px" },
})

const navClass = style(flex({ direction: "column", gap: 8 }), {
	padding: navInsets.padding,
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
})

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

const navEmptyClass = style(
	text({ size: "xs", fontWeight: 400, color: "lowContrast" }),
	spacing.padding({ x: 4, y: 6 }),
)

const navGroupClass = style(flex({ direction: "column", gap: 2 }), {
	margin: 0,
	"& > label": {
		marginTop: spacing.value(8),
		marginBottom: spacing.value(2),
		paddingInline: spacing.value(4),
	},
})

const navControlClass = style(flex({ direction: "column", gap: 6 }), {
	"& > * > span:first-child": {
		paddingInline: spacing.value(4),
	},
})

const navDividerClass = style({
	height: "1px",
	marginInline: spacing.value(4),
	backgroundColor: borderColor.border,
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
