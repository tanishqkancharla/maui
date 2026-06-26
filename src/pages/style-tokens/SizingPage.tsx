import { useStyles } from "purse-styles"
import { Icons } from "../../components/Icons"
import { H2, H3, H4, P } from "../../components/Typography"
import { sizingTokens } from "../../utils/sizing"

export function SizingPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Sizing</H2>
			<P>
				Sizing tokens are style objects for dimensions and constraints. Keep the
				set small: icon size, full-width layout, and readable content width.
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
							<code>sizingTokens.icon</code>
						</td>
						<td style={tableCellStyle}>
							<code>width: 16px; height: 16px</code>
						</td>
						<td style={tableCellStyle}>Default inline icon size.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizingTokens.fullWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>width: 100%</code>
						</td>
						<td style={tableCellStyle}>Fill the available container width.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>sizingTokens.contentWidth</code>
						</td>
						<td style={tableCellStyle}>
							<code>max-width: 72ch</code>
						</td>
						<td style={tableCellStyle}>Readable prose and content measure.</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<H4>Icon</H4>
			<pre style={codeBlockStyle}>
				<code>{`const icon = style(
	sizingTokens.icon,
	{ borderRadius: "999px" },
)`}</code>
			</pre>
			<div className="maui-example-panel">
				<IconExample />
			</div>

			<H4>Full width</H4>
			<pre style={codeBlockStyle}>
				<code>{`const field = style(
	sizingTokens.fullWidth,
	background.element,
)`}</code>
			</pre>
			<div className="maui-example-panel">
				<FullWidthExample />
			</div>

			<H4>Content width</H4>
			<pre style={codeBlockStyle}>
				<code>{`const content = style(
	sizingTokens.contentWidth,
	text.body,
)`}</code>
			</pre>
			<div className="maui-example-panel">
				<ContentWidthExample />
			</div>
		</section>
	)
}

function IconExample() {
	const className = useStyles(sizingTokens.icon, iconClass)

	return (
		<div style={exampleCardStyle}>
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<Icons.Search className={className} />
				<span style={{ color: "var(--sand-12)", lineHeight: 1.4 }}>
					Icon aligns with text
				</span>
			</div>
		</div>
	)
}

function FullWidthExample() {
	const className = useStyles(sizingTokens.fullWidth, fullWidthClass)

	return (
		<div style={exampleCardStyle}>
			<div className={className} />
		</div>
	)
}

function ContentWidthExample() {
	const className = useStyles(sizingTokens.contentWidth, contentWidthClass)

	return (
		<div style={exampleCardStyle}>
			<div className={className} />
		</div>
	)
}

const iconClass = {
	color: "var(--accent-11)",
} as const

const fullWidthClass = {
	height: "28px",
	background: "var(--accent-9)",
	borderRadius: "4px",
} as const

const contentWidthClass = {
	height: "28px",
	background: "var(--sand-4)",
	border: "1px solid var(--sand-6)",
	borderRadius: "4px",
} as const

const exampleCardStyle = {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	padding: "12px",
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
