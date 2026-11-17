import { useEffect, useImperativeHandle, type Ref } from "react"
import { Markdown } from "@tiptap/markdown"
import Placeholder from "@tiptap/extension-placeholder"
import { useEditor, type Editor as TiptapEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { type ProseSize } from "../tokens/prose"
import { Editor } from "./Editor"

export type MarkdownEditorProps = {
	/** Markdown used to initialize the document. Later changes are ignored. */
	initialContent?: string
	/** Access the TipTap instance for explicit commands such as clearContent(). */
	ref?: Ref<TiptapEditor | null>
	/** Called with the current markdown whenever the document changes. */
	onChange?: (markdown: string) => void
	placeholder?: string
	size?: ProseSize
	editable?: boolean
	className?: string
	"aria-label"?: string
	onSubmit?: () => void
}

/**
 * TipTap markdown surface with CommonMark shortcuts (`#`, `**`, `-`, `>`, …)
 * and Maui prose type styles on the ProseMirror tree. No chrome — wrap it
 * for padding, elevation, and actions.
 */
export function MarkdownEditor({
	initialContent = "",
	ref,
	onChange,
	placeholder = "Write…",
	size = "md",
	editable = true,
	className,
	"aria-label": ariaLabel = "Editor",
	onSubmit,
}: MarkdownEditorProps) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3, 4] },
				link: {
					openOnClick: false,
				},
			}),
			Markdown,
			Placeholder.configure({
				placeholder,
			}),
		],
		content: initialContent,
		contentType: "markdown",
		editable,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				"aria-label": ariaLabel,
			},
			handleKeyDown: (_view, event) => {
				if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
					event.preventDefault()
					onSubmit?.()
					return true
				}
				return false
			},
		},
		onUpdate: ({ editor: current }) => {
			onChange?.(current.getMarkdown())
		},
	})

	useImperativeHandle<TiptapEditor | null, TiptapEditor | null>(
		ref,
		() => editor,
		[editor],
	)

	// useEditor preserves the live editable state when refreshing options.
	useEffect(() => {
		if (!editor) return
		editor.setEditable(editable, false)
	}, [editor, editable])

	return <Editor editor={editor} size={size} className={className} />
}
