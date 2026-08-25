import { useEffect, useState } from "react"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { useTheme } from "../theme/ThemeContext"
import { borderColor } from "../tokens/borders"
import {
	colors,
	paletteNames,
	scaleSteps,
	type ColorScale,
} from "../tokens/colors"

const semanticScales: { name: string; scale: keyof typeof colors }[] = [
	{ name: "Accent", scale: "accent" },
	{ name: "Accent alpha", scale: "accentAlpha" },
	{ name: "Gray", scale: "gray" },
	{ name: "Gray alpha", scale: "grayAlpha" },
]

export function ColorTokenPage() {
	return (
		<Prose>
			<H2>Color Tokens</H2>
			<P>
				<code>colors.accent</code> is the brand pair (teal in light, violet in
				dark). Every Radix palette is also on <code>colors</code> as{" "}
				<code>colors.blue</code>, <code>colors.red</code>,{" "}
				<code>colors.blueAlpha</code>, and so on. Semantic roles like text,
				background, border, and focus ring should compose these raw values.
			</P>

			<CodeBlock lang="typescript">{`style({
	color: colors.gray[12],
	background: colors.gray[2],
	border: \`1px solid \${colors.gray[6]}\`,
	boxShadow: \`0 0 0 1px \${colors.accent[8]} inset\`,
})`}</CodeBlock>

			<Panel style={{ marginTop: "16px", marginBottom: "24px" }}>
				<div
					style={{
						background: colors.gray[3],
						border: `1px solid ${colors.gray[6]}`,
						borderRadius: "6px",
						boxShadow: `0 0 0 1px ${colors.accent[8]} inset`,
						color: colors.gray[12],
						padding: "12px",
					}}
				>
					Using exported color tokens
				</div>
			</Panel>

			<H3>Semantic</H3>
			<Flex row gap={16} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
				{semanticScales.map((group) => (
					<div key={group.name} style={{ minWidth: "260px" }}>
						<H4>{group.name}</H4>
						<Flex column gap={4}>
							{scaleSteps.map((step) => (
								<ColorToken
									key={`${group.scale}-${step}`}
									scale={group.scale}
									step={step}
								/>
							))}
						</Flex>
					</div>
				))}
			</Flex>

			<H3>Palettes</H3>
			<P>
				Solid and alpha scales for every Radix color.{" "}
				<code>variantColor="blue"</code> on Button resolves{" "}
				<code>colors.blue</code>. Hex and <code>rgb()</code> strings are
				used as-is.
			</P>
			<Flex column gap={6}>
				{paletteNames.map((name) => (
					<PaletteStrip key={name} name={name} />
				))}
			</Flex>
		</Prose>
	)
}

function PaletteStrip(props: { name: (typeof paletteNames)[number] }) {
	const solid = colors[props.name]
	const alpha = colors[`${props.name}Alpha`]

	return (
		<div>
			<code>{props.name}</code>
			<ScaleBar scale={solid} />
			<ScaleBar scale={alpha} />
		</div>
	)
}

function ScaleBar(props: { scale: ColorScale }) {
	return (
		<div
			style={{
				display: "flex",
				height: "16px",
				marginTop: "4px",
				borderRadius: "4px",
				overflow: "hidden",
				boxShadow: `0 0 0 1px ${borderColor.outline} inset`,
			}}
		>
			{scaleSteps.map((step) => (
				<div
					key={step}
					title={`${step}`}
					style={{
						flex: 1,
						background: props.scale[step],
					}}
				/>
			))}
		</div>
	)
}

function ColorToken(props: {
	scale: keyof typeof colors
	step: (typeof scaleSteps)[number]
}) {
	const value = colors[props.scale][props.step]
	const label = `colors.${props.scale}[${props.step}]`

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "18px 140px minmax(0, 1fr)",
				alignItems: "center",
				gap: "10px",
			}}
		>
			<div
				style={{
					width: "18px",
					height: "18px",
					borderRadius: "3px",
					boxShadow: `0 0 0 1px ${borderColor.outline} inset`,
					background: value,
				}}
			/>
			<code>{label}</code>
			<code style={{ color: colors.gray[10], overflowWrap: "anywhere" }}>
				<ResolvedColorValue cssVar={value} />
			</code>
		</div>
	)
}

function ResolvedColorValue(props: { cssVar: string }) {
	const [value, setValue] = useState(props.cssVar)
	const { resolvedTheme } = useTheme()

	useEffect(() => {
		const match = /^var\((--[^)]+)\)$/.exec(props.cssVar)
		if (!match) {
			setValue(props.cssVar)
			return
		}

		const nextValue = getComputedStyle(document.documentElement)
			.getPropertyValue(match[1])
			.trim()

		if (nextValue) {
			setValue(nextValue)
		}
	}, [props.cssVar, resolvedTheme])

	return value
}
