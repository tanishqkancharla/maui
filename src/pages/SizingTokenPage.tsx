import { useStyles } from "purse-styles"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "../components/Table"
import { Icons } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import {
	icon,
	iconGap,
	iconGapValues,
	iconSizeValues,
	sizingTokens,
	type IconSize,
} from "../tokens/sizing"
import { text } from "../tokens/text"

const iconSizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]

export function SizingTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Sizing</H2>
			<P>
				Sizing tokens cover icon dimensions (same t-shirt scale as text),
				full-width layout, and readable content width.
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
							<code>icon(size)</code>
						</TableCell>
						<TableCell>
							<code>"2xs" | "xs" | "sm" | "md" | "lg" | "xl"</code>
						</TableCell>
						<TableCell>
							T-shirt icon box sizes, paired with{" "}
							<code>text(size, …)</code>.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>iconGap(size)</code>
						</TableCell>
						<TableCell>
							<code>2xs/xs 2px · sm/md 4px · lg/xl 6px</code>
						</TableCell>
						<TableCell>
							Gap between icon and label at the matching size.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>sizing.icon</code>
						</TableCell>
						<TableCell>
							<code>icon("sm")</code> → 16×16
						</TableCell>
						<TableCell>Default inline icon size alias.</TableCell>
					</TableRow>
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
			<H4>Icon sizes</H4>
			<CodeBlock lang="typescript">{`const leading = icon("sm")
const row = style(iconGap("sm"), text("sm", 400, "highContrast"))
// <Icons.Search className={leading} /> next to label`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={{ display: "grid", gap: "10px" }}>
					{iconSizes.map((size) => (
						<IconSizeExample key={size} size={size} />
					))}
				</div>
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

function IconSizeExample(props: { size: IconSize }) {
	const iconClassName = useStyles(icon(props.size), iconClass)
	const rowClassName = useStyles(iconGap(props.size), iconRowClass)
	const labelClassName = useStyles(text(props.size, 400, "highContrast"))
	const metaClassName = useStyles(text("xs", 400, "lowContrast"))

	return (
		<div style={exampleCardStyle}>
			<code className={metaClassName}>
				{props.size} · {iconSizeValues[props.size]} · gap{" "}
				{iconGapValues[props.size]}
			</code>
			<div className={rowClassName}>
				<Icons.Search className={iconClassName} />
				<span className={labelClassName}>Icon aligns with text</span>
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

const iconRowClass = {
	display: "flex",
	alignItems: "center",
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
	display: "grid",
	gap: "6px",
} as const
