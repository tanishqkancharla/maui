import { style, useStyles } from "purse-styles"
import { Editor } from "../components/Editor"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { backgroundColor } from "../tokens/background"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

const demoMarkdown = `## Draft a reply

Type \`**bold**\` or start a line with \`-\` for a list.

- Ship the inbox pattern
- Wire TipTap markdown
- Stream the assistant reply
`

export function EditorPage() {
	const pageClassName = useStyles(pageClass)
	const hintClassName = useStyles(hintClass)
	const shellClassName = useStyles(demoShellClass)

	return (
		<Prose className={pageClassName}>
			<H2>Editor</H2>
			<P>
				A TipTap surface with bidirectional markdown (
				<code>@tiptap/markdown</code>) and input-rule shortcuts from StarterKit —
				<code>#</code> for headings, <code>**</code> for bold, <code>-</code> for
				lists, <code>&gt;</code> for quotes. The editable tree uses Maui{" "}
				<code>proseHtml</code> styles so it matches long-form reading type.
			</P>
			<P>
				<code>Editor</code> is the markdown surface only — padding, elevation, and
				actions belong on a wrapper. The gallery and AI chat each supply their
				own shell.
			</P>

			<H3>Markdown editor</H3>
			<Panel>
				<p className={hintClassName}>
					Try markdown shortcuts: <code>#</code> heading, <code>**</code> bold,{" "}
					<code>-</code> list, <code>&gt;</code> quote. ⌘/Ctrl+Enter submits in
					the chat app.
				</p>
				<div className={shellClassName}>
					<Editor content={demoMarkdown} aria-label="Markdown editor demo" />
				</div>
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const hintClass = style(text("sm", 400, "lowContrast"), {
	margin: "0 0 12px",
})

const demoShellClass = style(
	radius.lg,
	shadow.subtle,
	spacing.padding({ x: 4, y: 3 }),
	focusRing("&:focus-within", shadowVars.subtle),
	{
		backgroundColor: backgroundColor.element,
		minWidth: 0,
	},
)
