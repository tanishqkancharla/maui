import { javascript } from "@codemirror/lang-javascript"
import * as radix from "@radix-ui/colors"
import { style, useStyles } from "purse-styles"
import { useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import {
	mauiCodeMirrorTheme,
	type JsxHighlightColors,
} from "../apps/JsxEditor/editorTheme"
import { Select, SelectItem } from "../components/Select"
import { Text } from "../components/Text"
import { H2, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { colors } from "../tokens/colors"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { mauiSyntaxColors } from "../utils/mauiShikiTheme"

const sample = `<Flex column gap={6}>
  <Avatar name="Ada Lovelace" size="md" />
  <Text size="lg" color="lowContrast">
    Mathematician
  </Text>
  <Button variant="primary" variantColor="blue">
    Save
  </Button>
  <Button variant="quiet">Cancel</Button>
</Flex>
`

const schemeIds = [
	"classic",
	"quiet",
	"brand",
	"cool",
	"warm",
] as const

type SchemeId = (typeof schemeIds)[number]

const schemeLabels: Record<SchemeId, string> = {
	classic: "Classic JSX — blue / orange / green",
	quiet: "Quiet Maui — warm / gray / green",
	brand: "Brand — accent / gray / green",
	cool: "Cool split — violet / cyan / amber",
	warm: "Warm split — gold / slate / teal",
}

function radixStep11(
	name: "blue" | "orange" | "green" | "violet" | "cyan" | "amber" | "gold" | "slate" | "teal" | "gray",
	dark: boolean,
) {
	const scale = dark
		? (radix[`${name}Dark`] as Record<string, string>)
		: (radix[name] as Record<string, string>)
	return scale[`${name}11`]
}

function schemeColors(id: SchemeId, dark: boolean): JsxHighlightColors {
	const syntax = dark ? mauiSyntaxColors.dark : mauiSyntaxColors.light
	switch (id) {
		case "classic":
			return {
				tagName: radixStep11("blue", dark),
				attributeName: radixStep11("orange", dark),
				string: radixStep11("green", dark),
			}
		case "quiet":
			return {
				tagName: syntax.typeRef,
				attributeName: radixStep11("gray", dark),
				string: syntax.string,
			}
		case "brand":
			return {
				tagName: dark ? radix.violetDark.violet11 : radix.teal.teal11,
				attributeName: radixStep11("gray", dark),
				string: radixStep11("green", dark),
			}
		case "cool":
			return {
				tagName: radixStep11("violet", dark),
				attributeName: radixStep11("cyan", dark),
				string: radixStep11("amber", dark),
			}
		case "warm":
			return {
				tagName: radixStep11("gold", dark),
				attributeName: radixStep11("slate", dark),
				string: radixStep11("teal", dark),
			}
	}
}

function isSchemeId(value: unknown): value is SchemeId {
	return typeof value === "string" && schemeIds.includes(value as SchemeId)
}

export function SyntaxPreviewPage() {
	const pageClassName = useStyles(pageClass)
	const gridClassName = useStyles(gridClass)
	const selectWrapClassName = useStyles(selectWrapClass)
	const [scheme, setScheme] = useState<SchemeId>("classic")
	const lightJsx = useMemo(() => schemeColors(scheme, false), [scheme])
	const darkJsx = useMemo(() => schemeColors(scheme, true), [scheme])

	return (
		<div className={pageClassName}>
			<Flex column gap={4}>
				<H2>Syntax preview</H2>
				<P>
					Temporary comparison of JSX highlighting. Current theme on the left;
					a proposed trio on the right. Light and dark are forced so you can
					judge both without flipping the gallery theme.
				</P>
				<div className={selectWrapClassName}>
					<Select
						label="Proposed trio"
						selectedKey={scheme}
						onSelectionChange={(key) => {
							if (isSchemeId(key)) setScheme(key)
						}}
					>
						{schemeIds.map((id) => (
							<SelectItem key={id} id={id}>
								{schemeLabels[id]}
							</SelectItem>
						))}
					</Select>
				</div>
			</Flex>

			<div className={gridClassName}>
				<SamplePane
					title="Current"
					dark={false}
					caption="Component and attribute share typeRef"
				/>
				<SamplePane
					title={schemeLabels[scheme]}
					dark={false}
					jsx={lightJsx}
					caption="Component / attribute / string"
				/>
				<SamplePane
					title="Current"
					dark={true}
					caption="Component and attribute share typeRef"
				/>
				<SamplePane
					title={schemeLabels[scheme]}
					dark={true}
					jsx={darkJsx}
					caption="Component / attribute / string"
				/>
			</div>
		</div>
	)
}

function SamplePane(props: {
	title: string
	caption: string
	dark: boolean
	jsx?: JsxHighlightColors
}) {
	const hostClassName = useStyles(editorHostClass)
	const headerClassName = useStyles(paneHeaderClass)
	const paneClassName = useStyles(paneClass)
	const extensions = useMemo(
		() => [
			javascript({ jsx: true, typescript: true }),
			...mauiCodeMirrorTheme(props.dark, props.jsx),
		],
		[props.dark, props.jsx],
	)
	const surface = props.dark ? radix.grayDark.gray2 : radix.gray.gray2
	const stroke = props.dark ? radix.grayDark.gray6 : radix.gray.gray6
	const label = props.dark ? radix.grayDark.gray11 : radix.gray.gray11
	const titleColor = props.dark ? radix.grayDark.gray12 : radix.gray.gray12

	return (
		<section
			className={paneClassName}
			style={{
				backgroundColor: surface,
				borderColor: stroke,
			}}
		>
			<div className={headerClassName} style={{ borderBottomColor: stroke }}>
				<Text size="xs" style={{ color: titleColor }}>
					{props.dark ? "Dark · " : "Light · "}
					{props.title}
				</Text>
				<Text size="xs" style={{ color: label }}>
					{props.caption}
				</Text>
			</div>
			<div className={hostClassName}>
				<CodeMirror
					value={sample}
					editable={false}
					height="100%"
					theme="none"
					extensions={extensions}
					basicSetup={{
						foldGutter: false,
						highlightActiveLine: false,
						highlightActiveLineGutter: false,
						bracketMatching: false,
						autocompletion: false,
						searchKeymap: false,
					}}
				/>
			</div>
		</section>
	)
}

const pageClass = style(flex({ direction: "column", gap: 8 }), {
	paddingBottom: spacing.value(16),
	maxWidth: "1100px",
})

const selectWrapClass = style({
	maxWidth: "28rem",
})

const gridClass = style({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr)",
	gap: spacing.value(4),
	"@media (min-width: 860px)": {
		gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
	},
})

const paneClass = style(radius.lg, {
	display: "flex",
	flexDirection: "column",
	minWidth: 0,
	overflow: "hidden",
	border: `1px solid ${colors.gray[6]}`,
})

const paneHeaderClass = style(
	flex({ direction: "column", gap: 1 }),
	{
		flexShrink: 0,
		paddingInline: spacing.value(4),
		paddingBlock: spacing.value(3),
		borderBottom: "1px solid transparent",
	},
)

const editorHostClass = style({
	minHeight: "260px",
	height: "260px",
	overflow: "hidden",
	"& > div": {
		height: "100%",
		minHeight: 0,
	},
	"& .cm-editor": {
		height: "100%",
		overflow: "hidden",
	},
	"& .cm-scroller": {
		overflow: "auto",
	},
})
