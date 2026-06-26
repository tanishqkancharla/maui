import { style, useStyles } from "purse-styles"
import { H2, H3, P } from "../../components/Typography"
import { shadowTokens } from "../../utils/shadows"

export function ShadowPage() {
	const minimalClassName = useStyles(minimalExampleClass)
	const middleClassName = useStyles(middleExampleClass)
	const modalSmallClassName = useStyles(modalSmallExampleClass)

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Shadows</H2>
			<P>
				Shadow tokens are taken from Craft's shadow system: a foreground-colored
				1px ring plus black blur layers controlled by shared opacity variables.
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
							<code>shadow.thin</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-thin)</code>
						</td>
						<td style={tableCellStyle}>Border-ring only, no blur.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.minimalFlat</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-minimal-flat)</code>
						</td>
						<td style={tableCellStyle}>Minimal ring-only surface treatment.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.minimal</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-minimal)</code>
						</td>
						<td style={tableCellStyle}>
							Small controls and low-elevation surfaces.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.middle</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-middle)</code>
						</td>
						<td style={tableCellStyle}>Floating panels with moderate depth.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.strong</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-strong)</code>
						</td>
						<td style={tableCellStyle}>Higher-elevation floating panels.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.modalSmall</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-modal-small)</code>
						</td>
						<td style={tableCellStyle}>Popovers, toasts, and small modals.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.panelFocused</code>
						</td>
						<td style={tableCellStyle}>
							<code>var(--shadow-panel-focused)</code>
						</td>
						<td style={tableCellStyle}>Focused panel depth treatment.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.border</code>
						</td>
						<td style={tableCellStyle}>
							<code>rgba(255, 255, 255, 0.055) 0px 0px 0px 1px</code>
						</td>
						<td style={tableCellStyle}>Shadow-based surface borders.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>shadow.bottomBorder</code>
						</td>
						<td style={tableCellStyle}>
							<code>inset 0 -1.5px 0 rgba(255, 255, 255, 0.055)</code>
						</td>
						<td style={tableCellStyle}>Shadow-based row/header separators.</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const control = style(
	background.element,
	radius.control,
	shadowTokens.minimal,
)

const popover = style(
	background.subtle,
	radius.panel,
	shadowTokens.modalSmall,
)`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ display: "flex", gap: "16px", alignItems: "center" }}
			>
				<div className={minimalClassName}>
					Minimal
				</div>
				<div className={middleClassName}>
					Middle
				</div>
				<div className={modalSmallClassName}>
					Modal small
				</div>
			</div>
		</section>
	)
}

const minimalExampleClass = style(shadowTokens.minimal, {
	background: "var(--sand-3)",
	borderRadius: "4px",
	padding: "8px 12px",
})

const middleExampleClass = style(shadowTokens.middle, {
	background: "var(--sand-2)",
	borderRadius: "6px",
	padding: "16px",
})

const modalSmallExampleClass = style(shadowTokens.modalSmall, {
	background: "var(--sand-2)",
	borderRadius: "6px",
	padding: "16px",
})

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
