import { useEffect } from "react"
import { Markdown } from "@tiptap/markdown"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { style, useStyles } from "purse-styles"
import { useRefCurrent } from "../hooks/useRefCurrent"
import { colors } from "../tokens/colors"
import { proseHtml, type ProseSize } from "../tokens/prose"
import { cls } from "../utils/cls"

export type EditorProps = {
	/** Markdown content. Updates are applied when this value changes. */
	content?: string
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
export function Editor({
	content = "",
	onChange,
	placeholder = "Write…",
	size = "md",
	editable = true,
	className,
	"aria-label": ariaLabel = "Editor",
	onSubmit,
}: EditorProps) {
	const surfaceClassName = useStyles(editorClass)
	const proseClassName = useStyles(proseHtml(size))
	const onChangeRef = useRefCurrent(onChange)
	const onSubmitRef = useRefCurrent(onSubmit)

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
		content,
		contentType: "markdown",
		editable,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				"aria-label": ariaLabel,
				class: `maui-editor-prose ${proseClassName}`,
			},
			handleKeyDown: (_view, event) => {
				if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
					event.preventDefault()
					onSubmitRef.current?.()
					return true
				}
				return false
			},
		},
		onUpdate: ({ editor: current }) => {
			onChangeRef.current?.(current.getMarkdown())
		},
	})

	useEffect(() => {
		if (!editor) return
		editor.setEditable(editable)
	}, [editor, editable])

	useEffect(() => {
		if (!editor) return
		editor.setOptions({
			editorProps: {
				...editor.options.editorProps,
				attributes: {
					...editor.options.editorProps?.attributes,
					"aria-label": ariaLabel,
					class: `maui-editor-prose ${proseClassName}`,
				},
			},
		})
	}, [editor, ariaLabel, proseClassName])

	useEffect(() => {
		if (!editor) return
		const current = editor.getMarkdown()
		if (content === current) return
		editor.commands.setContent(content, { contentType: "markdown" })
	}, [editor, content])

	return (
		<EditorContent
			editor={editor}
			className={cls(surfaceClassName, className)}
		/>
	)
}

const editorClass = style({
	minWidth: 0,
	width: "100%",
	"& .ProseMirror": {
		outline: "none",
		minHeight: "2.75em",
	},
	"& .ProseMirror p.is-editor-empty:first-child::before": {
		color: colors.gray[9],
		content: "attr(data-placeholder)",
		float: "left",
		height: 0,
		pointerEvents: "none",
	},
})
