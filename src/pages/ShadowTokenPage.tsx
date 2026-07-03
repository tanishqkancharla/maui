import { style, useStyles } from "purse-styles"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { CodeBlock } from "../components/CodeBlock"
import { H2, H3, P } from "../components/Typography"
import { shadowTokens } from "../tokens/shadows"

const shadowExamples = [
	{ name: "thin", token: shadowTokens.thin },
	{ name: "minimalFlat", token: shadowTokens.minimalFlat },
	{ name: "minimal", token: shadowTokens.minimal },
	{ name: "middle", token: shadowTokens.middle },
	{ name: "strong", token: shadowTokens.strong },
	{ name: "modalSmall", token: shadowTokens.modalSmall },
	{ name: "panelFocused", token: shadowTokens.panelFocused },
	{ name: "border", token: shadowTokens.border },
	{ name: "bottomBorder", token: shadowTokens.bottomBorder },
	{ name: "bottomBorderThin", token: shadowTokens.bottomBorderThin },
] as const

export function ShadowTokenPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
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
							<code>var(--shadow-thin)</code>
						</TableCell>
						<TableCell>Border-ring only, no blur.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.minimalFlat</code>
						</TableCell>
						<TableCell>
							<code>var(--shadow-minimal-flat)</code>
						</TableCell>
						<TableCell>Minimal ring-only surface treatment.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.minimal</code>
						</TableCell>
						<TableCell>
							<code>var(--shadow-minimal)</code>
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
							<code>var(--shadow-middle)</code>
						</TableCell>
						<TableCell>Floating panels with moderate depth.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.strong</code>
						</TableCell>
						<TableCell>
							<code>var(--shadow-strong)</code>
						</TableCell>
						<TableCell>Higher-elevation floating panels.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.modalSmall</code>
						</TableCell>
						<TableCell>
							<code>var(--shadow-modal-small)</code>
						</TableCell>
						<TableCell>Popovers, toasts, and small modals.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.panelFocused</code>
						</TableCell>
						<TableCell>
							<code>var(--shadow-panel-focused)</code>
						</TableCell>
						<TableCell>Focused panel depth treatment.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.border</code>
						</TableCell>
						<TableCell>
							<code>rgba(255, 255, 255, 0.055) 0px 0px 0px 1px</code>
						</TableCell>
						<TableCell>Shadow-based surface borders.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.bottomBorder</code>
						</TableCell>
						<TableCell>
							<code>inset 0 -1.5px 0 rgba(255, 255, 255, 0.055)</code>
						</TableCell>
						<TableCell>Shadow-based row/header separators.</TableCell>
					</TableRow>
					<TableRow>
						<TableCell>
							<code>shadow.bottomBorderThin</code>
						</TableCell>
						<TableCell>
							<code>inset 0 -1px 0 rgba(255, 255, 255, 0.055)</code>
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
	shadowTokens.minimal,
)

const popover = style(
	background.subtle,
	radius.md,
	shadowTokens.modalSmall,
)`}</CodeBlock>

			<div className="maui-example-panel" style={{ marginTop: "16px" }}>
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
			</div>
		</section>
	)
}

function ShadowExample({
	name,
	token,
}: {
	name: string
	token: (typeof shadowExamples)[number]["token"]
}) {
	const className = useStyles(
		style(token, {
			background: "var(--sand-2)",
			borderRadius: "6px",
			padding: "16px",
			textAlign: "center",
		}),
	)

	return (
		<div>
			<div className={className}>{name}</div>
		</div>
	)
}

