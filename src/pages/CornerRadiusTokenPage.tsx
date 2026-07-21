import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { H2, H3, P } from "../components/Typography"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
export function CornerRadiusTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Corner radius</H2>
			<P>
				Radius tokens capture component shape. The goal is to avoid scattered
				literal radii while keeping names tied to real UI roles.
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
							<code>radius.none</code>
						</TableCell>
						<TableCell>
							<code>0</code>
						</TableCell>
						<TableCell>
							Joined controls and edge-to-edge elements.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius["2xs"]</code>
						</TableCell>
						<TableCell>
							<code>2px</code>
						</TableCell>
						<TableCell>
							Checkboxes and small selected indicators.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.xs</code>
						</TableCell>
						<TableCell>
							<code>3px</code>
						</TableCell>
						<TableCell>Color swatches and tiny previews.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.sm</code>
						</TableCell>
						<TableCell>
							<code>4px</code>
						</TableCell>
						<TableCell>Buttons, inputs, and most controls.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.md</code>
						</TableCell>
						<TableCell>
							<code>6px</code>
						</TableCell>
						<TableCell>
							Cards, popovers, dialogs, and examples.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.lg</code>
						</TableCell>
						<TableCell>
							<code>8px</code>
						</TableCell>
						<TableCell>Switch tracks.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.pill</code>
						</TableCell>
						<TableCell>
							<code>999px</code>
						</TableCell>
						<TableCell>Sliders, badges, and pill controls.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>radius.circle</code>
						</TableCell>
						<TableCell>
							<code>100%</code>
						</TableCell>
						<TableCell>
							Radio dots, knobs, and circular icons.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const input = style(radius.sm)
const dialog = style(radius.md, spacing.padding({ all: 12 }))`}</CodeBlock>

			<Panel
				style={{
					marginTop: "16px",
					display: "flex",
					alignItems: "center",
					gap: "12px",
					flexWrap: "wrap",
				}}
			>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "2px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "4px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "6px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					style={{
						width: "72px",
						height: "40px",
						borderRadius: "999px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
			</Panel>
		</Prose>
	)
}

