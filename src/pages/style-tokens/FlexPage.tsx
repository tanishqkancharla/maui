import { H2, H3, P } from "../../components/Typography"
import { Flex } from "../../components/Utils"

export function FlexPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Flex</H2>
			<P>
				Flex tokens are layout primitives, not component wrappers. They should
				make the common row and column cases read clearly at the call site while
				still allowing local alignment choices.
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
							<code>flex.row()</code>
						</td>
						<td style={tableCellStyle}>
							<code>display: flex; flex-direction: row</code>
						</td>
						<td style={tableCellStyle}>Horizontal groups and toolbars.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>flex.column()</code>
						</td>
						<td style={tableCellStyle}>
							<code>display: flex; flex-direction: column</code>
						</td>
						<td style={tableCellStyle}>Vertical forms and stacked content.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>flex.center</code>
						</td>
						<td style={tableCellStyle}>
							<code>align-items: center; justify-content: center</code>
						</td>
						<td style={tableCellStyle}>
							Centered icon buttons and empty states.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>flex.between</code>
						</td>
						<td style={tableCellStyle}>
							<code>justify-content: space-between</code>
						</td>
						<td style={tableCellStyle}>
							Rows with leading content and trailing actions.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<div style={sampleTitleStyle}>Row</div>
			<pre style={codeBlockStyle}>
				<code>{`const row = style(flex.row({ alignItems: "center", gap: 8 }))`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={8}>
						<Pill>One</Pill>
						<Pill>Two</Pill>
						<Pill>Three</Pill>
					</Flex>
				</div>
			</div>

			<div style={sampleTitleStyle}>Column</div>
			<pre style={codeBlockStyle}>
				<code>{`const column = style(flex.column({ gap: 8 }))`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<Flex column gap={8}>
						<Pill>First</Pill>
						<Pill>Second</Pill>
						<Pill>Third</Pill>
					</Flex>
				</div>
			</div>

			<div style={sampleTitleStyle}>Centered</div>
			<pre style={codeBlockStyle}>
				<code>{`const centered = style(flex.row(), flex.center)`}</code>
			</pre>
			<div className="maui-example-panel">
				<div
					style={{
						...exampleCardStyle,
						height: "112px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Pill>center</Pill>
				</div>
			</div>

			<div style={sampleTitleStyle}>Between</div>
			<pre style={codeBlockStyle}>
				<code>{`const toolbar = style(flex.row({ alignItems: "center" }), flex.between)`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={8}>
						<span>between</span>
						<div style={{ flex: "1 1 auto" }} />
						<span style={{ color: "var(--accent-11)" }}>Action</span>
					</Flex>
				</div>
			</div>
		</section>
	)
}

function Pill(props: { children: string }) {
	return (
		<span
			style={{
				background: "var(--sand-4)",
				border: "1px solid var(--sand-6)",
				borderRadius: "999px",
				padding: "4px 8px",
			}}
		>
			{props.children}
		</span>
	)
}

const exampleCardStyle = {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	padding: "12px",
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
