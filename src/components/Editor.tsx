import { EditorContent, type EditorContentProps } from "@tiptap/react"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { proseHtml, type ProseSize } from "../tokens/prose"
import { cls } from "../utils/cls"

export type EditorProps = Omit<EditorContentProps, "size"> & {
	size?: ProseSize
}

/**
 * Maui-styled TipTap surface. Create the editor with TipTap's useEditor;
 * the caller owns extensions, content, events, commands, and lifecycle.
 * Other props target the outer wrapper. Set editable-element attributes
 * through TipTap's editorProps.attributes.
 */
export function Editor({ size = "md", className, ...props }: EditorProps) {
	const surfaceClassName = useStyles(editorClass, proseHtml(size))
	return (
		<EditorContent
			{...props}
			className={cls("maui-editor-prose", surfaceClassName, className)}
		/>
	)
}

const editorClass = style({
	minWidth: 0,
	width: "100%",
	"& > .ProseMirror": {
		outline: "none",
		minHeight: "2.75em",
		// proseHtml styles descendants; its block rhythm belongs on the document.
		display: "flex",
		flexDirection: "column",
		gap: "inherit",
	},
	"& .ProseMirror p.is-editor-empty:first-child::before": {
		color: colors.gray[9],
		content: "attr(data-placeholder)",
		float: "left",
		height: 0,
		pointerEvents: "none",
	},
})
