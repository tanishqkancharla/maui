import { useEffect, useState } from "react"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
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
				<Code>colors.accent</Code> is the brand pair (teal in light, violet in
				dark). Every Radix palette is also on <Code>colors</Code> as{" "}
				<Code>colors.blue</Code>, <Code>colors.red</Code>,{" "}
				<Code>colors.blueAlpha</Code>, and so on. Semantic roles like text,
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
				<Code>variantColor="blue"</Code> on Button resolves{" "}
				<Code>colors.blue</Code>. Hex and <Code>rgb()</Code> strings are
				used as an opaque fill.
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
			<Code>{props.name}</Code>
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
				gridTemplateColumns: "32px minmax(0, 1fr)",
				alignItems: "center",
				gap: "10px",
			}}
		>
			<div
				style={{
					width: "32px",
					height: "32px",
					borderRadius: "3px",
					boxShadow: `0 0 0 1px ${borderColor.outline} inset`,
					background: value,
				}}
			/>
			<div style={{ display: "grid", gap: "2px", justifyItems: "start" }}>
				<Text monospace>{label}</Text>
				<Text monospace color="lowContrast" style={{ overflowWrap: "anywhere" }}>
					<ResolvedColorValue cssVar={value} />
				</Text>
			</div>
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

		const cssVariable = match[1]
		if (cssVariable === undefined) {
			setValue(props.cssVar)
			return
		}

		const nextValue = getComputedStyle(document.documentElement)
			.getPropertyValue(cssVariable)
			.trim()

		if (nextValue) {
			setValue(nextValue)
		}
	}, [props.cssVar, resolvedTheme])

	return value
}
