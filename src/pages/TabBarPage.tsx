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
	},
	{
		id: "pr-339",
		label: "PR #339",
		icon: <Icons.GitPullRequest />,
		isClosable: true,
	},
	{
		id: "desktop",
		label: "Desktop",
		icon: <Icons.World />,
		isClosable: true,
	},
	{
		id: "pr-34",
		label: "PR #34",
		icon: <Icons.GitPullRequest />,
		isClosable: true,
	},
	{
		id: "github",
		label: "Use sandbox",
		icon: <Icons.Github />,
		isClosable: true,
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
			{ id, label: "New session", isClosable: true },
		])
		setSelectedId(id)
	}

	return (
		<Prose style={{ maxWidth: "1200px", paddingBottom: "32px" }}>
			<H2>Tab bar</H2>
			<P>
				A horizontally scrollable workspace tab bar. The selected tab uses the
				default outlined <Code>Button</Code> treatment; quiet tabs are separated
				by hairlines. Arrow keys, Home, and End move selection. Delete or
				Backspace closes a selected closable tab.
			</P>
			<Panel style={{ padding: 0, overflow: "hidden" }}>
				<TabBar
					aria-label="Workspace tabs"
					items={tabs}
					selectedId={selectedId}
					onSelectionChange={setSelectedId}
					onClose={closeTab}
					onAdd={addTab}
					addLabel="New session"
				/>
				<div style={{ minHeight: "120px" }} />
			</Panel>
		</Prose>
	)
}
