import { style, useStyles } from "purse-styles"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { MarkdownEditorDemo } from "../patterns/Editor"

export function EditorPage() {
	const pageClassName = useStyles(pageClass)

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

			<H3>Markdown editor</H3>
			<Panel>
				<MarkdownEditorDemo />
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
