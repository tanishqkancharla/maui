import { H2, H3, P } from "../../components/Typography"

export function SizingPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Sizing</H2>
			<P>
				Sizing tokens describe how large objects are. Intrinsic sizing includes
				padding and fixed component dimensions; extrinsic sizing includes widths
				relative to a container.
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
							<code>sizing.controlPadding</code>
						</td>
						<td style={tableCellStyle}>
							<code>6px 12px</code>
						</td>
						<td style={tableCellStyle}>Intrinsic button/control size.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.inputPadding</code>
						</td>
						<td style={tableCellStyle}>
							<code>6px 8px</code>
						</td>
						<td style={tableCellStyle}>Intrinsic text input size.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.panelPadding</code>
						</td>
						<td style={tableCellStyle}>
							<code>24px</code>
						</td>
						<td style={tableCellStyle}>Intrinsic panel/content size.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.controlHeight</code>
						</td>
						<td style={tableCellStyle}>
							<code>28px</code>
						</td>
						<td style={tableCellStyle}>
							Buttons, text fields, and compact controls.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.clearButton</code>
						</td>
						<td style={tableCellStyle}>
							<code>20px</code>
						</td>
						<td style={tableCellStyle}>Search clear buttons.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.stepperWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>24px</code>
						</td>
						<td style={tableCellStyle}>Number field stepper column.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.swatch</code>
						</td>
						<td style={tableCellStyle}>
							<code>18px</code>
						</td>
						<td style={tableCellStyle}>Color token previews.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.icon</code>
						</td>
						<td style={tableCellStyle}>
							<code>16px</code>
						</td>
						<td style={tableCellStyle}>Default inline icon size.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.fullWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>100%</code>
						</td>
						<td style={tableCellStyle}>Extrinsic fluid width.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.halfWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>50%</code>
						</td>
						<td style={tableCellStyle}>Extrinsic half-container width.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.thirdWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>33.333%</code>
						</td>
						<td style={tableCellStyle}>Extrinsic third-container width.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.controlMaxWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>240px</code>
						</td>
						<td style={tableCellStyle}>Compact form examples.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.textMaxWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>500px</code>
						</td>
						<td style={tableCellStyle}>Paragraph measure.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizing.appMaxWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>1040px</code>
						</td>
						<td style={tableCellStyle}>Maui app shell.</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<div style={sampleTitleStyle}>Intrinsic padding</div>
			<pre style={codeBlockStyle}>
				<code>{`const input = style({ padding: sizing.inputPadding })
const button = style({ padding: sizing.controlPadding })
const panel = style({ padding: sizing.panelPadding })`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
						<div style={{ ...chipStyle, padding: "6px 8px" }} />
						<div style={{ ...chipStyle, padding: "6px 12px" }} />
						<div style={{ ...chipStyle, padding: "24px" }} />
					</div>
				</div>
			</div>

			<div style={sampleTitleStyle}>Intrinsic dimensions</div>
			<pre style={codeBlockStyle}>
				<code>{`const control = style({ height: sizing.controlHeight })
const clearButton = style({ width: sizing.clearButton, height: sizing.clearButton })
const icon = style({ width: sizing.icon, height: sizing.icon })`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
						<div
							style={{
								...chipStyle,
								height: "28px",
								display: "flex",
								alignItems: "center",
								padding: "0 8px",
							}}
						/>
						<div
							style={{
								width: "20px",
								height: "20px",
								borderRadius: "4px",
								background: "var(--sand-4)",
								border: "1px solid var(--sand-6)",
							}}
						/>
						<div
							style={{
								width: "18px",
								height: "18px",
								borderRadius: "3px",
								background: "var(--accent-9)",
							}}
						/>
						<div
							style={{
								width: "16px",
								height: "16px",
								borderRadius: "999px",
								background: "var(--sand-11)",
							}}
						/>
					</div>
				</div>
			</div>

			<div style={sampleTitleStyle}>Extrinsic widths</div>
			<pre style={codeBlockStyle}>
				<code>{`const full = style({ width: sizing.fullWidth })
const half = style({ width: sizing.halfWidth })
const third = style({ width: sizing.thirdWidth })`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<div style={{ display: "grid", gap: "8px" }}>
						<WidthBar label="100%" width="100%" />
						<WidthBar label="50%" width="50%" />
						<WidthBar label="33.333%" width="33.333%" />
					</div>
				</div>
			</div>

			<div style={sampleTitleStyle}>Measures</div>
			<pre style={codeBlockStyle}>
				<code>{`const controlMeasure = style({ maxWidth: sizing.controlMaxWidth })
const textMeasure = style({ maxWidth: sizing.textMaxWidth })`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<div style={{ display: "grid", gap: "8px" }}>
						<div style={{ ...measureStyle, maxWidth: "240px" }} />
						<div style={{ ...measureStyle, maxWidth: "500px" }} />
					</div>
				</div>
			</div>
		</section>
	)
}

function WidthBar(props: { label: string; width: string }) {
	return (
		<div
			style={{
				background: "var(--sand-2)",
				borderRadius: "4px",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					width: props.width,
					background: "var(--accent-9)",
					color: "white",
					padding: "4px 8px",
				}}
			>
				{props.label}
			</div>
		</div>
	)
}

const exampleCardStyle = {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	padding: "12px",
} as const

const chipStyle = {
	background: "var(--sand-4)",
	border: "1px solid var(--sand-6)",
	borderRadius: "4px",
} as const

const measureStyle = {
	background: "var(--sand-4)",
	border: "1px solid var(--sand-6)",
	borderRadius: "4px",
	padding: "6px 8px",
} as const

const sampleTitleStyle = {
	color: "var(--sand-12)",
	fontWeight: 600,
	marginTop: "20px",
	marginBottom: "8px",
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
