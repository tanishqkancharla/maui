import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { H2, H3, H4, Link, P } from "../components/Typography"
import { mauiThemeTokens } from "../utils/mauiShikiTheme"

const typescriptExample = `import { style } from "purse-styles"
import { border } from "../tokens/borders"
import { text, monospace } from "../tokens/text"

const panel = style(
	text("sm", 400, "highContrast"),
	monospace,
	border([], "outline"),
)`

const tsxExample = `export function Greeting(props: { name: string }) {
	return (
		<p className={labelClass}>
			Hello, {props.name}
		</p>
	)
}`

const cssExample = `.maui-code-block .shiki {
	background-color: transparent;
	tab-size: 2;
}`

const jsonExample = `{
	"name": "maui",
	"type": "dark",
	"foreground": "#ecebe8"
}`

export function CodeBlockPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>CodeBlock</H2>
			<P>
				<code>CodeBlock</code> renders syntax-highlighted snippets with Shiki
				using the Maui theme. Pass a <code>lang</code> prop for the language id
				and plain text as children.
			</P>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`<CodeBlock lang="typescript">{\`const x = 1\`}</CodeBlock>`}</CodeBlock>

			<H3>Examples</H3>
			<H4>TypeScript</H4>
			<CodeBlock lang="typescript">{typescriptExample}</CodeBlock>

			<H4>TSX</H4>
			<CodeBlock lang="tsx">{tsxExample}</CodeBlock>

			<H4>CSS</H4>
			<CodeBlock lang="css">{cssExample}</CodeBlock>

			<H4>JSON</H4>
			<CodeBlock lang="json">{jsonExample}</CodeBlock>

			<H3>Maui Shiki theme</H3>
			<P>
				Based on{" "}
				<Link href="https://github.com/rsms/sublime-theme">
					rsms/sublime-theme
				</Link>{" "}
				(rsms-dark), adapted to Maui foreground and accent colors.
			</P>

			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Role</TableHeaderCell>
						<TableHeaderCell>Sublime scope</TableHeaderCell>
						<TableHeaderCell>Color</TableHeaderCell>
						<TableHeaderCell>Sample</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{mauiThemeTokens.map((token) => (
						<TableRow key={token.role}>
							<TableCell align="middle">{token.role}</TableCell>
							<TableCell align="middle">
								<code>{token.sublime}</code>
							</TableCell>
							<TableCell align="middle">
								<code>{token.color}</code>
							</TableCell>
							<TableCell align="middle">
								<span
									style={{
										color: token.color,
										fontFamily: "ui-monospace, monospace",
									}}
								>
									Ag
								</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<div style={{ marginTop: "16px" }}>
				<CodeBlock lang="typescript">{typescriptExample}</CodeBlock>
			</div>
		</Prose>
	)
}

