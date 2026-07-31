import type React from "react"
import type { Components } from "streamdown"
import { Streamdown, useIsCodeFenceIncomplete } from "streamdown"
import { code } from "@streamdown/code"
import { style, useStyles } from "purse-styles"
import { CodeBlock } from "../components/CodeBlock"
import { proseMaxWidth } from "../components/Prose"
import { backgroundColor } from "../tokens/background"
import { proseHtml, proseStreamingMarkers, type ProseSize } from "../tokens/prose"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { isSupportedCodeLang } from "../utils/shiki"
import "streamdown/styles.css"

type AssistantMessageProps = {
	children: string
	/** When true, Streamdown treats the markdown as actively streaming. */
	isAnimating?: boolean
	size?: ProseSize
	className?: string
}

function extractText(node: React.ReactNode): string {
	if (node == null || typeof node === "boolean") return ""
	if (typeof node === "string" || typeof node === "number") return String(node)
	if (Array.isArray(node)) return node.map(extractText).join("")
	if (typeof node === "object" && "props" in node) {
		return extractText(
			(node as React.ReactElement<{ children?: React.ReactNode }>).props
				.children,
		)
	}
	return ""
}

function MauiFencedCode({
	className,
	children,
	node: _node,
	...props
}: React.ComponentPropsWithoutRef<"code"> & { node?: unknown }) {
	const isIncomplete = useIsCodeFenceIncomplete()
	const pendingClassName = useStyles(pendingCodeShellClass)
	const language = /language-([\w-]+)/.exec(className ?? "")?.[1] ?? "text"
	const text = extractText(children).replace(/\n$/, "")

	// While the fence is still open, keep plain text so Streamdown can keep
	// updating without remounting a highlighter on every chunk.
	if (isIncomplete || !isSupportedCodeLang(language)) {
		return (
			<pre className={pendingClassName}>
				<code className={className} {...props}>
					{text}
				</code>
			</pre>
		)
	}

	return <CodeBlock lang={language}>{text}</CodeBlock>
}

/**
 * Plain element overrides so Streamdown's Tailwind utility classes are not
 * required — Maui `proseHtml` styles the tree instead. Drop incoming
 * `className` (Streamdown's `list-inside` / spacing utilities) so markers and
 * gaps stay under Maui control. Keep `children` intact for animate spans.
 */
const streamdownComponents: Components = {
	h1: ({ node: _node, className: _className, ...props }) => <h1 {...props} />,
	h2: ({ node: _node, className: _className, ...props }) => <h2 {...props} />,
	h3: ({ node: _node, className: _className, ...props }) => <h3 {...props} />,
	h4: ({ node: _node, className: _className, ...props }) => <h4 {...props} />,
	p: ({ node: _node, className: _className, ...props }) => <p {...props} />,
	ul: ({ node: _node, className: _className, ...props }) => <ul {...props} />,
	ol: ({ node: _node, className: _className, ...props }) => <ol {...props} />,
	li: ({ node: _node, className: _className, ...props }) => <li {...props} />,
	a: ({ node: _node, className: _className, ...props }) => <a {...props} />,
	blockquote: ({ node: _node, className: _className, ...props }) => (
		<blockquote {...props} />
	),
	strong: ({ node: _node, className: _className, ...props }) => (
		<strong {...props} />
	),
	em: ({ node: _node, className: _className, ...props }) => <em {...props} />,
	hr: ({ node: _node, className: _className, ...props }) => <hr {...props} />,
	inlineCode: ({ node: _node, className: _className, children, ...props }) => (
		<code {...props}>{children}</code>
	),
	code: MauiFencedCode,
}

/**
 * Streaming-friendly assistant message. Renders markdown with Streamdown and
 * Maui prose type styles (same reading scale as `Prose`).
 */
export function AssistantMessage({
	children,
	isAnimating = false,
	size = "md",
	className,
}: AssistantMessageProps) {
	const rootClassName = useStyles(assistantMessageClass)
	const streamdownClassName = useStyles(
		proseHtml(size),
		streamdownRootClass,
		isAnimating ? proseStreamingMarkers : undefined,
	)

	return (
		<div
			className={joinClassNames(rootClassName, className)}
			aria-live={isAnimating ? "polite" : undefined}
			aria-busy={isAnimating || undefined}
		>
			<Streamdown
				className={streamdownClassName}
				components={streamdownComponents}
				plugins={{ code }}
				// `animated` must stay stably enabled; only `isAnimating` toggles.
				// Flipping `animated`/`mode` with the stream resets stagger state and
				// makes new blocks (blockquotes, lists) pop in out of order.
				animated
				isAnimating={isAnimating}
				mode="streaming"
				controls={false}
				lineNumbers={false}
			>
				{children}
			</Streamdown>
		</div>
	)
}

const sampleMarkdown = `# Shipping notes

Here's a concise plan for the **AI streaming** pattern:

1. TipTap editor with markdown shortcuts
2. Streamdown for incomplete assistant markdown
3. Shared prose type styles on both surfaces

> Incomplete fences and emphasis stay readable while tokens arrive.

\`\`\`ts
function greet(name: string) {
  return \`Hello, \${name}\`
}
\`\`\`
`

/** Static demo of an assistant reply with prose + code. */
export function AssistantMessageDemo() {
	return <AssistantMessage>{sampleMarkdown}</AssistantMessage>
}

const assistantMessageClass = style({
	maxWidth: proseMaxWidth,
	minWidth: 0,
})

// Drop Streamdown's Tailwind `space-y-*` dependency; Maui `proseHtml` owns gaps.
const streamdownRootClass = style({
	display: "flex",
	flexDirection: "column",
	whiteSpace: "normal",
	// Whitespace-only Streamdown blocks can show up as empty nodes; don't let
	// them create extra flex gaps.
	"& > :empty": {
		display: "none",
	},
})

const pendingCodeShellClass = style(radius.md, shadow.subtle, {
	backgroundColor: backgroundColor.app,
	margin: 0,
	overflowX: "auto",
	padding: "12px",
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
