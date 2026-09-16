import { useState } from "react"
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
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { colors } from "../tokens/colors"

export function DrawerPage() {
	const [startOpen, setStartOpen] = useState(false)
	const [endOpen, setEndOpen] = useState(false)
	const [scrollOpen, setScrollOpen] = useState(false)
	const [selectedItem, setSelectedItem] = useState("overview")
	const playgroundClassName = useStyles(playgroundClass)
	const playgroundBarClassName = useStyles(playgroundBarClass)
	const playgroundTitleClassName = useStyles(playgroundTitleClass)
	const noteClassName = useStyles(noteClass)

	function selectAndClose(id: string, close: (open: boolean) => void) {
		setSelectedItem(id)
		close(false)
	}

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Drawer</H2>
			<P>
				A RAC modal overlay that slides in from a logical edge. It is the
				mobile shell for nav — not a <code>Sidebar</code> prop and not a
				retrofit of click-only <code>Overlay</code> / <code>Dialog</code>.
				Open with a button. Dismiss by swiping toward the edge, tapping the
				scrim, or pressing Escape. There is no edge-swipe-to-open.
			</P>

			<H3>Start</H3>
			<P>
				<code>side=&quot;start&quot;</code> (default). Width is 240px, capped
				at 85vw. Children are the panel — wrap the existing Sidebar recipe,
				or any nav.
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
				<code>side=&quot;end&quot;</code> slides from the inline-end edge
				(LTR right). <code>useLocale</code> maps the logical side.
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
				<code>onOpenChange</code>, <code>side</code>,{" "}
				<code>isDismissable</code> (default true), and panel children.
				Gestures, snap points, cookies, breakpoint hooks, and Trigger /
				Header / Footer / Rail stay out. Reduced motion is opacity-only,
				matching Crossfade’s <code>useReducedMotion</code>.
			</p>
		</Prose>
	)
}

function ExampleSidebar(props: {
	selectedItem: string
	onSelect: (id: string) => void
}) {
	const brandClassName = useStyles(sidebarBrandClass)
	const markClassName = useStyles(brandMarkClass)
	const titleClassName = useStyles(brandTitleClass)
	const subtitleClassName = useStyles(brandSubtitleClass)

	return (
		<Sidebar aria-label="Project navigation">
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
