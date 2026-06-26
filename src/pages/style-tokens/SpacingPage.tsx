import { useStyles } from "purse-styles"
import { H2, H3, H4, P } from "../../components/Typography"
import { spacing } from "../../utils/spacing"

export function SpacingPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Spacing</H2>
			<P>
				Spacing tokens are style objects for whitespace. Keep this layer small:
				use gap for space between children and padding for space inside a box.
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
					{spacingScale.map((token) => (
						<tr key={token.name}>
							<td style={tableCellStyle}>
								<code>{token.name}</code>
							</td>
							<td style={tableCellStyle}>
								<code>{token.value}</code>
							</td>
							<td style={tableCellStyle}>{token.use}</td>
						</tr>
					))}
				</tbody>
			</table>

			<H3>Examples</H3>
			<H4>Gap</H4>
			<pre style={codeBlockStyle}>
				<code>{`const row = style(
	{ display: "flex" },
	spacing.gap[4],
)`}</code>
			</pre>
			<div className="maui-example-panel">
				<GapExample />
			</div>

			<H4>Padding</H4>
			<pre style={codeBlockStyle}>
				<code>{`const panel = style(
	background.element,
	spacing.padding({ all: 12 }),
)`}</code>
			</pre>
			<div className="maui-example-panel">
				<PaddingExample />
			</div>
		</section>
	)
}

function GapExample() {
	const className = useStyles(rowClass, spacing.gap[4])

	return (
		<div style={exampleCardStyle}>
			<div className={className}>
				<div style={demoBlockStyle} />
				<div style={demoBlockStyle} />
				<div style={demoBlockStyle} />
			</div>
		</div>
	)
}

function PaddingExample() {
	const smallClassName = useStyles(chipClass, spacing.padding({ all: 3 }))
	const mediumClassName = useStyles(chipClass, spacing.padding({ x: 6, y: 3 }))
	const largeClassName = useStyles(chipClass, spacing.padding({ x: 12, y: 6 }))

	return (
		<div style={exampleCardStyle}>
			<div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
				<div className={smallClassName} />
				<div className={mediumClassName} />
				<div className={largeClassName} />
			</div>
		</div>
	)
}

const spacingScale = [
	{
		name: "spacing.gap[1] / padding({ all: 1 })",
		value: "2px",
		use: "Tiny separation or padding.",
	},
	{
		name: "spacing.gap[2] / padding({ all: 2 })",
		value: "4px",
		use: "Tight separation or padding.",
	},
	{
		name: "spacing.gap[3] / padding({ all: 3 })",
		value: "6px",
		use: "Compact control whitespace.",
	},
	{
		name: "spacing.gap[4] / padding({ all: 4 })",
		value: "8px",
		use: "Default small whitespace.",
	},
	{
		name: "spacing.gap[6] / padding({ all: 6 })",
		value: "12px",
		use: "Default comfortable whitespace.",
	},
	{
		name: "spacing.gap[8] / padding({ all: 8 })",
		value: "16px",
		use: "Related group whitespace.",
	},
	{
		name: "spacing.gap[12] / padding({ all: 12 })",
		value: "24px",
		use: "Panel or section whitespace.",
	},
	{
		name: "spacing.gap[16] / padding({ all: 16 })",
		value: "32px",
		use: "Major region whitespace.",
	},
	{
		name: "spacing.padding({ x, y })",
		value: "padding-inline / padding-block",
		use: "Asymmetric control padding, like buttons and inputs.",
	},
]

const rowClass = {
	display: "flex",
	alignItems: "center",
} as const

const chipClass = {
	width: "32px",
	height: "20px",
	background: "var(--accent-9)",
	borderRadius: "4px",
} as const

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
