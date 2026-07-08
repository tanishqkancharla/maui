import { useMemo } from "react"
import {
	Button,
	Collection,
	Tree as AriaTree,
	TreeItem as AriaTreeItem,
	TreeItemContent,
	type TreeProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { monospace, text } from "../tokens/text"

export type FileTreeNode = {
	id: string
	name: string
	children?: FileTreeNode[]
}

type FileTreeEntry = {
	id: string
	name: string
	ancestorLines: boolean[]
	isLast: boolean
	children: FileTreeEntry[]
}

type FileTreeProps = Omit<TreeProps<FileTreeEntry>, "children" | "items"> & {
	rootLabel?: string
	items: FileTreeNode[]
}

export function FileTree({
	rootLabel,
	items,
	className,
	defaultExpandedKeys,
	...props
}: FileTreeProps) {
	const annotatedItems = useMemo(() => annotateTree(items), [items])
	const expandedKeys = useMemo(
		() => defaultExpandedKeys ?? collectDirectoryKeys(items),
		[defaultExpandedKeys, items],
	)
	const treeClassName = useStyles(treeClass)
	const rootLabelClassName = useStyles(rootLabelClass)
	const ariaTreeListClassName = useStyles(ariaTreeListClass)

	return (
		<div className={treeClassName}>
			{rootLabel ? <div className={rootLabelClassName}>{rootLabel}</div> : null}
			<AriaTree
				{...props}
				className={className ?? ariaTreeListClassName}
				items={annotatedItems}
				defaultExpandedKeys={expandedKeys}
				selectionMode={props.selectionMode ?? "single"}
			>
				{(item) => <FileTreeRow item={item} />}
			</AriaTree>
		</div>
	)
}

function FileTreeRow({ item }: { item: FileTreeEntry }) {
	const itemClassName = useStyles(treeItemClass)
	const guidesClassName = useStyles(guidesClass)
	const ancestorCellClassName = useStyles(ancestorCellClass)
	const connectorCellClassName = useStyles(connectorCellClass)
	const nameClassName = useStyles(treeNameClass)
	const chevronButtonClassName = useStyles(chevronButtonClass)

	return (
		<AriaTreeItem id={item.id} textValue={item.name} className={itemClassName}>
			<TreeItemContent>
				{({ hasChildItems }) => (
					<span className={guidesClassName}>
						{item.ancestorLines.map((continues, index) => (
							<span
								// biome-ignore lint/suspicious/noArrayIndexKey: guide columns are positional
								key={index}
								className={ancestorCellClassName}
								data-line={continues ? "true" : "false"}
								aria-hidden="true"
							/>
						))}
						<span
							className={connectorCellClassName}
							data-last={item.isLast ? "true" : "false"}
							aria-hidden="true"
						/>
						{hasChildItems ? (
							<Button slot="chevron" className={chevronButtonClassName}>
								<span className={nameClassName}>{item.name}</span>
							</Button>
						) : (
							<span className={nameClassName}>{item.name}</span>
						)}
					</span>
				)}
			</TreeItemContent>
			<Collection items={item.children}>
				{(child) => <FileTreeRow item={child} />}
			</Collection>
		</AriaTreeItem>
	)
}

function annotateTree(
	nodes: FileTreeNode[],
	ancestorLines: boolean[] = [],
): FileTreeEntry[] {
	return nodes.map((node, index) => {
		const isLast = index === nodes.length - 1
		const children = node.children ?? []

		return {
			id: node.id,
			name: node.name,
			ancestorLines,
			isLast,
			children: annotateTree(children, [...ancestorLines, !isLast]),
		}
	})
}

function collectDirectoryKeys(nodes: FileTreeNode[]): string[] {
	const keys: string[] = []

	for (const node of nodes) {
		if (node.children?.length) {
			keys.push(node.id, ...collectDirectoryKeys(node.children))
		}
	}

	return keys
}

const guideWidth = "20px"
const lineColor = "var(--gray-7)"

const treeClass = style(monospace, text("xs", 400, "highContrast"), {
	display: "flex",
	flexDirection: "column",
	minWidth: 0,
})

const rootLabelClass = style({
	margin: 0,
	padding: 0,
})

const ariaTreeListClass = style({
	display: "flex",
	flexDirection: "column",
	margin: 0,
	padding: 0,
	border: "none",
	background: "transparent",
	outline: "none",
	minWidth: 0,
})

const treeItemClass = style(focusRing(), radius.sm, {
	display: "flex",
	alignItems: "stretch",
	height: "22px",
	outline: "none",
	cursor: "default",
	"&[data-selected='true']": {
		backgroundColor: "var(--gray-A4)",
		color: "var(--accent-11)",
	},
	"&[data-focus-visible='true']": {
		backgroundColor: "var(--gray-A3)",
	},
	"&[data-hovered='true']": {
		backgroundColor: "var(--gray-A3)",
	},
})

const guidesClass = style({
	display: "flex",
	alignItems: "stretch",
	minWidth: 0,
	flex: "1 1 auto",
})

const ancestorCellClass = style({
	position: "relative",
	flex: "0 0 auto",
	width: guideWidth,
	alignSelf: "stretch",
	"&[data-line='true']::before": {
		content: '""',
		position: "absolute",
		top: 0,
		bottom: 0,
		left: "50%",
		borderLeft: `1px solid ${lineColor}`,
	},
})

const connectorCellClass = style({
	position: "relative",
	flex: "0 0 auto",
	width: guideWidth,
	alignSelf: "stretch",
	// vertical segment coming down from the parent line
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		bottom: 0,
		left: "50%",
		borderLeft: `1px solid ${lineColor}`,
	},
	// last child: vertical line stops at the elbow (halfway down)
	"&[data-last='true']::before": {
		bottom: "auto",
		height: "50%",
	},
	// horizontal segment from the vertical line out to the label
	"&::after": {
		content: '""',
		position: "absolute",
		top: "50%",
		left: "50%",
		right: 0,
		borderTop: `1px solid ${lineColor}`,
	},
})

const treeNameClass = style({
	display: "inline-flex",
	alignItems: "center",
	minWidth: 0,
	paddingLeft: "4px",
	whiteSpace: "nowrap",
	overflow: "hidden",
	textOverflow: "ellipsis",
})

const chevronButtonClass = style({
	all: "unset",
	display: "inline-flex",
	alignItems: "center",
	minWidth: 0,
	cursor: "pointer",
	color: "inherit",
	"&:focus-visible": {
		outline: "none",
	},
})
