import { H2, H3, P } from "../../components/Typography"

export function BackgroundColorPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Background color</H2>
			<P>
				Background tokens describe surfaces and states. They should make it
				clear whether a component is sitting on the app canvas, raised as a
				control, active as a selected element, or using accent color for solid fills.
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
							<code>background.app</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-1)</code>
						</td>
						<td style={tableCellStyle}>App/page background.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.subtle</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-2)</code>
						</td>
						<td style={tableCellStyle}>Dialogs, cards, and panels.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.element</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-3)</code>
						</td>
						<td style={tableCellStyle}>Inputs and slightly raised controls.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.elementHover</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-4)</code>
						</td>
						<td style={tableCellStyle}>Neutral hover state.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.elementActive</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--sand-5)</code>
						</td>
						<td style={tableCellStyle}>Selected rows and menu items.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.accent</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--accent-9)</code>
						</td>
						<td style={tableCellStyle}>
							Primary fills and selected indicators.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>background.accentHover</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--accent-10)</code>
						</td>
						<td style={tableCellStyle}>Hovered solid accent background.</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const panel = style(background.subtle, borderColor.subtle, radius.panel)
const primary = style(background.accent, textColor.onAccent)`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					gap: "12px",
				}}
			>
				<div
					style={{
						background: "var(--sand-2)",
						border: "1px solid var(--sand-6)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					Surface
				</div>
				<div
					style={{
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					Raised
				</div>
				<div
					style={{
						background: "var(--accent-9)",
						borderRadius: "6px",
						color: "white",
						padding: "12px",
					}}
				>
					Accent
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
