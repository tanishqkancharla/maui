import { style, useStyles } from "purse-styles"
import { H2, H3, H4, P } from "../../components/Typography"
import { flex, flexItem, grid, gridItem } from "../../utils/layout"

const flexExampleClass = style(flex({ align: "center", gap: 4 }))
const flexFillItemClass = style(flexItem({ size: "fill" }))
const gridExampleClass = style(grid({ columns: "sidebarContent", gap: 8 }))
const gridSidebarClass = style(gridItem({ area: "sidebar" }))
const gridContentClass = style(gridItem({ area: "content" }))
const gridFullClass = style(gridItem({ span: "full" }))

export function LayoutPage() {
	const flexExampleClassName = useStyles(flexExampleClass)
	const flexFillItemClassName = useStyles(flexFillItemClass)
	const gridExampleClassName = useStyles(gridExampleClass)
	const gridSidebarClassName = useStyles(gridSidebarClass)
	const gridContentClassName = useStyles(gridContentClass)
	const gridFullClassName = useStyles(gridFullClass)

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Layout</H2>
			<P>
				Layout tokens are semantic style-object builders for structure. Use flex
				and grid for containers, then flexItem and gridItem for child behavior.
			</P>

			<H3>Values</H3>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={tableHeaderStyle}>Name</th>
						<th style={tableHeaderStyle}>Arguments</th>
						<th style={tableHeaderStyle}>Use</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={tableCellStyle}>
							<code>flex(options)</code>
						</td>
						<td style={tableCellStyle}>
							<code>direction, align, justify, gap, wrap</code>
						</td>
						<td style={tableCellStyle}>Rows, columns, toolbars, and stacks.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>flexItem(options)</code>
						</td>
						<td style={tableCellStyle}>
							<code>size, align, order</code>
						</td>
						<td style={tableCellStyle}>
							Child sizing and alignment inside a flex container.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>grid(options)</code>
						</td>
						<td style={tableCellStyle}>
							<code>columns, align, justify, gap</code>
						</td>
						<td style={tableCellStyle}>
							Equal columns, responsive grids, and sidebar/content shells.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>gridItem(options)</code>
						</td>
						<td style={tableCellStyle}>
							<code>area, span, align, justify</code>
						</td>
						<td style={tableCellStyle}>
							Named areas, full-width spans, and child placement.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<H4>Flex container and item</H4>
			<pre style={codeBlockStyle}>
				<code>{`const toolbar = style(flex({ align: "center", gap: 4 }))
const flexibleItem = style(flexItem({ size: "fill" }))`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<div className={flexExampleClassName}>
						<Pill>Left</Pill>
						<div className={flexFillItemClassName}>
							<div style={fillTrackStyle} />
						</div>
						<Pill>Action</Pill>
					</div>
				</div>
			</div>

			<H4>Grid container and items</H4>
			<pre style={codeBlockStyle}>
				<code>{`const shell = style(grid({ columns: "sidebarContent", gap: 8 }))
const sidebar = style(gridItem({ area: "sidebar" }))
const content = style(gridItem({ area: "content" }))
const footer = style(gridItem({ span: "full" }))`}</code>
			</pre>
			<div className="maui-example-panel">
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
			</div>
		</section>
	)
}

function Pill(props: { children: string }) {
	return <span style={pillStyle}>{props.children}</span>
}

const pillStyle = {
	background: "var(--sand-4)",
	border: "1px solid var(--sand-6)",
	borderRadius: "999px",
	padding: "4px 8px",
} as const

const fillTrackStyle = {
	height: "1px",
	background: "var(--sand-8)",
} as const

const exampleCardStyle = {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	padding: "12px",
} as const

const tableHeaderStyle = {
	color: "var(--sand-10)",
	fontSize: "11px",
	fontWeight: 500,
	letterSpacing: "0.04em",
	padding: "0 12px 8px 0",
	textAlign: "left",
	textTransform: "uppercase",
} as const

const tableCellStyle = {
	borderTop: "1px solid var(--sand-5)",
	color: "var(--sand-11)",
	padding: "10px 12px 10px 0",
	verticalAlign: "top",
} as const

const codeBlockStyle = {
	background: "var(--sand-2)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	color: "var(--sand-12)",
	padding: "12px",
	overflowX: "auto",
} as const
