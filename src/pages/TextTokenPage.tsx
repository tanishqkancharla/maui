import { useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { monospace, text, type TextSize } from "../tokens/text"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function TextTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Text</H2>
			<P>
				The text token combines size, weight, and semantic color into one style
				object. Use it anywhere text needs a consistent Maui type treatment.
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
							<code>size</code>
						</TableCell>
						<TableCell>
							<code>"2xs" | "xs" | "sm" | "md" | "lg" | "xl"</code>
						</TableCell>
						<TableCell>T-shirt text size presets.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>fontWeight</code>
						</TableCell>
						<TableCell>
							<code>400 | 500 | 600 | 700</code>
						</TableCell>
						<TableCell>
							Regular, medium, semibold, and bold text.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>color</code>
						</TableCell>
						<TableCell>
							<code>
								"lowContrast" | "highContrast" | "accent" | "onAccent"
							</code>
						</TableCell>
						<TableCell>Semantic text colors.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>monospace</code>
						</TableCell>
						<TableCell>
							<code>font-family + tabular-nums + tab-size: 2</code>
						</TableCell>
						<TableCell>
							Compose with <code>text(...)</code> to override the sans family.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Sizes</H4>
			<CodeBlock lang="typescript">{`const tiny = text("2xs", 400, "highContrast")
const caption = text("xs", 400, "highContrast")
const compact = text("sm", 400, "highContrast")
const body = text("md", 400, "highContrast")
const title = text("lg", 400, "highContrast")
const display = text("xl", 400, "highContrast")`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={{ display: "grid", gap: "12px" }}>
					{sizeExamples.map((size) => (
						<SizeExample key={size} size={size} />
					))}
				</div>
			</Panel>

			<H4>Weight</H4>
			<CodeBlock lang="typescript">{`const heading = text("lg", 600, "highContrast")`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<HeadingExample />
			</Panel>

			<H4>Accent text</H4>
			<CodeBlock lang="typescript">{`const active = text("sm", 500, "accent")`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<AccentExample />
			</Panel>

			<H4>Monospace</H4>
			<P>
				<code>monospace</code> switches to a system mono stack with tabular
				numerals. Compose it after <code>text(...)</code> to keep size, weight,
				and color.
			</P>
			<CodeBlock lang="typescript">{`const codeLabel = style(text("xs", 400, "highContrast"), monospace)`}</CodeBlock>
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
	"2xs": { fontSize: "10px", lineHeight: "14px" },
	xs: { fontSize: "12px", lineHeight: "18px" },
	sm: { fontSize: "13px", lineHeight: "20px" },
	md: { fontSize: "14px", lineHeight: "22px" },
	lg: { fontSize: "16px", lineHeight: "24px" },
	xl: { fontSize: "22px", lineHeight: "30px" },
}

const sampleParagraph =
	"Computers started as room-sized machines. Today, they fit in pockets and help people write, draw, learn, and work together."

function SizeExample(props: { size: TextSize }) {
	const className = useStyles(
		text(props.size, 400, "highContrast"),
		exampleCardClass,
	)

	return (
		<div style={{ display: "grid", gap: "6px" }}>
			<code style={{ color: colors.gray[10] }}>
				{props.size} · {textSizeDetails[props.size].fontSize} /{" "}
				{textSizeDetails[props.size].lineHeight}
			</code>
			<div className={className}>{sampleParagraph}</div>
		</div>
	)
}

function HeadingExample() {
	const className = useStyles(text("lg", 600, "highContrast"), exampleCardClass)

	return <div className={className}>Readable heading</div>
}

function AccentExample() {
	const className = useStyles(text("sm", 500, "accent"), exampleCardClass)

	return <div className={className}>Selected navigation item</div>
}

function MonoExample() {
	const className = useStyles(
		text("xs", 400, "highContrast"),
		monospace,
		exampleCardClass,
	)

	return <div className={className}>const greeting = "hello"</div>
}

const exampleCardClass = {
	background: colors.gray[3],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "6px",
	padding: "12px",
} as const

