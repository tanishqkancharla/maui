import { style, useStyles } from "purse-styles"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/Table"
import { H2, H3, P } from "../components/Typography"
import { colors } from "../tokens/colors"
import { shadow } from "../tokens/shadow"

const shadowExamples = [
	{ name: "subtle", token: shadow.subtle },
	{ name: "medium", token: shadow.medium },
	{ name: "strong", token: shadow.strong },
] as const

export function ShadowTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Shadows</H2>
			<P>
				Shadows use Craft&apos;s three-level elevation stack: a
				foreground-colored 1px ring plus progressively deeper black blur layers.
				Blur opacity is 0.06 in light mode and 0.12 in dark mode.
			</P>

			<H3>Values</H3>
			<Table aria-label="Shadow tokens">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>shadow.subtle</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.subtle</code>
						</TableCell>
						<TableCell>
							Controls, cards, and ordinary low-elevation surfaces.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.medium</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.medium</code>
						</TableCell>
						<TableCell>Tooltips and larger floating panels.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.strong</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.strong</code>
						</TableCell>
						<TableCell>Dropdowns, popovers, and dominant overlays.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const control = style(
	background.element,
	radius.sm,
	shadow.subtle,
)

const popover = style(
	background.element,
	radius.md,
	shadow.strong,
)`}</CodeBlock>

			<Panel style={{ marginTop: "16px" }}>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
						gap: "16px",
					}}
				>
					{shadowExamples.map((example) => (
						<ShadowExample
							key={example.name}
							name={example.name}
							token={example.token}
						/>
					))}
				</div>
			</Panel>
		</Prose>
	)
}

function ShadowExample(props: {
	name: string
	token: (typeof shadowExamples)[number]["token"]
}) {
	const className = useStyles(
		props.token,
		style({
			background: colors.gray[2],
			borderRadius: "8px",
			padding: "16px",
			minHeight: "72px",
		}),
	)

	return (
		<div className={className}>
			<code>{props.name}</code>
		</div>
	)
}
