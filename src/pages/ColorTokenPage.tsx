import { useEffect, useState } from "react"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { colors } from "../tokens/colors"

const colorTokenGroups = [
	{
		name: "Accent",
		tokens: rangeTokens("accent"),
	},
	{
		name: "Accent alpha",
		tokens: rangeTokens("accent-A", ""),
	},
	{
		name: "Gray",
		tokens: rangeTokens("gray"),
	},
	{
		name: "Gray alpha",
		tokens: rangeTokens("gray-A", ""),
	},
] as const

function rangeTokens(prefix: string, separator = "-") {
	return Array.from(
		{ length: 12 },
		(_, index) => `${prefix}${separator}${index + 1}`,
	)
}

export function ColorTokenPage() {
	return (
		<Prose>
			<H2>Color Tokens</H2>
			<P>
				The exported color tokens expose the raw accent, accent alpha, gray, and
				gray alpha scales. Semantic roles like text, background, border, and focus
				ring should compose these raw values in their own style-token modules.
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
							{group.tokens.map((token) => (
								<ColorToken key={token} name={token} />
							))}
						</Flex>
					</div>
				))}
			</Flex>
		</Prose>
	)
}

function ColorToken(props: { name: string }) {
	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "18px 86px minmax(0, 1fr)",
				alignItems: "center",
				gap: "10px",
			}}
		>
			<div
				style={{
					width: "18px",
					height: "18px",
					borderRadius: "3px",
					boxShadow: "0 0 0 1px var(--outline) inset",
					background: `var(--${props.name})`,
				}}
			/>
			<code>{`--${props.name}`}</code>
			<code style={{ color: "var(--gray-10)", overflowWrap: "anywhere" }}>
				<CSSVariableValue name={props.name} />
			</code>
		</div>
	)
}

function CSSVariableValue(props: { name: string }) {
	const [value, setValue] = useState(`var(--${props.name})`)

	useEffect(() => {
		const nextValue = getComputedStyle(document.documentElement)
			.getPropertyValue(`--${props.name}`)
			.trim()

		if (nextValue) {
			setValue(nextValue)
		}
	}, [props.name])

	return value
}
