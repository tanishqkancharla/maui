import { style, useStyles } from "purse-styles"
import { H2, H3, P } from "../../components/Typography"
import { focusRing } from "../../utils/focusRing"

const focusedControlClass = style(focusRing(), {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "4px",
	padding: "8px 12px",
})

export function FocusRingPage() {
	const focusedControlClassName = useStyles(focusedControlClass)

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Focus ring</H2>
			<P>
				Focus tokens standardize keyboard-visible states. Maui uses a single
				accent outline treatment for every component, including slider thumbs.
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
							<code>focusRing()</code>
						</td>
						<td style={tableCellStyle}>
							<code>
								outline: 1px solid var(--accent-8); outline-offset: 1px
							</code>
						</td>
						<td style={tableCellStyle}>
							The standard focus treatment for every focus-visible control.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const focusedControl = style(
	focusRing(),
	{
		background: "var(--sand-3)",
		border: "1px solid var(--sand-6)",
		borderRadius: "4px",
		padding: "8px 12px",
	},
)`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ display: "flex", gap: "12px", alignItems: "center" }}
			>
				<div className={focusedControlClassName}>
					Standard focus ring
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
