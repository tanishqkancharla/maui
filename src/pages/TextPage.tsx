import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "../components/Table"
import { Text } from "../components/Text"
import { H2, H3, H4, Link, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { colors } from "../tokens/colors"
import { type TextColor, type TextSize, type TextWeight } from "../tokens/text"

export function TextPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Text</H2>
			<P>
				<Code>Text</Code> is a <Code>span</Code> whose type styles are set as
				attributes. It applies the <Code>text(size, fontWeight, color)</Code>{" "}
				token — the same scale documented on the Text token page.
			</P>

			<H3>Attributes</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Attribute</TableHeaderCell>
						<TableHeaderCell>Values</TableHeaderCell>
						<TableHeaderCell>Default</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<Code>size</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"2xs" | "xs" | "sm" | "md" | "lg" | "xl"`}
							</Code>
						</TableCell>
						<TableCell>
							<Code>md</Code>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>fontWeight</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>{`400 | 500 | 600 | 700`}</Code>
						</TableCell>
						<TableCell>
							<Code>400</Code>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>color</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"lowContrast" | "highContrast" | "accent" | "onAccent"`}
							</Code>
						</TableCell>
						<TableCell>
							<Code>highContrast</Code>
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>monospace</Code>
						</TableCell>
						<TableCell>
							<Code>boolean</Code>
						</TableCell>
						<TableCell>
							<Code>false</Code>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Default</H4>
			<CodeBlock lang="tsx">{`<Text>Readable body copy</Text>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Text>Readable body copy</Text>
			</Panel>

			<H4>Sizes</H4>
			<CodeBlock lang="tsx">{`<Text size="xs">Caption</Text>
<Text size="lg" fontWeight={600}>Title</Text>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex column gap={4}>
					{sizes.map((size) => (
						<Text key={size} size={size}>
							{`${size} · Computers started as room-sized machines.`}
						</Text>
					))}
				</Flex>
			</Panel>

			<H4>Weight</H4>
			<CodeBlock lang="tsx">{`<Text fontWeight={600}>Semibold label</Text>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex column gap={2}>
					{weights.map((fontWeight) => (
						<Text key={fontWeight} fontWeight={fontWeight}>
							{`${fontWeight} · Readable heading`}
						</Text>
					))}
				</Flex>
			</Panel>

			<H4>Color</H4>
			<CodeBlock lang="tsx">{`<Text color="lowContrast">Secondary</Text>
<Text color="accent" fontWeight={500}>Selected</Text>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex column gap={2}>
					{colorsExamples.map((color) => (
						<Text
							key={color}
							color={color}
							style={
								color === "onAccent"
									? { backgroundColor: colors.accent[9], padding: "2px 6px" }
									: undefined
							}
						>
							{color}
						</Text>
					))}
				</Flex>
			</Panel>

			<H4>Monospace</H4>
			<P>
				<Code>monospace</Code> switches to{" "}
				<Link href="https://commitmono.com/">Commit Mono</Link> with tabular
				numerals, the same as composing <Code>text(...)</Code> with{" "}
				<Code>monospace</Code>.
			</P>
			<CodeBlock lang="tsx">{`<Text size="xs" monospace>
	const greeting = "hello"
</Text>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Text size="xs" monospace>
					const greeting = "hello"
				</Text>
			</Panel>

			<H4>Inline</H4>
			<P>
				Because <Code>Text</Code> is a span, it can emphasize a run inside
				another sentence.
			</P>
			<CodeBlock lang="tsx">{`<P>
	Use <Text fontWeight={600}>semibold</Text> or{" "}
	<Text color="accent">accent</Text> on a word.
</P>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Text>
					Use <Text fontWeight={600}>semibold</Text> or{" "}
					<Text color="accent">accent</Text> on a word without breaking the
					line.
				</Text>
			</Panel>
		</Prose>
	)
}

const sizes: TextSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]
const weights: TextWeight[] = [400, 500, 600, 700]
const colorsExamples: TextColor[] = [
	"lowContrast",
	"highContrast",
	"accent",
	"onAccent",
]

const unionCodeStyle = {
	whiteSpace: "pre",
} as const
