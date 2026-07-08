import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { FileTree, type FileTreeNode } from "../patterns/FileTree"
import { text } from "../tokens/text"

const sampleTree: FileTreeNode[] = [
	{ id: "readme", name: "README.md" },
	{ id: "package", name: "package.json" },
	{
		id: "src",
		name: "src",
		children: [
			{
				id: "components",
				name: "components",
				children: [
					{ id: "button", name: "Button.tsx" },
					{ id: "menu", name: "Menu.tsx" },
					{ id: "prose", name: "Prose.tsx" },
				],
			},
			{
				id: "patterns",
				name: "patterns",
				children: [
					{ id: "sidebar", name: "Sidebar.tsx" },
					{ id: "file-tree", name: "FileTree.tsx" },
					{ id: "inbox", name: "Inbox.tsx" },
				],
			},
			{ id: "index", name: "index.tsx" },
			{ id: "style", name: "style.css" },
		],
	},
	{ id: "vite", name: "vite.config.ts" },
]

export function FileTreePage() {
	const [selectedKey, setSelectedKey] = useState<string | null>("file-tree")
	const pageClassName = useStyles(pageClass)
	const panelClassName = useStyles(panelClass)
	const selectionClassName = useStyles(selectionClass)

	return (
		<Prose className={pageClassName}>
			<H2>File tree</H2>
			<P>
				A file tree with CSS guide lines (instead of box-drawing characters),
				built on React Aria&apos;s Tree for keyboard navigation, expansion,
				and selection.
			</P>

			<H3>Example</H3>
			<Panel className={panelClassName}>
				<FileTree
					aria-label="Project files"
					rootLabel="maui"
					items={sampleTree}
					selectedKeys={selectedKey ? [selectedKey] : []}
					onSelectionChange={(keys) => {
						const nextKey = [...keys][0]
						setSelectedKey(nextKey == null ? null : String(nextKey))
					}}
				/>
			</Panel>

			<p className={selectionClassName}>
				Selected: {selectedKey ?? "none"}
			</p>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const panelClass = style({
	padding: "16px",
	overflowX: "auto",
})

const selectionClass = style(text("md", 400, "lowContrast"), {
	maxWidth: "72ch",
})
