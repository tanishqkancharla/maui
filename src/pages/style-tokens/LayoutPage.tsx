import { H2, H3, P } from "../../components/Typography"

export function LayoutPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Layout</H2>
			<P>
				Layout tokens are intentionally later, but the Maui page already exposes
				a few real layout decisions: the app shell, scroll panes, page gutters,
				and content measures.
			</P>

			<H3>Values</H3>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={tableHeaderStyle}>Name</th>
						<th style={tableHeaderStyle}>Value</th>
						<th style={tableHeaderStyle}>Use</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={tableCellStyle}>
							<code>layout.appShell</code>
						</td>
						<td style={tableCellStyle}>
							<code>
								grid-template-columns: 180px minmax(0, 1fr); gap: 32px
							</code>
						</td>
						<td style={tableCellStyle}>Maui documentation shell.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>layout.scrollPane</code>
						</td>
						<td style={tableCellStyle}>
							<code>height: 100%; min-height: 0; overflow-y: auto</code>
						</td>
						<td style={tableCellStyle}>
							Independent nav/content scroll areas.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>layout.pageGutter</code>
						</td>
						<td style={tableCellStyle}>
							<code>32px</code>
						</td>
						<td style={tableCellStyle}>Top-level app padding.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>layout.textMeasure</code>
						</td>
						<td style={tableCellStyle}>
							<code>max-width: 500px</code>
						</td>
						<td style={tableCellStyle}>Readable prose width.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>layout.formMeasure</code>
						</td>
						<td style={tableCellStyle}>
							<code>max-width: 240px</code>
						</td>
						<td style={tableCellStyle}>Compact form examples.</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const shell = style(layout.appShell)
const content = style(layout.scrollPane, layout.textMeasure)`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{
					display: "grid",
					gridTemplateColumns: "120px minmax(0, 1fr)",
					gap: "16px",
				}}
			>
				<div
					style={{
						background: "var(--sand-3)",
						borderRadius: "4px",
						padding: "8px",
					}}
				>
					Nav pane
				</div>
				<div
					style={{
						background: "var(--sand-2)",
						borderRadius: "4px",
						padding: "8px",
					}}
				>
					Content pane
				</div>
			</div>
		</section>
	)
}

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
