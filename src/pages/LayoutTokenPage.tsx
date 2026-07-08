import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { flex, flexItem, grid, gridItem } from "../tokens/layout"

const flexExampleClass = style(flex({ align: "center", gap: 4 }))
const flexFillItemClass = style(flexItem({ size: "fill" }))
const gridExampleClass = style(grid({ columns: "sidebarContent", gap: 8 }))
const gridSidebarClass = style(gridItem({ area: "sidebar" }))
const gridContentClass = style(gridItem({ area: "content" }))
const gridFullClass = style(gridItem({ span: "full" }))

export function LayoutTokenPage() {
	const flexExampleClassName = useStyles(flexExampleClass)
	const flexFillItemClassName = useStyles(flexFillItemClass)
	const gridExampleClassName = useStyles(gridExampleClass)
	const gridSidebarClassName = useStyles(gridSidebarClass)
	const gridContentClassName = useStyles(gridContentClass)
	const gridFullClassName = useStyles(gridFullClass)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Layout</H2>
			<P>
				Layout tokens are semantic style-object builders for structure. Use flex
				and grid for containers, then flexItem and gridItem for child behavior.
			</P>

			<H3>Values</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Arguments</TableHeaderCell>
						<TableHeaderCell>Use</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>flex(options)</code>
						</TableCell>
						<TableCell>
							<code>direction, align, justify, gap, wrap</code>
						</TableCell>
						<TableCell>Rows, columns, toolbars, and stacks.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>flexItem(options)</code>
						</TableCell>
						<TableCell>
							<code>size, align, order</code>
						</TableCell>
						<TableCell>
							Child sizing and alignment inside a flex container.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>grid(options)</code>
						</TableCell>
						<TableCell>
							<code>columns, align, justify, gap</code>
						</TableCell>
						<TableCell>
							Equal columns, responsive grids, and sidebar/content shells.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>gridItem(options)</code>
						</TableCell>
						<TableCell>
							<code>area, span, align, justify</code>
						</TableCell>
						<TableCell>
							Named areas, full-width spans, and child placement.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Flex container and item</H4>
			<CodeBlock lang="typescript">{`const toolbar = style(flex({ align: "center", gap: 4 }))
const flexibleItem = style(flexItem({ size: "fill" }))`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<div className={flexExampleClassName}>
						<Pill>Left</Pill>
						<div className={flexFillItemClassName}>
							<div style={fillTrackStyle} />
						</div>
						<Pill>Action</Pill>
					</div>
				</div>
			</Panel>

			<H4>Grid container and items</H4>
			<CodeBlock lang="typescript">{`const shell = style(grid({ columns: "sidebarContent", gap: 8 }))
const sidebar = style(gridItem({ area: "sidebar" }))
const content = style(gridItem({ area: "content" }))
const footer = style(gridItem({ span: "full" }))`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div className={gridExampleClassName}>
					<div className={gridSidebarClassName} style={exampleCardStyle}>
						Sidebar
					</div>
					<div className={gridContentClassName} style={exampleCardStyle}>
						Content
					</div>
					<div className={gridFullClassName} style={exampleCardStyle}>
						Full-width item
					</div>
				</div>
			</Panel>
		</Prose>
	)
}

function Pill(props: { children: string }) {
	return <span style={pillStyle}>{props.children}</span>
}

const pillStyle = {
	background: "var(--gray-4)",
	border: "1px solid var(--outline)",
	borderRadius: "999px",
	padding: "4px 8px",
} as const

const fillTrackStyle = {
	height: "1px",
	background: "var(--gray-8)",
} as const

const exampleCardStyle = {
	background: "var(--gray-3)",
	border: "1px solid var(--outline)",
	borderRadius: "6px",
	padding: "12px",
} as const


