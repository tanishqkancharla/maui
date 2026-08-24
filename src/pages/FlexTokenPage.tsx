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
				<code>Flex</code> is a small layout wrapper around the spacing scale.
				Pass <code>row</code> or <code>column</code>, and use scale steps for{" "}
				<code>gap</code> and padding (<code>p</code>, <code>px</code>,{" "}
				<code>py</code>, <code>pt</code>, <code>pb</code>) (not raw pixels).
				Optional{" "}
				<code>border</code>, <code>shadow</code>, and <code>radius</code> turn
				it into a surface. Shadows already include a 1px ring, so{" "}
				<code>border</code> is ignored when <code>shadow</code> is set. For
				style-object composition, prefer <code>flex()</code> from layout tokens.
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
							<code>row</code>
						</TableCell>
						<TableCell>
							<code>flex-direction: row</code>
						</TableCell>
						<TableCell>Horizontal groups and toolbars.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>column</code>
						</TableCell>
						<TableCell>
							<code>flex-direction: column</code>
						</TableCell>
						<TableCell>Vertical forms and stacked content.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>gap</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`1
| 2
| 3
| 4
| 6
| 8
| 12
| 16`}
							</code>
						</TableCell>
						<TableCell>
							Space between children from the spacing scale.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>alignItems</code>
						</TableCell>
						<TableCell>
							<code>align-items</code> CSS value
						</TableCell>
						<TableCell>Cross-axis alignment for the group.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>p</code>, <code>px</code>, <code>py</code>, <code>pt</code>,{" "}
							<code>pb</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`1
| 2
| 3
| 4
| 6
| 8
| 12
| 16`}
							</code>
						</TableCell>
						<TableCell>
							Padding from the spacing scale. More specific axes win (
							<code>pt</code> over <code>py</code> over <code>p</code>).
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>border</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`true
| "border"
| "outline"
| "accent"`}
							</code>
						</TableCell>
						<TableCell>
							1px ring. <code>true</code> is <code>outline</code>. Skipped when{" "}
							<code>shadow</code> is set.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`"subtle"
| "medium"
| "strong"`}
							</code>
						</TableCell>
						<TableCell>
							Elevation token. Already includes a 1px ring.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius</code>
						</TableCell>
						<TableCell>
							<code style={unionCodeStyle}>
								{`"none"
| "2xs"
| "xs"
| "sm"
| "md"
| "lg"
| "pill"
| "circle"`}
							</code>
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
			<CodeBlock lang="typescript">{`<Flex row alignItems="center" style={{ justifyContent: "center", height: 112 }}>
	…
</Flex>`}</CodeBlock>
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

			<div style={sampleTitleStyle}>Surface</div>
			<CodeBlock lang="tsx">{`<Flex column gap={4} p={6} shadow="subtle" radius="lg">
	…
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<Flex column gap={4} p={6} shadow="subtle" radius="lg">
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
			<CodeBlock lang="typescript">{`<Flex row alignItems="center" gap={4}>
	<span>between</span>
	<Spacer />
	<span>Action</span>
</Flex>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={exampleCardStyle}>
					<Flex row alignItems="center" gap={4}>
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

const unionCodeStyle = {
	whiteSpace: "pre",
} as const

const sampleTitleStyle = {
	color: colors.gray[12],
	fontWeight: 600,
	marginTop: "20px",
	marginBottom: "8px",
} as const


