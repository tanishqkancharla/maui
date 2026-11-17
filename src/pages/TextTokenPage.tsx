import { useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead,
	TableHeader, TableRow } from "../components/Table"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { text, type TextSize } from "../tokens/text"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function TextTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Text</H2>
			<P>
				The text token combines size, weight, semantic color, and optional
				monospace / tabular flags into one style object. Use it anywhere text
				needs a consistent Maui type treatment. In JSX, the <Code>Text</Code>{" "}
				component applies the same token through <Code>size</Code>,{" "}
				<Code>fontWeight</Code>, <Code>color</Code>, <Code>monospace</Code>,
				and <Code>tabular</Code> attributes.
			</P>

			<H3>Values</H3>
			<Table aria-label="Text token values">
				<TableHeader>
					<TableHead isRowHeader>Input</TableHead>
					<TableHead>Values</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Code>size</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"2xs"
| "xs"
| "sm"
| "md"
| "lg"
| "xl"`}
							</Code>
						</TableCell>
						<TableCell>T-shirt text size presets.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>fontWeight</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`400
| 500
| 600
| 700`}
							</Code>
						</TableCell>
						<TableCell>
							Regular, medium, semibold, and bold text.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>color</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"lowContrast"
| "highContrast"
| "accent"
| "onAccent"`}
							</Code>
						</TableCell>
						<TableCell>Semantic text colors.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>monospace</Code>
						</TableCell>
						<TableCell>
							<Code>font-family + ss05 smart kerning + tabular-nums</Code>
						</TableCell>
						<TableCell>
							Switch to Commit Mono with smart kerning.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>tabular</Code>
						</TableCell>
						<TableCell>
							<Code>font-variant-numeric: tabular-nums</Code>
						</TableCell>
						<TableCell>
							Fixed-width digits.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Sizes</H4>
			<P>Preview sizes adapt to the Scale picker. Each pair below shows medium → large.</P>
			<CodeBlock lang="typescript">{`const tiny = text({ size: "2xs", fontWeight: 400, color: "highContrast" })
const caption = text({ size: "xs", fontWeight: 400, color: "highContrast" })
const compact = text({ size: "sm", fontWeight: 400, color: "highContrast" })
const body = text({ size: "md", fontWeight: 400, color: "highContrast" })
const title = text({ size: "lg", fontWeight: 400, color: "highContrast" })
const display = text({ size: "xl", fontWeight: 400, color: "highContrast" })`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={{ display: "grid", gap: "12px" }}>
					{sizeExamples.map((size) => (
						<SizeExample key={size} size={size} />
					))}
				</div>
			</Panel>

			<H4>Weight</H4>
			<CodeBlock lang="typescript">{`const heading = text({ size: "lg", fontWeight: 600, color: "highContrast" })`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<HeadingExample />
			</Panel>

			<H4>Accent text</H4>
			<CodeBlock lang="typescript">{`const active = text({ size: "sm", fontWeight: 500, color: "accent" })`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<AccentExample />
			</Panel>

			<H4>Tabular</H4>
			<P>
				<Code>tabular: true</Code> sets{" "}
				<Code>font-variant-numeric: tabular-nums</Code>. NumberField,
				TableHead, and TableCell turn this on by default. Body copy and
				Prose stay off.
			</P>
			<CodeBlock lang="typescript">{`const count = text({ size: "sm", fontWeight: 400, color: "highContrast", tabular: true })`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<TabularExample />
			</Panel>

			<H4>Monospace</H4>
			<P>
				<Code>monospace: true</Code> switches to Commit Mono with tabular
				numerals and smart kerning (OpenType <Code>ss05</Code>).
			</P>
			<CodeBlock lang="typescript">{`const codeLabel = text({ size: "lg", fontWeight: 400, color: "highContrast", monospace: true })`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<MonoExample />
			</Panel>
		</Prose>
	)
}

const sizeExamples: TextSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]

const textSizeDetails: Record<
	TextSize,
	{
		fontSize: string
		lineHeight: string
	}
> = {
	"2xs": { fontSize: "10 → 12px", lineHeight: "14 → 18px" },
	xs: { fontSize: "12 → 15px", lineHeight: "18 → 22px" },
	sm: { fontSize: "13 → 16px", lineHeight: "20 → 24px" },
	md: { fontSize: "14 → 17px", lineHeight: "22 → 26px" },
	lg: { fontSize: "16 → 20px", lineHeight: "24 → 30px" },
	xl: { fontSize: "22 → 28px", lineHeight: "30 → 36px" },
}

const sampleParagraph =
	"Computers started as room-sized machines. Today, they fit in pockets and help people write, draw, learn, and work together."

function SizeExample(props: { size: TextSize }) {
	const className = useStyles(
		text({ size: props.size, fontWeight: 400, color: "highContrast" }),
		exampleCardClass,
	)

	return (
		<div style={{ display: "grid", gap: "6px" }}>
			<Code style={{ color: colors.gray[10] }}>
				{props.size} · {textSizeDetails[props.size].fontSize} /{" "}
				{textSizeDetails[props.size].lineHeight}
			</Code>
			<div className={className}>{sampleParagraph}</div>
		</div>
	)
}

function HeadingExample() {
	const className = useStyles(text({ size: "lg", fontWeight: 600, color: "highContrast" }), exampleCardClass)

	return <div className={className}>Readable heading</div>
}

function AccentExample() {
	const className = useStyles(text({ size: "sm", fontWeight: 500, color: "accent" }), exampleCardClass)

	return <div className={className}>Selected navigation item</div>
}

function TabularExample() {
	const className = useStyles(
		text({ size: "sm", fontWeight: 400, color: "highContrast", tabular: true }),
		exampleCardClass,
	)

	return (
		<div className={className}>
			<div>111,111.00</div>
			<div>888,888.00</div>
		</div>
	)
}

function MonoExample() {
	const className = useStyles(
		text({ size: "lg", fontWeight: 400, color: "highContrast", monospace: true }),
		exampleCardClass,
	)

	return (
		<div className={className}>
			Commit Mono: Normal programming typeface
		</div>
	)
}

const exampleCardClass = {
	background: colors.gray[3],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "6px",
	padding: "12px",
} as const

const unionCodeStyle = {
	whiteSpace: "pre",
} as const
