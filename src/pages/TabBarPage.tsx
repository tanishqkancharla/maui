import { useRef, useState } from "react"
import { TabBar, type TabBarItem } from "../components/TabBar"
import { Code } from "../components/Code"
import { Icons } from "../components/Icons"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { Panel } from "./Panel"

const initialTabs: TabBarItem[] = [
	{
		id: "changes",
		label: "Changes",
		icon: <Icons.FileText />,
		isClosable: true,
		isDraggable: true,
	},
	{
		id: "pr-339",
		label: "PR #339",
		icon: <Icons.GitPullRequest />,
		isClosable: true,
		isDraggable: true,
	},
	{
		id: "desktop",
		label: "Desktop",
		icon: <Icons.World />,
		isClosable: true,
		isDraggable: true,
	},
	{
		id: "pr-34",
		label: "PR #34",
		icon: <Icons.GitPullRequest />,
		isClosable: true,
		isDraggable: true,
	},
	{
		id: "github",
		label: "Use sandbox",
		icon: <Icons.Github />,
		isClosable: true,
		isDraggable: true,
	},
]

export function TabBarPage() {
	const [tabs, setTabs] = useState(initialTabs)
	const [selectedId, setSelectedId] = useState("pr-34")
	const nextTabId = useRef(1)

	function closeTab(id: string) {
		setTabs((current) => {
			const index = current.findIndex((tab) => tab.id === id)
			const next = current.filter((tab) => tab.id !== id)
			if (id === selectedId && next.length > 0) {
				setSelectedId(next[Math.min(index, next.length - 1)]!.id)
			}
			return next
		})
	}

	function addTab() {
		const id = `new-${nextTabId.current++}`
		setTabs((current) => [
			...current,
			{ id, label: "New session", isClosable: true, isDraggable: true },
		])
		setSelectedId(id)
	}

	function reorder(activeId: string, overId: string) {
		setTabs((current) => {
			const from = current.findIndex((tab) => tab.id === activeId)
			const to = current.findIndex((tab) => tab.id === overId)
			const moved = current[from]
			if (from < 0 || to < 0 || from === to || moved === undefined)
				return current
			const next = current.slice()
			next.splice(from, 1)
			next.splice(to, 0, moved)
			return next
		})
	}

	return (
		<Prose style={{ maxWidth: "1200px", paddingBottom: "32px" }}>
			<H2>Tab bar</H2>
			<P>
				A horizontally scrollable workspace tab bar. The selected tab uses the
				default outlined <Code>Button</Code> treatment; quiet tabs are separated
				by hairlines. Drag a tab to reorder it. Arrow keys, Home, and End move
				selection. Delete or Backspace closes a selected closable tab.
			</P>
			<Panel style={{ padding: 0, overflow: "hidden" }}>
				<TabBar
					aria-label="Workspace tabs"
					items={tabs}
					selectedId={selectedId}
					onSelectionChange={setSelectedId}
					onClose={closeTab}
					onReorder={reorder}
					onAdd={addTab}
					addLabel="New session"
				/>
				<div style={{ minHeight: "120px" }} />
			</Panel>
		</Prose>
	)
}
