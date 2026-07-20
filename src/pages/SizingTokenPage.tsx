import { useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { Icons } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { sizingTokens } from "../tokens/sizing"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function SizingTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Sizing</H2>
			<P>
				Sizing tokens are style objects for dimensions and constraints. Keep the
				set small: icon size, full-width layout, and readable content width.
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
							<code>sizingTokens.icon</code>
						</TableCell>
						<TableCell>
							<code>width: 16px; height: 16px</code>
						</TableCell>
						<TableCell>Default inline icon size.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>sizingTokens.fullWidth</code>
						</TableCell>
						<TableCell>
							<code>width: 100%</code>
						</TableCell>
						<TableCell>Fill the available container width.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>sizingTokens.contentWidth</code>
						</TableCell>
						<TableCell>
							<code>max-width: 72ch</code>
						</TableCell>
						<TableCell>Readable prose and content measure.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<H4>Icon</H4>
			<CodeBlock lang="typescript">{`const icon = style(
	sizingTokens.icon,
	{ borderRadius: "999px" },
)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<IconExample />
			</Panel>

			<H4>Full width</H4>
			<CodeBlock lang="typescript">{`const field = style(
	sizingTokens.fullWidth,
	background.element,
)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<FullWidthExample />
			</Panel>

			<H4>Content width</H4>
			<CodeBlock lang="typescript">{`const content = style(
	sizingTokens.contentWidth,
	text.body,
)`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<ContentWidthExample />
			</Panel>
		</Prose>
	)
}

function IconExample() {
	const className = useStyles(sizingTokens.icon, iconClass)

	return (
		<div style={exampleCardStyle}>
			<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
				<Icons.Search className={className} />
				<span style={{ color: colors.gray[12], lineHeight: 1.4 }}>
					Icon aligns with text
				</span>
			</div>
		</div>
	)
}

function FullWidthExample() {
	const className = useStyles(sizingTokens.fullWidth, fullWidthClass)

	return (
		<div style={exampleCardStyle}>
			<div className={className} />
		</div>
	)
}

function ContentWidthExample() {
	const className = useStyles(sizingTokens.contentWidth, contentWidthClass)

	return (
		<div style={exampleCardStyle}>
			<div className={className} />
		</div>
	)
}

const iconClass = {
	color: colors.accent[11],
} as const

const fullWidthClass = {
	height: "28px",
	background: colors.accent[9],
	borderRadius: "4px",
} as const

const contentWidthClass = {
	height: "28px",
	background: colors.gray[4],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "4px",
} as const

const exampleCardStyle = {
	background: colors.gray[3],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "6px",
	padding: "12px",
} as const

