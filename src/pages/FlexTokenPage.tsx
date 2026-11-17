import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead,
	TableHeader, TableRow } from "../components/Table"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function FlexTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Flex</H2>
			<P>
				<Code>Flex</Code> is a small layout wrapper around the spacing scale.
				Pass <Code>row</Code> or <Code>column</Code>, and use scale steps for{" "}
				<Code>gap</Code> and padding (<Code>padding</Code> / <Code>p</Code>,{" "}
				<Code>px</Code>, <Code>py</Code>, <Code>pt</Code>, <Code>pr</Code>,{" "}
				<Code>pb</Code>, <Code>pl</Code>) (not raw pixels).
				Optional{" "}
				<Code>justifyContent</Code>, <Code>background</Code>, <Code>border</Code>,{" "}
				<Code>shadow</Code>, and <Code>radius</Code> turn it into a layout
				surface. <Code>justifyContent</Code> uses the same tokens as{" "}
				<Code>flex()</Code>. Shadows already include a 1px ring, so{" "}
				<Code>border</Code> is ignored when <Code>shadow</Code> is set. For
				style-object composition, prefer <Code>flex()</Code> from layout tokens.
			</P>

			<H3>Values</H3>
			<Table aria-label="Flex attributes">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Code>row</Code>
						</TableCell>
						<TableCell>
							<Code>flex-direction: row</Code>
						</TableCell>
						<TableCell>Horizontal groups and toolbars.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>column</Code>
						</TableCell>
						<TableCell>
							<Code>flex-direction: column</Code>
						</TableCell>
						<TableCell>Vertical forms and stacked content.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>gap</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`1
| 2
| 3
| 4
| 6
| 8
| 12
| 16`}
							</Code>
						</TableCell>
						<TableCell>
							Space between children from the spacing scale.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>alignItems</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"start"
| "center"
| "end"
| "stretch"
| "baseline"`}
							</Code>
						</TableCell>
						<TableCell>
							Cross-axis alignment. Same tokens as <Code>flex()</Code>{" "}
							<Code>alignItems</Code>.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>justifyContent</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"start"
| "center"
| "end"
| "between"
| "around"
| "evenly"`}
							</Code>
						</TableCell>
						<TableCell>
							Main-axis alignment. Same tokens as <Code>flex()</Code>{" "}
							<Code>justifyContent</Code>.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"app"
| "element"
| "elementHover"
| "elementActive"
| "accent"
| "accentHover"`}
							</Code>
						</TableCell>
						<TableCell>
							Surface token from <Code>background</Code>.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>padding</Code> / <Code>p</Code>, <Code>px</Code>,{" "}
							<Code>py</Code>, <Code>pt</Code>, <Code>pr</Code>,{" "}
							<Code>pb</Code>, <Code>pl</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`1
| 2
| 3
| 4
| 6
| 8
| 12
| 16`}
							</Code>
						</TableCell>
						<TableCell>
							Padding from the spacing scale. <Code>padding</Code> is an alias
							of <Code>p</Code>. More specific axes win (
							<Code>pt</Code> over <Code>py</Code> over <Code>p</Code>).
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>border</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`true
| "border"
| "outline"
| "accent"`}
							</Code>
						</TableCell>
						<TableCell>
							1px ring. <Code>true</Code> is <Code>outline</Code>. Skipped when{" "}
							<Code>shadow</Code> is set.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>shadow</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"subtle"
| "medium"
| "strong"`}
							</Code>
						</TableCell>
						<TableCell>
							Elevation token. Already includes a 1px ring.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius</Code>
						</TableCell>
						<TableCell>
							<Code style={unionCodeStyle}>
								{`"none"
| "2xs"
| "xs"
| "sm"
| "md"
| "lg"
| "xl"
| "pill"
| "circle"`}
							</Code>
						</TableCell>
						<TableCell>Corner radius token.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<div style={sampleTitleStyle}>Row</div>
			<CodeBlock lang="typescript">{`<Flex row alignItems="center" gap={4}>
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={4}>
						<Pill>One</Pill>
						<Pill>Two</Pill>
						<Pill>Three</Pill>
					</Flex>
				</div>
			</Panel>

			<div style={sampleTitleStyle}>Column</div>
			<CodeBlock lang="typescript">{`<Flex column gap={4}>
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex column gap={4}>
						<Pill>First</Pill>
						<Pill>Second</Pill>
						<Pill>Third</Pill>
					</Flex>
				</div>
			</Panel>

			<div style={sampleTitleStyle}>Centered</div>
			<CodeBlock lang="typescript">{`<Flex row alignItems="center" justifyContent="center" style={{ height: 112 }}>
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex
						row
						alignItems="center"
						justifyContent="center"
						style={{ height: 112 }}
					>
						<Pill>center</Pill>
					</Flex>
				</div>
			</Panel>

			<div style={sampleTitleStyle}>Surface</div>
			<CodeBlock lang="tsx">{`<Flex column gap={4} p={6} background="element" shadow="subtle" radius="lg">
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex
					column
					gap={4}
					p={6}
					background="element"
					shadow="subtle"
					radius="lg"
				>
					<Pill>Card</Pill>
					<Pill>With shadow</Pill>
				</Flex>
			</Panel>

			<div style={sampleTitleStyle}>Border</div>
			<CodeBlock lang="tsx">{`<Flex row alignItems="center" gap={4} px={4} py={3} border="outline" radius="md">
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex
					row
					alignItems="center"
					gap={4}
					px={4}
					py={3}
					border="outline"
					radius="md"
				>
					<Pill>Outlined</Pill>
					<Pill>Group</Pill>
				</Flex>
			</Panel>

			<div style={sampleTitleStyle}>Between</div>
			<CodeBlock lang="typescript">{`<Flex row alignItems="center" justifyContent="between">
	<span>between</span>
	<span>Action</span>
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" justifyContent="between">
						<span>between</span>
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

const unionCodeStyle = {
	whiteSpace: "pre",
} as const

const sampleTitleStyle = {
	color: colors.gray[12],
	fontWeight: 600,
	marginTop: "20px",
	marginBottom: "8px",
} as const

