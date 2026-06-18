import { H2, H3, P } from "../../components/Typography"

export function CornerRadiusPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Corner radius</H2>
			<P>
				Radius tokens capture component shape. The goal is to avoid scattered
				literal radii while keeping names tied to real UI roles.
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
							<code>radius.none</code>
						</td>
						<td style={tableCellStyle}>
							<code>0</code>
						</td>
						<td style={tableCellStyle}>
							Joined controls and edge-to-edge elements.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.indicator</code>
						</td>
						<td style={tableCellStyle}>
							<code>2px</code>
						</td>
						<td style={tableCellStyle}>
							Checkboxes and small selected indicators.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.swatch</code>
						</td>
						<td style={tableCellStyle}>
							<code>3px</code>
						</td>
						<td style={tableCellStyle}>Color swatches and tiny previews.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.control</code>
						</td>
						<td style={tableCellStyle}>
							<code>4px</code>
						</td>
						<td style={tableCellStyle}>Buttons, inputs, and most controls.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.panel</code>
						</td>
						<td style={tableCellStyle}>
							<code>6px</code>
						</td>
						<td style={tableCellStyle}>
							Cards, popovers, dialogs, and examples.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.switch</code>
						</td>
						<td style={tableCellStyle}>
							<code>8px</code>
						</td>
						<td style={tableCellStyle}>Switch tracks.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.pill</code>
						</td>
						<td style={tableCellStyle}>
							<code>999px</code>
						</td>
						<td style={tableCellStyle}>Sliders, badges, and pill controls.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>radius.circle</code>
						</td>
						<td style={tableCellStyle}>
							<code>100%</code>
						</td>
						<td style={tableCellStyle}>
							Radio dots, knobs, and circular icons.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const input = style(radius.control, sizing.controlHeight)
const dialog = style(radius.panel, spacing.padding(24))`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{
					display: "flex",
					alignItems: "center",
					gap: "12px",
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "2px",
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "4px",
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "6px",
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "999px",
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
					}}
				/>
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
