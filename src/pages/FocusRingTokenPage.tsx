import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { H2, H3, P } from "../components/Typography"
import { focusRing } from "../tokens/focusRing"

const focusedControlClass = style(focusRing(), {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "4px",
	padding: "8px 12px",
})

export function FocusRingTokenPage() {
	const focusedControlClassName = useStyles(focusedControlClass)

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Focus ring</H2>
			<P>
				Focus tokens standardize keyboard-visible states. Maui uses a single
				accent shadow treatment for every component, including slider thumbs.
				Per the Radix scale, accent focus rings use step 8.
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
							<code>focusRing()</code>
						</TableCell>
						<TableCell>
							<code>
								box-shadow: 0 0 0 1px #0f89fd7f, 0 0 8px 1px #0077ff24;
								position: relative; z-index: 1; outline: none
							</code>
						</TableCell>
						<TableCell>
							The standard focus treatment for every focus-visible control.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const focusedControl = style(
	focusRing(),
	{
		background: "var(--sand-3)",
		border: "1px solid var(--sand-6)",
		borderRadius: "4px",
		padding: "8px 12px",
	},
)`}</CodeBlock>

			<div
				className="maui-example-panel"
				style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}
			>
				<div className={focusedControlClassName}>
					Standard focus ring
				</div>
			</div>
		</section>
	)
}

