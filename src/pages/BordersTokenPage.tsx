import { style, useStyles, type CSSProperties } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { border, type BorderColor, type BorderSide } from "../tokens/borders"
import { radius } from "../tokens/radius"

import { colors } from "../tokens/colors"
const borderExamples = [
	{
		label: 'border([], "border")',
		sides: [] as BorderSide[],
		color: "border" as const,
		use: "Section breaks, table rows, and pane dividers.",
	},
	{
		label: 'border([], "outline")',
		sides: [] as BorderSide[],
		color: "outline" as const,
		use: "Panels, inputs, cards, and example surfaces.",
	},
	{
		label: 'border([], "accent")',
		sides: [] as BorderSide[],
		color: "accent" as const,
		use: "Active or focused control outlines.",
	},
	{
		label: 'border(["bottom"], "border")',
		sides: ["bottom"] as BorderSide[],
		color: "border" as const,
		use: "Pane headers and horizontal section breaks.",
	},
	{
		label: 'border(["left"], "accent") + borderLeftWidth',
		sides: ["left"] as BorderSide[],
		color: "accent" as const,
		edgeWidth: "2px",
		use: "Blockquotes and left-edge emphasis bars.",
	},
] as const

export function BordersTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Borders</H2>
			<P>
				The <code>border</code> token takes sides and a semantic color. Pass an
				empty sides array for a full border. Border colors are derived from{" "}
				<code>--foreground</code> at fixed opacities, matching the Craft Agents
				approach.
			</P>

			<H3>Values</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Input</TableHeaderCell>
						<TableHeaderCell>Values</TableHeaderCell>
						<TableHeaderCell>Use</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>sides</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`[]
| ("top"
  | "right"
  | "bottom"
  | "left")[]`}
							</code>
						</TableCell>
						<TableCell>
							Empty applies to all sides. Otherwise only the listed edges.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>color</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`"border"
| "outline"
| "accent"`}
							</code>
						</TableCell>
						<TableCell>
							<code>border</code> is <code>borderColor.border</code>{" "}
							(foreground at 5%), <code>outline</code> is{" "}
							<code>borderColor.outline</code> (foreground at 10%),{" "}
							<code>accent</code> is <code>colors.accent[8]</code>.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Call</TableHeaderCell>
						<TableHeaderCell>Use</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{borderExamples.map((example) => (
						<TableRow key={example.label}>
							<TableCell>
								<code>{example.label}</code>
							</TableCell>
							<TableCell>{example.use}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<CodeBlock lang="typescript">{`const panel = style(
	background.element,
	border([], "outline"),
	radius.md,
)

const blockquote = style(
	border(["left"], "accent"),
	{ borderLeftWidth: "2px" },
	spacing.padding({ left: 12 }),
)`}</CodeBlock>

			<Panel style={{ marginTop: "16px" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
						gap: "16px",
					}}
				>
					{borderExamples.map((example) => (
						<BorderExample
							key={example.label}
							label={example.label}
							sides={example.sides}
							color={example.color}
							edgeWidth={"edgeWidth" in example ? example.edgeWidth : undefined}
						/>
					))}
				</div>
			</Panel>

			<H3>Single edge</H3>
			<CodeBlock lang="typescript">{`const header = style(border(["bottom"], "border"))`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<SingleEdgeExample />
			</Panel>
		</Prose>
	)
}

function BorderExample(props: {
	label: string
	sides: BorderSide[]
	color: BorderColor
	edgeWidth?: string
}) {
	const className = useStyles(
		border(props.sides, props.color),
		props.edgeWidth
			? style(
					Object.fromEntries(
						props.sides.map((side) => [
							`border${capitalize(side)}Width`,
							props.edgeWidth,
						]),
					) as unknown as CSSProperties,
				)
			: undefined,
		radius.md,
		style({
			background: colors.gray[2],
			padding: "16px",
			textAlign: "center",
			fontSize: "12px",
			color: colors.gray[11],
		}),
	)

	return (
		<div>
			<div className={className}>{props.label}</div>
		</div>
	)
}

function capitalize(value: string) {
	return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`
}

function SingleEdgeExample() {
	const className = useStyles(
		border(["bottom"], "border"),
		style({
			background: colors.gray[2],
			color: colors.gray[12],
			padding: "16px",
		}),
	)

	return <div className={className}>Section header</div>
}

const unionCodeStyle = {
	whiteSpace: "pre",
} as const
