import { style, useStyles } from "purse-styles"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { Editor } from "../components/Editor"
import { MarkdownEditor } from "../components/MarkdownEditor"
import { Panel } from "./Panel"
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
	const editor = useEditor({
		extensions: [StarterKit.configure({ heading: { levels: [2] } })],
		content:
			"<p>This editor uses a caller-owned TipTap instance. Select text and toggle bold.</p>",
		immediatelyRender: false,
		editorProps: { attributes: { "aria-label": "Custom editor demo" } },
	})

	return (
		<Prose className={pageClassName}>
			<H2>Editor</H2>
			<P>
				<Code>Editor</Code> is a Maui-styled surface for an instance created
				with TipTap’s <Code>useEditor</Code>. You own the extensions, content
				format, events, and commands. Import it from <Code>maui/editor</Code>.
			</P>
			<P>
				<Code>MarkdownEditor</Code> builds on that surface with StarterKit,
				Markdown, and Placeholder. Import it from{" "}
				<Code>maui/markdown-editor</Code>. Both leave padding, elevation, and
				actions to a wrapper. TipTap is an optional peer dependency; install it
				when using either editor.
			</P>

			<H3>Custom editor</H3>
			<Panel>
				<Button onClick={() => editor?.chain().focus().toggleBold().run()}>
					Toggle bold
				</Button>
				<div className={shellClassName}>
					<Editor editor={editor} />
				</div>
			</Panel>

			<H3>Markdown editor</H3>
			<Panel>
				<p className={hintClassName}>
					Try markdown shortcuts: <Code>#</Code> heading, <Code>**</Code> bold,{" "}
					<Code>-</Code> list, <Code>&gt;</Code> quote. ⌘/Ctrl+Enter submits in
					the chat app.
				</p>
				<div className={shellClassName}>
					<MarkdownEditor
						initialContent={demoMarkdown}
						aria-label="Markdown editor demo"
					/>
				</div>
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const hintClass = style(
	text({ size: "sm", fontWeight: 400, color: "lowContrast" }),
	{
		margin: "0 0 12px",
	},
)

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
