import type React from "react"
import { useStyles } from "purse-styles"
import { Icons, type IconProps } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { iconSizeValues, type IconSize } from "../tokens/sizing"
import { text, type TextSize } from "../tokens/text"

const iconEntries = Object.entries(Icons) as [
	keyof typeof Icons,
	React.ComponentType<IconProps>,
][]

const iconSizes: IconSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]

/** Preview-only gap between icon and label — scales with size. */
const previewGap: Record<IconSize, string> = {
	"2xs": "2px",
	xs: "2px",
	sm: "4px",
	md: "4px",
	lg: "6px",
	xl: "6px",
}

export function IconsPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Icons</H2>
			<P>
				{iconEntries.length} SVG icons exported from <code>Icons</code>. Each
				icon accepts standard SVG props and uses <code>currentColor</code> for
				stroke and fill. Artwork is drawn at 24×24; set{" "}
				<code>size</code> to the same t-shirt scale as <code>text(...)</code>.
			</P>

			<H3>Sizes</H3>
			<P>
				Pair each icon size with the matching text size so labels and icons
				share one scale. Default is <code>sm</code> (16px).
			</P>
			<CodeBlock lang="tsx">{`<Icons.Search size="sm" />
<span className={text("sm", 400, "highContrast")}>Search mail</span>`}</CodeBlock>
			<Panel style={{ marginTop: "16px" }}>
				<div style={{ display: "grid", gap: "12px" }}>
					{iconSizes.map((size) => (
						<SizePreview key={size} size={size} />
					))}
				</div>
			</Panel>

			<H3>Catalog</H3>
			<H4>Default preview</H4>
			<P>
				Catalog tiles use <code>size="sm"</code> (16px) next to{" "}
				<code>text("sm")</code> labels.
			</P>
			<Panel>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
						gap: "12px",
					}}
				>
					{iconEntries.map(([name, Icon]) => (
						<CatalogTile key={name} name={name} Icon={Icon} />
					))}
				</div>
			</Panel>
		</Prose>
	)
}

function SizePreview(props: { size: IconSize }) {
	const labelClassName = useStyles(
		text(props.size as TextSize, 400, "highContrast"),
	)
	const metaClassName = useStyles(text("xs", 400, "lowContrast"))

	return (
		<div style={sizeRowStyle}>
			<code className={metaClassName}>
				{props.size} · icon {iconSizeValues[props.size]} · text{" "}
				{textSizeDetails[props.size]}
			</code>
			<div
				style={{
					...sizePreviewStyle,
					gap: previewGap[props.size],
				}}
			>
				<Icons.Search size={props.size} style={{ color: colors.gray[12] }} />
				<span className={labelClassName}>Search mail</span>
			</div>
		</div>
	)
}

function CatalogTile(props: {
	name: string
	Icon: React.ComponentType<IconProps>
}) {
	const labelClassName = useStyles(text("sm", 400, "lowContrast"))

	return (
		<div style={catalogTileStyle}>
			<div
				style={{
					...catalogPreviewStyle,
					gap: previewGap.sm,
				}}
			>
				<props.Icon size="sm" style={{ color: colors.gray[12] }} />
				<span className={labelClassName}>{props.name}</span>
			</div>
		</div>
	)
}

const textSizeDetails: Record<IconSize, string> = {
	"2xs": "10px",
	xs: "12px",
	sm: "13px",
	md: "14px",
	lg: "16px",
	xl: "22px",
}

const sizeRowStyle = {
	display: "grid",
	gap: "6px",
} as const

const sizePreviewStyle = {
	display: "flex",
	alignItems: "center",
	padding: "12px",
	borderRadius: "6px",
	border: `1px solid ${borderColor.outline}`,
	background: colors.gray[3],
} as const

const catalogTileStyle = {
	padding: "12px",
	borderRadius: "6px",
	border: `1px solid ${borderColor.outline}`,
	background: colors.gray[1],
} as const

const catalogPreviewStyle = {
	display: "flex",
	alignItems: "center",
	minWidth: 0,
} as const
