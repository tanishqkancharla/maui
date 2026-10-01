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
import { borderColor } from "../tokens/borders"
import { radius } from "../tokens/radius"
import { useStyles } from "purse-styles"
export function CornerRadiusTokenPage() {
	const tiny = useStyles(radius["2xs"])
	const small = useStyles(radius.sm)
	const medium = useStyles(radius.md)
	const large = useStyles(radius.lg)
	const extraLarge = useStyles(radius.xl)
	const pill = useStyles(radius.pill)
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Corner radius</H2>
			<P>
				Radius tokens capture component shape. The goal is to avoid scattered
				literal radii while keeping names tied to real UI roles.
			</P>
			<P>
				Rounded corners increase with the Large platform scale, selected
				automatically for coarse pointers in System mode. Square, pill, and
				circular shapes stay unchanged. Examples follow the selected scale.
			</P>

			<H3>Values</H3>
			<Table aria-label="Corner radius tokens">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Medium / Large</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<Code>radius.none</Code>
						</TableCell>
						<TableCell>
							<Code>0</Code>
						</TableCell>
						<TableCell>Joined controls and edge-to-edge elements.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius["2xs"]</Code>
						</TableCell>
						<TableCell>
							<Code>2px / 3px</Code>
						</TableCell>
						<TableCell>Checkboxes and small selected indicators.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.xs</Code>
						</TableCell>
						<TableCell>
							<Code>3px / 4px</Code>
						</TableCell>
						<TableCell>Color swatches and tiny previews.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.sm</Code>
						</TableCell>
						<TableCell>
							<Code>4px / 6px</Code>
						</TableCell>
						<TableCell>Buttons, inputs, and most controls.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.md</Code>
						</TableCell>
						<TableCell>
							<Code>6px / 8px</Code>
						</TableCell>
						<TableCell>Cards, popovers, dialogs, and examples.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.lg</Code>
						</TableCell>
						<TableCell>
							<Code>8px / 12px</Code>
						</TableCell>
						<TableCell>Switch tracks.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.xl</Code>
						</TableCell>
						<TableCell>
							<Code>12px / 16px</Code>
						</TableCell>
						<TableCell>App shells and large preview frames.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.pill</Code>
						</TableCell>
						<TableCell>
							<Code>999px</Code>
						</TableCell>
						<TableCell>Sliders, badges, and pill controls.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<Code>radius.circle</Code>
						</TableCell>
						<TableCell>
							<Code>100%</Code>
						</TableCell>
						<TableCell>Radio dots, knobs, and circular icons.</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="typescript">{`const input = style(radius.sm)
const dialog = style(radius.md, spacing.padding({ all: 12 }))
const shell = style(radius.xl)`}</CodeBlock>

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
					className={tiny}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					className={small}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					className={medium}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					className={large}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					className={extraLarge}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
				<div
					className={pill}
					style={{
						width: "72px",
						height: "40px",
						background: colors.gray[3],
						border: `1px solid ${borderColor.outline}`,
					}}
				/>
			</Panel>
		</Prose>
	)
}
