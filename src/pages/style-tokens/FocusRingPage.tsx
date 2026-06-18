import { H2, H3, P } from "../../components/Typography"

export function FocusRingPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Focus ring</H2>
			<P>
				Focus tokens standardize keyboard-visible states. Each component can
				choose outline, inset shadow, or border treatment depending on its shape.
				Per the Radix scale, accent focus rings use step 8.
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
							<code>focusRing.outlineAccent</code>
						</td>
						<td style={tableCellStyle}>
							<code>outline: 1px solid var(--accent-8)</code>
						</td>
						<td style={tableCellStyle}>
							Small internal buttons and composite widget parts.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>focusRing.insetAccent</code>
						</td>
						<td style={tableCellStyle}>
							<code>
								box-shadow: 0 0 0 1px inset var(--accent-8); outline: none
							</code>
						</td>
						<td style={tableCellStyle}>Buttons and filled controls.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>focusRing.borderAccent</code>
						</td>
						<td style={tableCellStyle}>
							<code>border: 1px solid var(--accent-8); outline: none</code>
						</td>
						<td style={tableCellStyle}>Inputs with visible borders.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>focusRing.sliderThumb</code>
						</td>
						<td style={tableCellStyle}>
							<code>outline: 1.5px solid var(--accent-8)</code>
						</td>
						<td style={tableCellStyle}>Slider thumb focus.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>focusRing.none</code>
						</td>
						<td style={tableCellStyle}>
							<code>outline: none</code>
						</td>
						<td style={tableCellStyle}>
							Only when another visible focus indicator is supplied.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const button = style(focusRing.insetAccent, motion.shadow)
const clearButton = style(focusRing.outlineAccent, radius.control)`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ display: "flex", gap: "12px", alignItems: "center" }}
			>
				<div
					style={{
						background: "var(--sand-3)",
						borderRadius: "4px",
						boxShadow: "0 0 0 1px inset var(--accent-8)",
						padding: "8px 12px",
					}}
				>
					Inset focus
				</div>
				<div
					style={{
						background: "var(--sand-3)",
						borderRadius: "4px",
						outline: "1px solid var(--accent-8)",
						padding: "8px 12px",
					}}
				>
					Outline focus
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
