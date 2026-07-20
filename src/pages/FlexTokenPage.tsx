import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function FlexTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Flex</H2>
			<P>
				Flex tokens are layout primitives, not component wrappers. They should
				make the common row and column cases read clearly at the call site while
				still allowing local alignment choices.
			</P>

			<H3>Values</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Value</TableHeaderCell>
						<TableHeaderCell>Use</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>flex.row()</code>
						</TableCell>
						<TableCell>
							<code>display: flex; flex-direction: row</code>
						</TableCell>
						<TableCell>Horizontal groups and toolbars.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>flex.column()</code>
						</TableCell>
						<TableCell>
							<code>display: flex; flex-direction: column</code>
						</TableCell>
						<TableCell>Vertical forms and stacked content.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>flex.center</code>
						</TableCell>
						<TableCell>
							<code>align-items: center; justify-content: center</code>
						</TableCell>
						<TableCell>
							Centered icon buttons and empty states.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>flex.between</code>
						</TableCell>
						<TableCell>
							<code>justify-content: space-between</code>
						</TableCell>
						<TableCell>
							Rows with leading content and trailing actions.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<div style={sampleTitleStyle}>Row</div>
			<CodeBlock lang="typescript">{`const row = style(flex.row({ alignItems: "center", gap: 8 }))`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={8}>
						<Pill>One</Pill>
						<Pill>Two</Pill>
						<Pill>Three</Pill>
					</Flex>
				</div>
			</Panel>

			<div style={sampleTitleStyle}>Column</div>
			<CodeBlock lang="typescript">{`const column = style(flex.column({ gap: 8 }))`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex column gap={8}>
						<Pill>First</Pill>
						<Pill>Second</Pill>
						<Pill>Third</Pill>
					</Flex>
				</div>
			</Panel>

			<div style={sampleTitleStyle}>Centered</div>
			<CodeBlock lang="typescript">{`const centered = style(flex.row(), flex.center)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
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
			</Panel>

			<div style={sampleTitleStyle}>Between</div>
			<CodeBlock lang="typescript">{`const toolbar = style(flex.row({ alignItems: "center" }), flex.between)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={8}>
						<span>between</span>
						<div style={{ flex: "1 1 auto" }} />
						<span style={{ color: colors.accent[11] }}>Action</span>
					</Flex>
				</div>
			</Panel>
		</Prose>
	)
}

function Pill(props: { children: string }) {
	return (
		<span
			style={{
				background: colors.gray[4],
				border: `1px solid ${borderColor.outline}`,
				borderRadius: "999px",
				padding: "4px 8px",
			}}
		>
			{props.children}
		</span>
	)
}

const exampleCardStyle = {
	background: colors.gray[3],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "6px",
	padding: "12px",
} as const

const sampleTitleStyle = {
	color: colors.gray[12],
	fontWeight: 600,
	marginTop: "20px",
	marginBottom: "8px",
} as const


