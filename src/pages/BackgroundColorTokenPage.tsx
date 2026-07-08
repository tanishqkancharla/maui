import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { H2, H3, P } from "../components/Typography"

export function BackgroundColorTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Background color</H2>
			<P>
				Background tokens describe surfaces and states. They should make it
				clear whether a component is sitting on the app canvas, raised as a
				control, active as a selected element, or using accent color for solid fills.
			</P>

			<H3>Values</H3>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Name</TableHeaderCell>
						<TableHeaderCell>Value</TableHeaderCell>
						<TableHeaderCell>Use</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>background.app</code>
						</TableCell>
						<TableCell>
							<code>var(--gray-1)</code>
						</TableCell>
						<TableCell>App/page background.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.subtle</code>
						</TableCell>
						<TableCell>
							<code>var(--gray-2)</code>
						</TableCell>
						<TableCell>Dialogs, cards, and panels.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.element</code>
						</TableCell>
						<TableCell>
							<code>var(--gray-3)</code>
						</TableCell>
						<TableCell>Inputs and slightly raised controls.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.elementHover</code>
						</TableCell>
						<TableCell>
							<code>var(--gray-4)</code>
						</TableCell>
						<TableCell>Neutral hover state.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.elementActive</code>
						</TableCell>
						<TableCell>
							<code>var(--gray-5)</code>
						</TableCell>
						<TableCell>Selected rows and menu items.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.accent</code>
						</TableCell>
						<TableCell>
							<code>var(--accent-9)</code>
						</TableCell>
						<TableCell>
							Primary fills and selected indicators.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>background.accentHover</code>
						</TableCell>
						<TableCell>
							<code>var(--accent-10)</code>
						</TableCell>
						<TableCell>Hovered solid accent background.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const panel = style(background.subtle, border([], "outline"), radius.md)
const primary = style(background.accent, textColor.onAccent)`}</CodeBlock>

			<div
				className="maui-example-panel"
				style={{
					marginTop: "16px",
					display: "grid",
					gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
					gap: "12px",
				}}
			>
				<div
					style={{
						background: "var(--gray-2)",
						border: "1px solid var(--outline)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					Surface
				</div>
				<div
					style={{
						background: "var(--gray-3)",
						border: "1px solid var(--outline)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					Raised
				</div>
				<div
					style={{
						background: "var(--accent-9)",
						borderRadius: "6px",
						color: "white",
						padding: "12px",
					}}
				>
					Accent
				</div>
			</div>
		</Prose>
	)
}

