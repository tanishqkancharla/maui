import { Drawer as BaseDrawer } from "@base-ui/react/drawer"
import { Sheet as SilkSheet } from "@silk-hq/components"
import "@silk-hq/components/layered-styles.css"
import { useEffect, useState } from "react"
import { style, useStyles } from "purse-styles"
import { Badge } from "../components/Badge"
import { Button } from "../components/Button"
import { Drawer } from "../components/Drawer"
import { Icons } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { Sidebar, SidebarItem, SidebarSection } from "../patterns/Sidebar"
import { flex } from "../tokens/layout"
import { backgroundColor } from "../tokens/background"
import { radius } from "../tokens/radius"
import { shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { colors } from "../tokens/colors"
import { visuallyHidden } from "../tokens/visuallyHidden"

export function DrawerPage() {
	const [startOpen, setStartOpen] = useState(false)
	const [endOpen, setEndOpen] = useState(false)
	const [scrollOpen, setScrollOpen] = useState(false)
	const [shadcnOpen, setShadcnOpen] = useState(false)
	const [silkOpen, setSilkOpen] = useState(false)
	const [selectedItem, setSelectedItem] = useState("overview")
	const playgroundClassName = useStyles(playgroundClass)
	const playgroundBarClassName = useStyles(playgroundBarClass)
	const playgroundTitleClassName = useStyles(playgroundTitleClass)
	const noteClassName = useStyles(noteClass)
	const comparisonActionsClassName = useStyles(comparisonActionsClass)

	useEffect(() => {
		// Base UI's Drawer requires a positioned body to cover a scrolled viewport
		// correctly in iOS Safari. Keep that requirement local to this gallery page.
		const previousPosition = document.body.style.position
		document.body.style.position = "relative"
		return () => {
			document.body.style.position = previousPosition
		}
	}, [])

	function selectAndClose(id: string, close: (open: boolean) => void) {
		setSelectedItem(id)
		close(false)
	}

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Drawer</H2>
			<P>
				A RAC modal overlay that slides in from a logical edge. It is the mobile
				shell for nav — not a <code>Sidebar</code> prop and not a retrofit of
				click-only <code>Overlay</code> / <code>Dialog</code>. Open with a
				button. Dismiss by swiping toward the edge, tapping the scrim, or
				pressing Escape. There is no edge-swipe-to-open.
			</P>

			<H3>Start</H3>
			<P>
				<code>side=&quot;start&quot;</code> (default). Width is 240px, capped at
				85vw. Children are the panel — wrap the existing Sidebar recipe, or any
				nav.
			</P>
			<Panel className={playgroundClassName}>
				<div className={playgroundBarClassName}>
					<Button
						variant="quiet"
						aria-label="Open navigation"
						onPress={() => setStartOpen(true)}
					>
						<Icons.Menu size="sm" />
					</Button>
					<span className={playgroundTitleClassName}>Workspace</span>
				</div>
				<Drawer
					isOpen={startOpen}
					onOpenChange={setStartOpen}
					side="start"
					aria-label="Navigation"
				>
					<ExampleSidebar
						selectedItem={selectedItem}
						onSelect={(id) => selectAndClose(id, setStartOpen)}
					/>
				</Drawer>
			</Panel>

			<H3>End</H3>
			<P>
				<code>side=&quot;end&quot;</code> slides from the inline-end edge (LTR
				right). <code>useLocale</code> maps the logical side.
			</P>
			<Flex row alignItems="center" gap={4}>
				<Button onPress={() => setEndOpen(true)}>Open end drawer</Button>
			</Flex>
			<Drawer
				isOpen={endOpen}
				onOpenChange={setEndOpen}
				side="end"
				aria-label="Filters"
			>
				<ExampleSidebar
					selectedItem={selectedItem}
					onSelect={(id) => selectAndClose(id, setEndOpen)}
				/>
			</Drawer>

			<H3>Nested scroll</H3>
			<P>
				Vertical lists inside the panel scroll. Horizontal drag-to-dismiss
				starts only after a clear X-axis intent, so a vertical fling is not
				stolen.
			</P>
			<Button onPress={() => setScrollOpen(true)}>
				Open drawer with a long list
			</Button>
			<Drawer
				isOpen={scrollOpen}
				onOpenChange={setScrollOpen}
				aria-label="Sections"
			>
				<Flex column gap={2} p={4} style={{ minHeight: "140vh" }}>
					{longList.map((label) => (
						<Button
							key={label}
							variant="quiet"
							onPress={() => setScrollOpen(false)}
						>
							{label}
						</Button>
					))}
				</Flex>
			</Drawer>

			<H3>Library comparison</H3>
			<P>
				These use the same 240px navigation content for an apples-to-apples
				gesture test. The shadcn example uses its current Base UI Drawer
				foundation; the Silk example uses Silk Sheet directly. Swipe each panel
				toward the left edge, tap the scrim, or press Escape.
			</P>
			<div className={comparisonActionsClassName}>
				<Button onPress={() => setShadcnOpen(true)}>
					Open shadcn / Base UI
				</Button>
				<Button onPress={() => setSilkOpen(true)}>Open Silk Sheet</Button>
			</div>
			<ShadcnDrawerComparison
				open={shadcnOpen}
				onOpenChange={setShadcnOpen}
				selectedItem={selectedItem}
				onSelect={(id) => selectAndClose(id, setShadcnOpen)}
			/>
			<SilkSheetComparison
				open={silkOpen}
				onOpenChange={setSilkOpen}
				selectedItem={selectedItem}
				onSelect={(id) => selectAndClose(id, setSilkOpen)}
			/>
			<p className={noteClassName}>
				These are comparison-only gallery dependencies, not additions to Maui’s
				public component API. Silk is declared as non-commercial for this local
				open-source evaluation.
			</p>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`const [open, setOpen] = useState(false)

<Button variant="quiet" aria-label="Open navigation" onPress={() => setOpen(true)}>
  <Menu size="sm" />
</Button>

<Drawer
  isOpen={open}
  onOpenChange={setOpen}
  side="start"
  aria-label="Navigation"
>
  <Sidebar>{/* existing pattern */}</Sidebar>
</Drawer>`}</CodeBlock>
			<p className={noteClassName}>
				Public API is RAC <code>isOpen</code> / <code>defaultOpen</code> /{" "}
				<code>onOpenChange</code>, <code>side</code>, <code>isDismissable</code>{" "}
				(default true), and panel children. Gestures, snap points, cookies,
				breakpoint hooks, and Trigger / Header / Footer / Rail stay out. Reduced
				motion is opacity-only, matching Crossfade’s{" "}
				<code>useReducedMotion</code>.
			</p>
		</Prose>
	)
}

