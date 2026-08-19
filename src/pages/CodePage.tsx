import { Code, Kbd } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "../components/Table"
import { H2, H3, H4, Link, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { useTheme } from "../theme/ThemeContext"
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

const jsonExample = (theme: "light" | "dark") => `{
	"name": "maui",
	"type": "${theme}"
}`

export function CodePage() {
	const { resolvedTheme } = useTheme()
	const themeTokens = mauiThemeTokens[resolvedTheme]

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Code</H2>
			<P>
				Inline <Code>Code</Code>, keyboard <Code>Kbd</Code>, and syntax-highlighted{" "}
				<Code>CodeBlock</Code> snippets. Marks use <Code>colors.gray[3]</Code> and{" "}
				<Code>radius.sm</Code>.
			</P>

			<H3>Inline code</H3>
			<P>
				Import <Code>style</Code> from purse-styles, then compose{" "}
				<Code>text("sm", 400, "highContrast")</Code> with layout tokens.
			</P>
			<CodeBlock lang="tsx">{`<Code>background.element</Code>`}</CodeBlock>

			<H3>Keyboard</H3>
			<P>
				<Code>Kbd</Code> uses <Code>text("sm", 400, "lowContrast")</Code> and{" "}
				<Code>3px</Code> inline padding.
			</P>
			<Flex row alignItems="center" gap={4}>
				<Kbd>⌘</Kbd>
				<Kbd>K</Kbd>
				<Kbd>T</Kbd>
				<Kbd>←</Kbd>
				<Kbd>→</Kbd>
				<Kbd>Esc</Kbd>
			</Flex>
			<CodeBlock lang="tsx">{`<Kbd>⌘</Kbd>
<Kbd>K</Kbd>`}</CodeBlock>

			<H3>Code block</H3>
			<P>
				<Code>CodeBlock</Code> renders syntax-highlighted snippets with Shiki
				using the Maui theme. Pass a <Code>lang</Code> prop for the language id
				and plain text as children.
			</P>
			<CodeBlock lang="tsx">{`<CodeBlock lang="typescript">{\`const x = 1\`}</CodeBlock>`}</CodeBlock>

			<H4>TypeScript</H4>
			<CodeBlock lang="typescript">{typescriptExample}</CodeBlock>

			<H4>TSX</H4>
			<CodeBlock lang="tsx">{tsxExample}</CodeBlock>

			<H4>CSS</H4>
			<CodeBlock lang="css">{cssExample}</CodeBlock>

			<H4>JSON</H4>
			<CodeBlock lang="json">{jsonExample(resolvedTheme)}</CodeBlock>

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
					{themeTokens.map((token) => (
						<TableRow key={token.role}>
							<TableCell align="middle">{token.role}</TableCell>
							<TableCell align="middle">
								<Code>{token.sublime}</Code>
							</TableCell>
							<TableCell align="middle">
								<Code>{token.color}</Code>
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
