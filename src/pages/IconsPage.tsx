import { useMemo, useState } from "react"
import type React from "react"
import { useStyles } from "purse-styles"
import { Icons, type IconProps } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { SearchField } from "../components/Input"
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
	const [query, setQuery] = useState("")
	const filtered = useMemo(() => {
		const needle = query.trim().toLowerCase()
		if (!needle) return iconEntries
		return iconEntries.filter(([name]) => name.toLowerCase().includes(needle))
	}, [query])

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Icons</H2>
			<P>
				{iconEntries.length} SVG icons. Import a named icon so unused artwork
				is tree-shaken. <code>Icons.Name</code> is a convenience namespace and
				pulls the full set.
			</P>
			<CodeBlock lang="tsx">{`import { Search, Plus } from "@tanishqkancharla/maui"

<Search size="sm" />
<Plus size="md" />`}</CodeBlock>
			<P>
				Artwork is 24×24 and uses <code>currentColor</code>. Set{" "}
				<code>size</code> to the same t-shirt scale as <code>text(...)</code>.
				Default is <code>sm</code> (16px).
			</P>
			<P>
				A few icon names collide with other Maui exports (
				<code>Text</code>, <code>Badge</code>, <code>Switch</code>, …). Those
				are available as <code>TextIcon</code> from the root, as{" "}
				<code>Icons.Text</code>, or from{" "}
				<code>@tanishqkancharla/maui/icons</code>.
			</P>

			<H3>Sizes</H3>
			<P>
				Pair each icon size with the matching text size so labels and icons
				share one scale.
			</P>
			<CodeBlock lang="tsx">{`<Search size="sm" />
<span className={text({ size: "sm", fontWeight: 400, color: "highContrast" })}>Search mail</span>`}</CodeBlock>
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
				<code>{`text({ size: "sm" })`}</code> labels.
			</P>
			<SearchField
				aria-label="Filter icons"
				placeholder="Filter icons"
				value={query}
				onChange={setQuery}
			/>
			<P>
				{filtered.length === iconEntries.length
					? `${iconEntries.length} icons`
					: `${filtered.length} of ${iconEntries.length} icons`}
			</P>
			<Panel>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
						gap: "12px",
					}}
				>
					{filtered.map(([name, Icon]) => (
						<CatalogTile key={name} name={name} Icon={Icon} />
					))}
				</div>
			</Panel>
		</Prose>
	)
}

function SizePreview(props: { size: IconSize }) {
	const labelClassName = useStyles(
		text({ size: props.size as TextSize, fontWeight: 400, color: "highContrast" }),
	)
	const metaClassName = useStyles(text({ size: "xs", fontWeight: 400, color: "lowContrast" }))

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
	const labelClassName = useStyles(text({ size: "sm", fontWeight: 400, color: "lowContrast" }))

	return (
		<div style={catalogTileStyle}>
			<div
				style={{
					...catalogPreviewStyle,
					gap: previewGap.sm,
				}}
			>
				<props.Icon size="sm" style={{ color: colors.gray[12] }} />
				<span className={labelClassName} style={{ overflowWrap: "anywhere" }}>
					{props.name}
				</span>
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