type ComparisonDrawerProps = {
	open: boolean
	onOpenChange: (open: boolean) => void
	selectedItem: string
	onSelect: (id: string) => void
}

function ShadcnDrawerComparison(props: ComparisonDrawerProps) {
	const backdropClassName = useStyles(comparisonBackdropClass)
	const viewportClassName = useStyles(baseViewportClass)
	const popupClassName = useStyles(basePopupClass)
	const contentClassName = useStyles(comparisonContentClass)
	const titleClassName = useStyles(visuallyHidden)
	const sidebarClassName = useStyles(comparisonSidebarClass)

	return (
		<BaseDrawer.Root
			open={props.open}
			onOpenChange={props.onOpenChange}
			swipeDirection="left"
		>
			<BaseDrawer.Portal>
				<BaseDrawer.Backdrop className={backdropClassName} />
				<BaseDrawer.Viewport className={viewportClassName}>
					<BaseDrawer.Popup className={popupClassName}>
						<BaseDrawer.Content className={contentClassName}>
							<BaseDrawer.Title className={titleClassName}>
								shadcn navigation
							</BaseDrawer.Title>
							<BaseDrawer.Description className={titleClassName}>
								Base UI-powered side drawer comparison
							</BaseDrawer.Description>
							<ExampleSidebar
								className={sidebarClassName}
								selectedItem={props.selectedItem}
								onSelect={props.onSelect}
							/>
						</BaseDrawer.Content>
					</BaseDrawer.Popup>
				</BaseDrawer.Viewport>
			</BaseDrawer.Portal>
		</BaseDrawer.Root>
	)
}

function SilkSheetComparison(props: ComparisonDrawerProps) {
	const viewClassName = useStyles(silkViewClass)
	const backdropClassName = useStyles(silkBackdropClass)
	const contentClassName = useStyles(silkContentClass)
	const backgroundClassName = useStyles(silkBackgroundClass)
	const titleClassName = useStyles(visuallyHidden)
	const sidebarClassName = useStyles(comparisonSidebarClass)

	return (
		<SilkSheet.Root
			license="non-commercial"
			sheetRole="dialog"
			presented={props.open}
			onPresentedChange={props.onOpenChange}
			style={{ display: "contents" }}
		>
			<SilkSheet.Portal>
				<SilkSheet.View
					className={viewClassName}
					contentPlacement="left"
					tracks="left"
					nativeEdgeSwipePrevention
				>
					<SilkSheet.Backdrop className={backdropClassName} />
					<SilkSheet.Content className={contentClassName}>
						<SilkSheet.BleedingBackground className={backgroundClassName} />
						<SilkSheet.Title className={titleClassName}>
							Silk navigation
						</SilkSheet.Title>
						<SilkSheet.Description className={titleClassName}>
							Silk Sheet side drawer comparison
						</SilkSheet.Description>
						<ExampleSidebar
							className={sidebarClassName}
							selectedItem={props.selectedItem}
							onSelect={props.onSelect}
						/>
					</SilkSheet.Content>
				</SilkSheet.View>
			</SilkSheet.Portal>
		</SilkSheet.Root>
	)
}

