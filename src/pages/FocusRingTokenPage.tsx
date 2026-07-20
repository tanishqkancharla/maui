import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { focusRing } from "../tokens/focusRing"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
const focusedControlClass = style(focusRing(), {
	background: colors.gray[3],
	border: `1px solid ${borderColor.outline}`,
	borderRadius: "4px",
	padding: "8px 12px",
})

export function FocusRingTokenPage() {
	const focusedControlClassName = useStyles(focusedControlClass)

	return (
		<Prose style={{ marginBottom: "32px" }}>
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
								box-shadow: 0 0 0 1px accentAlpha[8], 0 0 8px 1px
								accentAlpha[5]; position: relative; z-index: 1; outline: none
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
		background: colors.gray[3],
		border: "1px solid ${borderColor.outline}",
		borderRadius: "4px",
		padding: "8px 12px",
	},
)`}</CodeBlock>

			<Panel
				style={{ marginTop: "16px", display: "flex", gap: "12px", alignItems: "center" }}
			>
				<div className={focusedControlClassName}>
					Standard focus ring
				</div>
			</Panel>
		</Prose>
	)
}

