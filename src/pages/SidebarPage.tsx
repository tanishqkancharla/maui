import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { Badge } from "../components/Badge"
import { Icons } from "../components/Icons"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Sidebar, SidebarItem, SidebarSection } from "../patterns/Sidebar"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

import { colors } from "../tokens/colors"
export function SidebarPage() {
	const [selectedItem, setSelectedItem] = useState("overview")
	const pageClassName = useStyles(pageClass)
	const shellClassName = useStyles(shellClass)
	const sidebarBrandClassName = useStyles(sidebarBrandClass)
	const brandMarkClassName = useStyles(brandMarkClass)
	const brandTextClassName = useStyles(brandTextClass)
	const brandTitleClassName = useStyles(brandTitleClass)
	const brandSubtitleClassName = useStyles(brandSubtitleClass)
	const exampleContentClassName = useStyles(exampleContentClass)
	const noteClassName = useStyles(noteClass)

	return (
		<Prose className={pageClassName}>
			<H2>Sidebar</H2>
			<P>
				A static desktop sidebar pattern for app navigation. It keeps the
				public API to a side panel, labeled sections, and active navigation
				items.
			</P>

			<H3>Example</H3>
			<Panel className={shellClassName}>
				<Sidebar aria-label="Project navigation">
					<div className={sidebarBrandClassName}>
						<div className={brandMarkClassName}>M</div>
						<div className={brandTextClassName}>
							<div className={brandTitleClassName}>Maui Cloud</div>
							<div className={brandSubtitleClassName}>Production</div>
						</div>
					</div>

					<SidebarSection label="Workspace">
						<SidebarItem
							active={selectedItem === "overview"}
							icon={Icons.Pin}
							onClick={() => setSelectedItem("overview")}
						>
							Overview
						</SidebarItem>
						<SidebarItem
							active={selectedItem === "inbox"}
							icon={Icons.Envelope}
							onClick={() => setSelectedItem("inbox")}
							trailing={<Badge>12</Badge>}
						>
							Inbox
						</SidebarItem>
						<SidebarItem
							active={selectedItem === "search"}
							icon={Icons.Search}
							onClick={() => setSelectedItem("search")}
						>
							Search
						</SidebarItem>
					</SidebarSection>

					<SidebarSection label="Operations">
						<SidebarItem
							active={selectedItem === "deployments"}
							icon={Icons.Archive}
							onClick={() => setSelectedItem("deployments")}
							trailing={<Badge>3</Badge>}
						>
							Deployments
						</SidebarItem>
						<SidebarItem
							active={selectedItem === "analytics"}
							icon={Icons.Star}
							onClick={() => setSelectedItem("analytics")}
						>
							Analytics
						</SidebarItem>
						<SidebarItem
							active={selectedItem === "audit-log"}
							icon={Icons.Clock}
							onClick={() => setSelectedItem("audit-log")}
						>
							Audit log
						</SidebarItem>
					</SidebarSection>

					<SidebarSection label="Account">
						<SidebarItem
							active={selectedItem === "settings"}
							icon={Icons.DotsHorizontal}
							onClick={() => setSelectedItem("settings")}
						>
							Settings
						</SidebarItem>
						<SidebarItem
							active={selectedItem === "team-members"}
							icon={Icons.ArrowDown}
							onClick={() => setSelectedItem("team-members")}
						>
							Team members
						</SidebarItem>
					</SidebarSection>
				</Sidebar>

				<main className={exampleContentClassName} aria-label="Example content area" />
			</Panel>

			<p className={noteClassName}>
				This intentionally leaves out shadcn's provider, mobile sheet, rail,
				collapse modes, and trigger. Those can be added later if Maui needs
				stateful sidebar behavior.
			</p>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const shellClass = style(
	radius.lg,
	{
		display: "grid",
		gridTemplateColumns: "240px minmax(0, 1fr)",
		gap: "24px",
		minHeight: "520px",
	}
)

const sidebarBrandClass = style(
	flex({ align: "center", gap: 4 }),
	spacing.padding({ x: 3, y: 2 }),
)

const brandMarkClass = style(
	text("sm", 600, "onAccent"),
	radius.md,
	{
		display: "grid",
		placeItems: "center",
		width: "28px",
		height: "28px",
		backgroundColor: colors.accent[9],
	}
)

const brandTextClass = style({
	minWidth: 0,
})

const brandTitleClass = style(text("sm", 600, "highContrast"), {
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const brandSubtitleClass = style(text("xs", 400, "lowContrast"))

const exampleContentClass = style({
	minWidth: 0,
	minHeight: "100%",
})

const noteClass = style(text("md", 400, "lowContrast"), {
	maxWidth: "72ch",
})
