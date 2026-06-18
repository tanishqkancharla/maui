import { H2, H3, P } from "../../components/Typography"

export function SpacingPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Spacing</H2>
			<P>
				Spacing tokens are for space between objects: gaps, margins, and
				distance between layout regions. Padding is sizing, because it changes
				an object's intrinsic size.
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
							<code>spacing.1</code>
						</td>
						<td style={tableCellStyle}>
							<code>2px</code>
						</td>
						<td style={tableCellStyle}>
							Hairline separation between very small objects.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.2</code>
						</td>
						<td style={tableCellStyle}>
							<code>4px</code>
						</td>
						<td style={tableCellStyle}>Tight inline object gaps.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.3</code>
						</td>
						<td style={tableCellStyle}>
							<code>6px</code>
						</td>
						<td style={tableCellStyle}>Compact inline object gaps.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.4</code>
						</td>
						<td style={tableCellStyle}>
							<code>8px</code>
						</td>
						<td style={tableCellStyle}>Default object gap.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.6</code>
						</td>
						<td style={tableCellStyle}>
							<code>12px</code>
						</td>
						<td style={tableCellStyle}>Comfortable stack gap.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.8</code>
						</td>
						<td style={tableCellStyle}>
							<code>16px</code>
						</td>
						<td style={tableCellStyle}>Distance between related groups.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.12</code>
						</td>
						<td style={tableCellStyle}>
							<code>24px</code>
						</td>
						<td style={tableCellStyle}>Distance between sections.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>spacing.16</code>
						</td>
						<td style={tableCellStyle}>
							<code>32px</code>
						</td>
						<td style={tableCellStyle}>Major page-region separation.</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<pre style={codeBlockStyle}>
				<code>{`const inline = style(flex.row({ gap: spacing[4] }))
const stack = style(flex.column({ gap: spacing[6] }))
const section = style({ marginTop: spacing[12] })`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ display: "grid", gap: "16px" }}
			>
				<SpacingDemo label="spacing.1" gap={2} />
				<SpacingDemo label="spacing.2" gap={4} />
				<SpacingDemo label="spacing.3" gap={6} />
				<SpacingDemo label="spacing.4" gap={8} />
				<SpacingDemo label="spacing.6" gap={12} />
				<SpacingDemo label="spacing.8" gap={16} />
				<SpacingDemo label="spacing.12" gap={24} />
				<SpacingDemo label="spacing.16" gap={32} />
			</div>
		</section>
	)
}

function SpacingDemo(props: { label: string; gap: number }) {
	return (
		<div style={exampleCardStyle}>
			<code
				style={{
					color: "var(--sand-11)",
					display: "block",
					marginBottom: "8px",
				}}
			>
				{props.label} / {props.gap}px
			</code>
			<div style={{ display: "flex", gap: props.gap, alignItems: "center" }}>
				<div style={demoBlockStyle} />
				<div style={demoBlockStyle} />
				<div style={demoBlockStyle} />
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

const demoBlockStyle = {
	width: "32px",
	height: "20px",
	background: "var(--accent-9)",
	borderRadius: "4px",
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
