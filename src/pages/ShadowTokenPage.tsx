import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { colors } from "../tokens/colors"
import { shadow } from "../tokens/shadow"

const shadowExamples = [
	{ name: "thin", token: shadow.thin },
	{ name: "minimalFlat", token: shadow.minimalFlat },
	{ name: "minimal", token: shadow.minimal },
	{ name: "middle", token: shadow.middle },
	{ name: "strong", token: shadow.strong },
	{ name: "modalSmall", token: shadow.modalSmall },
	{ name: "panelFocused", token: shadow.panelFocused },
	{ name: "border", token: shadow.border },
	{ name: "bottomBorder", token: shadow.bottomBorder },
	{ name: "bottomBorderThin", token: shadow.bottomBorderThin },
] as const

export function ShadowTokenPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Shadows</H2>
			<P>
				Shadow tokens are taken from Craft's shadow system: a foreground-colored
				1px ring plus black blur layers controlled by shared opacity variables.
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
							<code>shadow.thin</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.thin</code>
						</TableCell>
						<TableCell>Border-ring only, no blur.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.minimalFlat</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.minimalFlat</code>
						</TableCell>
						<TableCell>Minimal ring-only surface treatment.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.minimal</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.minimal</code>
						</TableCell>
						<TableCell>
							Small controls and low-elevation surfaces.
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.middle</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.middle</code>
						</TableCell>
						<TableCell>Floating panels with moderate depth.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.strong</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.strong</code>
						</TableCell>
						<TableCell>Higher-elevation floating panels.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.modalSmall</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.modalSmall</code>
						</TableCell>
						<TableCell>Popovers, toasts, and small modals.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.panelFocused</code>
						</TableCell>
						<TableCell>
							<code>shadowVars.panelFocused</code>
						</TableCell>
						<TableCell>Focused panel depth treatment.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.border</code>
						</TableCell>
						<TableCell>
							<code>0 0 0 1px borderColor.border</code>
						</TableCell>
						<TableCell>Shadow-based surface borders.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.bottomBorder</code>
						</TableCell>
						<TableCell>
							<code>inset 0 -1.5px 0 borderColor.border</code>
						</TableCell>
						<TableCell>Shadow-based row/header separators.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.bottomBorderThin</code>
						</TableCell>
						<TableCell>
							<code>inset 0 -1px 0 borderColor.border</code>
						</TableCell>
						<TableCell>
							Thinner shadow-based row/header separators.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Examples</H3>
			<CodeBlock lang="typescript">{`const control = style(
	background.element,
	radius.sm,
	shadow.minimal,
)

const popover = style(
	background.subtle,
	radius.md,
	shadow.modalSmall,
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
						<ShadowExample key={example.name} name={example.name} token={example.token} />
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
