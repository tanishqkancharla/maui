import { useStyles } from "purse-styles"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead,
	TableHeader, TableRow } from "../components/Table"
import { H2, H3, P } from "../components/Typography"
import { background } from "../tokens/background"
import { border } from "../tokens/borders"
import { radius } from "../tokens/radius"
import { text } from "../tokens/text"

export function BackgroundColorTokenPage() {
	const appClassName = useStyles(
		background.app,
		border([], "outline"),
		radius.md,
		{ padding: "12px" },
	)
	const elementClassName = useStyles(
		background.element,
		border([], "outline"),
		radius.md,
		{ padding: "12px" },
	)
	const accentClassName = useStyles(
		background.accent,
		radius.md,
		text({ size: "sm", fontWeight: 400, color: "onAccent" }),
		{ padding: "12px" },
	)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Background color</H2>
			<P>
				Background tokens describe surfaces and states. They should make it
				clear whether a component is sitting on the app canvas, raised as a
				control, active as a selected element, or using accent color for solid fills.
			</P>

			<H3>Values</H3>
			<Table aria-label="Background color tokens">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Code>background.app</Code>
						</TableCell>
						<TableCell>
							<Code>#ffffff</Code> / <Code>colors.gray[1]</Code>
						</TableCell>
						<TableCell>App/page background (white in light, gray 1 in dark).</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background.element</Code>
						</TableCell>
						<TableCell>
							<Code>#ffffff</Code> / <Code>colors.gray[2]</Code>
						</TableCell>
						<TableCell>
							Inputs and slightly raised controls. Matches app white in
							light; one step lighter than the canvas in dark.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background.elementHover</Code>
						</TableCell>
						<TableCell>
							<Code>backgroundColor.elementHover</Code>
						</TableCell>
						<TableCell>
							3.5% gray[12] into the element surface.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background.elementActive</Code>
						</TableCell>
						<TableCell>
							<Code>backgroundColor.elementActive</Code>
						</TableCell>
						<TableCell>
							7% gray[12] into the element surface.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background.accent</Code>
						</TableCell>
						<TableCell>
							<Code>colors.accent[9]</Code>
						</TableCell>
						<TableCell>
							Primary fills and selected indicators.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>background.accentHover</Code>
						</TableCell>
						<TableCell>
							<Code>colors.accent[10]</Code>
						</TableCell>
						<TableCell>Hovered solid accent background.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const panel = style(background.element, border([], "outline"), radius.md)
const primary = style(background.accent, text({ size: "sm", fontWeight: 400, color: "onAccent" }))`}</CodeBlock>

			<Panel
				style={{
					marginTop: "16px",
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					gap: "12px",
				}}
			>
				<div className={appClassName}>App</div>
				<div className={elementClassName}>Raised</div>
				<div className={accentClassName}>Accent</div>
			</Panel>
		</Prose>
	)
}