function ExampleSidebar(props: {
	className?: string
	selectedItem: string
	onSelect: (id: string) => void
}) {
	const brandClassName = useStyles(sidebarBrandClass)
	const markClassName = useStyles(brandMarkClass)
	const titleClassName = useStyles(brandTitleClass)
	const subtitleClassName = useStyles(brandSubtitleClass)

	return (
		<Sidebar className={props.className} aria-label="Project navigation">
			<div className={brandClassName}>
				<div className={markClassName}>M</div>
				<div>
					<div className={titleClassName}>Maui Cloud</div>
					<div className={subtitleClassName}>Production</div>
				</div>
			</div>
			<SidebarSection label="Workspace">
				<SidebarItem
					active={props.selectedItem === "overview"}
					icon={Icons.Pin}
					onClick={() => props.onSelect("overview")}
				>
					Overview
				</SidebarItem>
				<SidebarItem
					active={props.selectedItem === "inbox"}
					icon={Icons.Envelope}
					onClick={() => props.onSelect("inbox")}
					trailing={<Badge>12</Badge>}
				>
					Inbox
				</SidebarItem>
				<SidebarItem
					active={props.selectedItem === "search"}
					icon={Icons.Search}
					onClick={() => props.onSelect("search")}
				>
					Search
				</SidebarItem>
			</SidebarSection>
			<SidebarSection label="Operations">
				<SidebarItem
					active={props.selectedItem === "deployments"}
					icon={Icons.Archive}
					onClick={() => props.onSelect("deployments")}
				>
					Deployments
				</SidebarItem>
				<SidebarItem
					active={props.selectedItem === "analytics"}
					icon={Icons.Star}
					onClick={() => props.onSelect("analytics")}
				>
					Analytics
				</SidebarItem>
			</SidebarSection>
		</Sidebar>
	)
}

const longList = [
	"Inbox",
	"Drafts",
	"Sent",
	"Archive",
	"Spam",
	"Trash",
	"Work",
	"Personal",
	"Newsletters",
	"Receipts",
	"Travel",
	"Later",
	"Waiting",
	"Flagged",
	"All mail",
]

const playgroundClass = style(radius.lg, {
	display: "flex",
	flexDirection: "column",
	minHeight: "220px",
	padding: spacing.value(4),
})

const playgroundBarClass = style(
	flex({ direction: "row", align: "center", gap: 2 }),
	{
		minHeight: "36px",
	},
)

const playgroundTitleClass = style(
	text({ size: "sm", fontWeight: 600, color: "highContrast" }),
)

const noteClass = style(
	text({ size: "md", fontWeight: 400, color: "lowContrast" }),
	{
		maxWidth: "72ch",
	},
)

const comparisonActionsClass = style({
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	gap: spacing.value(4),
})

const comparisonBackdropClass = style({
	position: "fixed",
	inset: 0,
	zIndex: 80,
	backgroundColor: `oklch(from ${colors.gray[12]} l c h / 0.34)`,
	opacity: "calc(1 - var(--drawer-swipe-progress, 0))",
	transition: "opacity 400ms ease-out",
	"&[data-starting-style], &[data-ending-style]": {
		opacity: 0,
	},
	"&[data-swiping]": {
		transitionDuration: "0ms",
	},
})

const baseViewportClass = style({
	position: "fixed",
	inset: 0,
	zIndex: 81,
	pointerEvents: "none",
	overflow: "hidden",
})

const basePopupClass = style({
	position: "absolute",
	insetBlock: 0,
	left: 0,
	pointerEvents: "auto",
	width: "min(240px, 85vw)",
	height: "100%",
	backgroundColor: backgroundColor.element,
	boxShadow: shadowVars.strong,
	transform: "translateX(var(--drawer-swipe-movement-x, 0px))",
	transition:
		"transform calc(var(--drawer-swipe-strength, 1) * 400ms) ease-out",
	"&[data-starting-style], &[data-ending-style]": {
		transform: "translateX(-100%)",
	},
	"&[data-swiping]": {
		transitionDuration: "0ms",
		userSelect: "none",
	},
})

const comparisonContentClass = style({
	height: "100%",
	overflow: "hidden",
})

const comparisonSidebarClass = style({
	height: "100%",
	width: "100%",
	minWidth: 0,
	borderRadius: 0,
	boxShadow: "none",
	overflowY: "auto",
})

const silkViewClass = style({
	zIndex: 90,
})

const silkBackdropClass = style({
	backgroundColor: colors.gray[12],
})

const silkContentClass = style({
	width: "min(240px, 85vw)",
	height: "100%",
	backgroundColor: "transparent",
	boxShadow: shadowVars.strong,
})

const silkBackgroundClass = style({
	backgroundColor: backgroundColor.element,
})

const sidebarBrandClass = style(flex({ align: "center", gap: 3 }), {
	paddingTop: spacing.value(6),
	paddingInline: spacing.value(4),
})

const brandMarkClass = style(
	text({ size: "sm", fontWeight: 600, color: "onAccent" }),
	radius.md,
	{
		display: "grid",
		placeItems: "center",
		width: "28px",
		height: "28px",
		backgroundColor: colors.accent[9],
	},
)

const brandTitleClass = style(
	text({ size: "sm", fontWeight: 600, color: "highContrast" }),
)

const brandSubtitleClass = style(
	text({ size: "xs", fontWeight: 400, color: "lowContrast" }),
)
