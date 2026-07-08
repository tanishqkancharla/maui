import { useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { spacing } from "../tokens/spacing"

export function SpacingTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Spacing</H2>
			<P>
				Spacing tokens are style objects for whitespace. Keep this layer small:
				use gap for space between children and padding for space inside a box.
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
					{spacingScale.map((token) => (
							<TableRow key={token.name}>
							<TableCell>
								<code>{token.name}</code>
							</TableCell>
							<TableCell>
								<code>{token.value}</code>
							</TableCell>
							<TableCell>{token.use}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Gap</H4>
			<CodeBlock lang="typescript">{`const row = style(
	{ display: "flex" },
	spacing.gap[4],
)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<GapExample />
			</Panel>

			<H4>Padding</H4>
			<CodeBlock lang="typescript">{`const panel = style(
	background.element,
	spacing.padding({ all: 12 }),
)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<PaddingExample />
			</Panel>
		</Prose>
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
	const mediumClassName = useStyles(chipClass, spacing.padding({ x: 6, y: 4 }))
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
		value: "9px",
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
	background: "var(--gray-3)",
	border: "1px solid var(--outline)",
	borderRadius: "6px",
	padding: "12px",
} as const

const demoBlockStyle = {
	width: "32px",
	height: "20px",
	background: "var(--accent-9)",
	borderRadius: "4px",
} as const

