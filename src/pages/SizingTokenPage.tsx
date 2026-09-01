import { useStyles } from "purse-styles"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { sizingTokens } from "../tokens/sizing"

export function SizingTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Sizing</H2>
			<P>
				Sizing tokens cover full-width layout and readable content width. Icon
				box sizes live on the icon itself: <code>{`<Icons.Search size="sm" />`}</code>
				.
			</P>

			<H3>Values</H3>
			<Table aria-label="Sizing tokens">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>sizing.fullWidth</code>
						</TableCell>
						<TableCell>
							<code>width: 100%</code>
						</TableCell>
						<TableCell>Fill the available container width.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>sizing.contentWidth</code>
						</TableCell>
						<TableCell>
							<code>max-width: 72ch</code>
						</TableCell>
						<TableCell>Readable prose and content measure.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
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
	display: "grid",
	gap: "6px",
} as const
