import { H2, H3, P } from "../../components/Typography"

export function TextColorPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Text color</H2>
			<P>
				Text color tokens should be semantic. Components should ask for
				low-contrast, high-contrast, or accent text rather than reaching into the
				scale directly.
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
							<code>textColor.highContrast</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-12)</code>
						</td>
						<td style={tableCellStyle}>Primary readable text.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>textColor.lowContrast</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-11)</code>
						</td>
						<td style={tableCellStyle}>
							Paragraphs, labels, and secondary copy.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>textColor.accent</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--accent-11)</code>
						</td>
						<td style={tableCellStyle}>
							Selected text, links, and active affordances.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>textColor.onAccent</code>
						</td>
						<td style={tableCellStyle}>
							<code>white</code>
						</td>
						<td style={tableCellStyle}>
							Text on solid accent or dark filled controls.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const label = style(text.label, textColor.lowContrast)
const selectedItem = style(text.body, textColor.accent)`}</code>
			</pre>

			<div className="maui-example-panel">
				<div
					style={{
						display: "grid",
						gap: "8px",
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					<span style={{ color: "var(--sand-12)" }}>High-contrast text</span>
					<span style={{ color: "var(--sand-11)" }}>Low-contrast text</span>
					<span style={{ color: "var(--accent-11)" }}>Accent text</span>
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
