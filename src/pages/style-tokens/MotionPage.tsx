import { H2, H3, P } from "../../components/Typography"

export function MotionPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Motion</H2>
			<P>
				Motion tokens keep interactive feedback consistent. Right now the system
				is mostly fast hover/focus transitions; reduced-motion behavior can come
				later.
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
							<code>motion.duration.fast</code>
						</td>
						<td style={tableCellStyle}>
							<code>80ms</code>
						</td>
						<td style={tableCellStyle}>Hover, focus, and press feedback.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.easing.standard</code>
						</td>
						<td style={tableCellStyle}>
							<code>ease-in-out</code>
						</td>
						<td style={tableCellStyle}>Default UI state transitions.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.background</code>
						</td>
						<td style={tableCellStyle}>
							<code>background 80ms ease-in-out</code>
						</td>
						<td style={tableCellStyle}>Control fill transitions.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.borderColor</code>
						</td>
						<td style={tableCellStyle}>
							<code>border-color 80ms ease-in-out</code>
						</td>
						<td style={tableCellStyle}>Inputs and outline changes.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.shadow</code>
						</td>
						<td style={tableCellStyle}>
							<code>box-shadow 80ms ease-in-out</code>
						</td>
						<td style={tableCellStyle}>Inset focus and hover rings.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.interactive</code>
						</td>
						<td style={tableCellStyle}>
							<code>
								box-shadow 80ms ease-in-out, background 80ms ease-in-out
							</code>
						</td>
						<td style={tableCellStyle}>Buttons and active controls.</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const button = style(motion.interactive, background.element)
const input = style(motion.borderColor, focusRing.borderAccent)`}</code>
			</pre>

			<div className="maui-example-panel">
				<div
					style={{
						background: "var(--sand-3)",
						border: "1px solid var(--sand-6)",
						borderRadius: "4px",
						padding: "8px 12px",
						transition:
							"box-shadow 80ms ease-in-out, background 80ms ease-in-out",
						width: "fit-content",
					}}
				>
					Fast interactive transition
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
