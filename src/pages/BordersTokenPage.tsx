import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { H2, H3, P } from "../components/Typography"
import { border, type BorderColor, type BorderSide, type BorderWidth } from "../tokens/borders"
import { radius } from "../tokens/radius"

const borderExamples = [
	{
		label: 'border([], "subtle")',
		sides: [] as BorderSide[],
		color: "subtle" as const,
		width: 1 as const,
		use: "Panels, inputs, cards, and example surfaces.",
	},
	{
		label: 'border([], "divider")',
		sides: [] as BorderSide[],
		color: "divider" as const,
		width: 1 as const,
		use: "Lighter full borders and neutral outlines.",
	},
	{
		label: 'border([], "divider", 2)',
		sides: [] as BorderSide[],
		color: "divider" as const,
		width: 2 as const,
		use: "Dialogs and surfaces that need a stronger edge.",
	},
	{
		label: 'border([], "accent")',
		sides: [] as BorderSide[],
		color: "accent" as const,
		width: 1 as const,
		use: "Active or focused control outlines.",
	},
	{
		label: 'border(["bottom"], "divider")',
		sides: ["bottom"] as BorderSide[],
		color: "divider" as const,
		width: 1 as const,
		use: "Pane headers and horizontal section breaks.",
	},
	{
		label: 'border(["left"], "accent", 2)',
		sides: ["left"] as BorderSide[],
		color: "accent" as const,
		width: 2 as const,
		use: "Blockquotes and left-edge emphasis bars.",
	},
] as const

export function BordersTokenPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Borders</H2>
			<P>
				The <code>border</code> token takes sides, a semantic color, and an
				optional width. Pass an empty sides array for a full border.
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
							<code>[] | ("top" | "right" | "bottom" | "left")[]</code>
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
							<code>"subtle" | "divider" | "accent"</code>
						</TableCell>
						<TableCell>
							<code>subtle</code> is <code>var(--sand-6)</code>,{" "}
							<code>divider</code> is <code>var(--sand-5)</code>,{" "}
							<code>accent</code> is <code>var(--accent-8)</code>.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>width</code>
						</TableCell>
						<TableCell>
							<code>1 | 2</code>
						</TableCell>
						<TableCell>Border width in pixels. Defaults to 1.</TableCell>
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
	background.subtle,
	border([], "subtle"),
	radius.panel,
)

const blockquote = style(
	border(["left"], "accent", 2),
	spacing.padding({ left: 12 }),
)`}</CodeBlock>

			<div className="maui-example-panel" style={{ marginTop: "16px" }}>
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
							width={example.width}
						/>
					))}
				</div>
			</div>

			<H3>Single edge</H3>
			<CodeBlock lang="typescript">{`const header = style(border(["bottom"], "divider"))`}</CodeBlock>
			<div className="maui-example-panel" style={{ marginTop: "16px" }}>
				<SingleEdgeExample />
			</div>
		</section>
	)
}

function BorderExample(props: {
	label: string
	sides: BorderSide[]
	color: BorderColor
	width: BorderWidth
}) {
	const className = useStyles(
		border(props.sides, props.color, props.width),
		radius.panel,
		style({
			background: "var(--sand-2)",
			padding: "16px",
			textAlign: "center",
			fontSize: "12px",
			color: "var(--sand-11)",
		}),
	)

	return (
		<div>
			<div className={className}>{props.label}</div>
		</div>
	)
}

function SingleEdgeExample() {
	const className = useStyles(
		border(["bottom"], "divider"),
		style({
			background: "var(--sand-2)",
			color: "var(--sand-12)",
			padding: "16px",
		}),
	)

	return <div className={className}>Section header</div>
}

