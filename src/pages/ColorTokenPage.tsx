import { useEffect, useState } from "react"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { useTheme } from "../theme/ThemeContext"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"

type ScaleName = "accent" | "accentAlpha" | "gray" | "grayAlpha"

const colorTokenGroups: { name: string; scale: ScaleName }[] = [
	{ name: "Accent", scale: "accent" },
	{ name: "Accent alpha", scale: "accentAlpha" },
	{ name: "Gray", scale: "gray" },
	{ name: "Gray alpha", scale: "grayAlpha" },
]

const scaleSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export function ColorTokenPage() {
	return (
		<Prose>
			<H2>Color Tokens</H2>
			<P>
				The exported color tokens expose the raw accent, accent alpha, gray, and
				gray alpha scales. Semantic roles like text, background, border, and
				focus ring should compose these raw values in their own style-token
				modules.
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

			<Flex row gap={40} style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
				{colorTokenGroups.map((group) => (
					<div key={group.name} style={{ minWidth: "260px" }}>
						<H3>{group.name}</H3>
						<Flex column gap={8}>
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
		</Prose>
	)
}

function ColorToken(props: { scale: ScaleName; step: (typeof scaleSteps)[number] }) {
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
