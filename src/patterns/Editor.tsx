import type React from "react"
import { useEffect } from "react"
import { Markdown } from "@tiptap/markdown"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { style, useStyles } from "purse-styles"
import { proseMaxWidth } from "../components/Prose"
import { useRefCurrent } from "../hooks/useRefCurrent"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { flex } from "../tokens/layout"
import { proseHtml, type ProseSize } from "../tokens/prose"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

type EditorProps = {
	/** Initial markdown content. Updates are applied when this value changes. */
	content?: string
	/** Called with the current markdown whenever the document changes. */
	onChange?: (markdown: string) => void
	placeholder?: string
	size?: ProseSize
	editable?: boolean
	className?: string
	"aria-label"?: string
	onSubmit?: () => void
	/** Optional actions rendered inside the editor shell (e.g. Send). */
	actions?: React.ReactNode
}

/**
 * TipTap markdown editor with CommonMark shortcuts (`#`, `**`, `-`, `>`, …)
 * and Maui prose type styles on the ProseMirror surface.
 */
export function Editor({
	content = "",
	onChange,
	placeholder = "Write a message…",
	size = "md",
	editable = true,
	className,
	"aria-label": ariaLabel = "Message editor",
	onSubmit,
	actions,
}: EditorProps) {
	const shellClassName = useStyles(editorShellClass)
	const actionsClassName = useStyles(editorActionsClass)
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
		<div className={joinClassNames(shellClassName, className)}>
			<EditorContent editor={editor} />
			{actions ? <div className={actionsClassName}>{actions}</div> : null}
		</div>
	)
}

/** Demo editor with starter markdown showcasing shortcuts. */
export function MarkdownEditorDemo() {
	const hintClassName = useStyles(hintClass)

	return (
		<div>
			<p className={hintClassName}>
				Try markdown shortcuts: <code>#</code> heading, <code>**</code> bold,{" "}
				<code>-</code> list, <code>&gt;</code> quote. ⌘/Ctrl+Enter submits in the
				chat app.
			</p>
			<Editor content={demoMarkdown} aria-label="Markdown editor demo" />
		</div>
	)
}

const demoMarkdown = `## Draft a reply

Type \`**bold**\` or start a line with \`-\` for a list.

- Ship the inbox pattern
- Wire TipTap markdown
- Stream the assistant reply
`

const editorShellClass = style(
	radius.lg,
	shadow.subtle,
	spacing.padding({ x: 6, y: 4 }),
	focusRing("&:focus-within", shadowVars.subtle),
	flex({ direction: "column", gap: 3 }),
	{
		backgroundColor: colors.gray[1],
		maxWidth: proseMaxWidth,
		minWidth: 0,
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
	},
)

const editorActionsClass = style(flex({ align: "center", justify: "end", gap: 3 }))

const hintClass = style(text("sm", 400, "lowContrast"), {
	margin: "0 0 12px",
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
