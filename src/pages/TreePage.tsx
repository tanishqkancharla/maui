import { useState } from "react"
import { Leva, useControls } from "leva"
import { style, useStyles } from "purse-styles"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import {
	Tree,
	type TreeGuideGeometry,
	type TreeNode,
	defaultTreeGuideGeometry,
} from "../patterns/Tree"
import { text } from "../tokens/text"

const docsTree: TreeNode[] = [
	{ id: "overview", label: "Overview" },
	{
		id: "guide",
		label: "Guide",
		children: [
			{
				id: "getting-started",
				label: "Getting started",
				children: [
					{ id: "installation", label: "Installation" },
					{ id: "configuration", label: "Configuration" },
				],
			},
			{ id: "theming", label: "Theming" },
			{ id: "accessibility", label: "Accessibility" },
		],
	},
	{
		id: "reference",
		label: "Reference",
		children: [
			{
				id: "components",
				label: "Components",
				children: [
					{ id: "button", label: "Button" },
					{ id: "menu", label: "Menu" },
					{ id: "tree", label: "Tree" },
				],
			},
			{ id: "tokens", label: "Tokens" },
		],
	},
	{ id: "changelog", label: "Changelog" },
]

export function TreePage() {
	const [selectedKey, setSelectedKey] = useState<string | null>("tree")
	const pageClassName = useStyles(pageClass)
	const panelClassName = useStyles(panelClass)
	const selectionClassName = useStyles(selectionClass)

	const geometry = useControls("Tree guides", {
		guideCell: {
			value: defaultTreeGuideGeometry.guideCell,
			min: 12,
			max: 40,
			step: 1,
		},
		rowHeight: {
			value: defaultTreeGuideGeometry.rowHeight,
			min: 16,
			max: 40,
			step: 1,
		},
		trunkX: {
			value: defaultTreeGuideGeometry.trunkX,
			min: 0,
			max: 40,
			step: 0.5,
		},
		midY: {
			value: defaultTreeGuideGeometry.midY,
			min: 0,
			max: 40,
			step: 0.5,
		},
		diagonalAngleDeg: {
			value: defaultTreeGuideGeometry.diagonalAngleDeg,
			min: 5,
			max: 75,
			step: 1,
		},
		diagonalDrop: {
			value: defaultTreeGuideGeometry.diagonalDrop,
			min: 0.5,
			max: 12,
			step: 0.5,
		},
		labelPaddingLeft: {
			value: defaultTreeGuideGeometry.labelPaddingLeft,
			min: 0,
			max: 16,
			step: 1,
		},
	}) satisfies TreeGuideGeometry

	return (
		<Prose className={pageClassName}>
			<Leva collapsed={false} titleBar={{ title: "Tree guide geometry" }} />

			<H2>Tree</H2>
			<P>
				A generic hierarchy tree for any nested content: a docs outline,
				navigation, categories, or a file system. Built on React Aria&apos;s
				Tree for keyboard navigation, expansion, and selection.
			</P>

			<H3>Branches vs leaves</H3>
			<P>
				There is no chevron. Branches are distinguished only by nesting and
				interaction: expanded branches visibly contain indented children, and
				clicking a branch label toggles it (branch rows show a pointer cursor,
				leaves do not). Everything is expanded by default so the full shape is
				visible up front. The trade-off is that a manually collapsed branch has
				no static marker.
			</P>

			<H3>Example</H3>
			<Panel className={panelClassName}>
				<Tree
					aria-label="Documentation"
					label="Documentation"
					items={docsTree}
					geometry={geometry}
					selectedKeys={selectedKey ? [selectedKey] : []}
					onSelectionChange={(keys) => {
						const nextKey = [...keys][0]
						setSelectedKey(nextKey == null ? null : String(nextKey))
					}}
				/>
			</Panel>

			<p className={selectionClassName}>Selected: {selectedKey ?? "none"}</p>
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
