import { style, useStyles } from "purse-styles"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
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
	{ name: "control", token: shadow.control },
	{ name: "subtle", token: shadow.subtle },
	{ name: "medium", token: shadow.medium },
	{ name: "strong", token: shadow.strong },
] as const

export function ShadowTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Shadows</H2>
			<P>
				Controls use inset highlights with a compact outer edge. Other surfaces
				use Craft&apos;s three-level elevation stack: a
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
							<Code>shadow.control</Code>
						</TableCell>
						<TableCell>
							<Code>shadowVars.control</Code>
						</TableCell>
						<TableCell>Buttons and form-control surfaces.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>shadow.subtle</Code>
						</TableCell>
						<TableCell>
							<Code>shadowVars.subtle</Code>
						</TableCell>
						<TableCell>Cards and ordinary low-elevation surfaces.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>shadow.medium</Code>
						</TableCell>
						<TableCell>
							<Code>shadowVars.medium</Code>
						</TableCell>
						<TableCell>Tooltips and larger floating panels.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>shadow.strong</Code>
						</TableCell>
						<TableCell>
							<Code>shadowVars.strong</Code>
						</TableCell>
						<TableCell>Dropdowns, popovers, and dominant overlays.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const control = style(
	background.element,
	radius.sm,
	shadow.control,
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
			<Code>{props.name}</Code>
		</div>
	)
}
