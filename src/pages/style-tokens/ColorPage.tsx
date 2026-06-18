import { useEffect, useState } from "react"
import { H2, H3, P } from "../../components/Typography"
import { Flex } from "../../components/Utils"
import { colorTokens } from "../../utils/colors"

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
		name: "Sand",
		tokens: rangeTokens("sand"),
	},
	{
		name: "Sand alpha",
		tokens: rangeTokens("sand-A", ""),
	},
] as const

function rangeTokens(prefix: string, separator = "-") {
	return Array.from(
		{ length: 12 },
		(_, index) => `${prefix}${separator}${index + 1}`,
	)
}

export function ColorPage() {
	return (
		<section>
			<H2>Color Tokens</H2>
			<P>
				The exported color tokens expose the raw accent, accent alpha, sand, and
				sand alpha scales. Semantic roles like text, background, border, and focus
				ring should compose these raw values in their own style-token modules.
			</P>

			<pre
				style={{
					background: "var(--sand-2)",
					border: "1px solid var(--sand-6)",
					borderRadius: "6px",
					color: "var(--sand-12)",
					padding: "12px",
					overflowX: "auto",
				}}
			>
				<code>{`style({
	color: colorTokens.sand[12],
	background: colorTokens.sand[2],
	border: \`1px solid \${colorTokens.sand[6]}\`,
	boxShadow: \`0 0 0 1px \${colorTokens.accent[8]} inset\`,
})`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ marginBottom: "24px" }}
			>
				<div
					style={{
						background: colorTokens.sand[3],
						border: `1px solid ${colorTokens.sand[6]}`,
						borderRadius: "6px",
						boxShadow: `0 0 0 1px ${colorTokens.accent[8]} inset`,
						color: colorTokens.sand[12],
						padding: "12px",
					}}
				>
					Using exported color tokens
				</div>
			</div>

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
		</section>
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
					boxShadow: "0 0 0 1px var(--sand-6) inset",
					background: `var(--${props.name})`,
				}}
			/>
			<code>{`--${props.name}`}</code>
			<code style={{ color: "var(--sand-10)", overflowWrap: "anywhere" }}>
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
