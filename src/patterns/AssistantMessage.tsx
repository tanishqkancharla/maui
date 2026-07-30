import type { Components } from "streamdown"
import { Streamdown } from "streamdown"
import { code } from "@streamdown/code"
import { style, useStyles } from "purse-styles"
import { CodeBlock } from "../components/CodeBlock"
import { proseMaxWidth } from "../components/Prose"
import { proseHtml, type ProseSize } from "../tokens/prose"
import { isSupportedCodeLang } from "../utils/shiki"
import "streamdown/styles.css"

type AssistantMessageProps = {
	children: string
	/** When true, Streamdown treats the markdown as actively streaming. */
	isAnimating?: boolean
	size?: ProseSize
	className?: string
}

/**
 * Plain element overrides so Streamdown's Tailwind utility classes are not
 * required — Maui `proseHtml` styles the tree instead.
 */
const streamdownComponents: Components = {
	h1: ({ node: _node, ...props }) => <h1 {...props} />,
	h2: ({ node: _node, ...props }) => <h2 {...props} />,
	h3: ({ node: _node, ...props }) => <h3 {...props} />,
	h4: ({ node: _node, ...props }) => <h4 {...props} />,
	p: ({ node: _node, ...props }) => <p {...props} />,
	ul: ({ node: _node, ...props }) => <ul {...props} />,
	ol: ({ node: _node, ...props }) => <ol {...props} />,
	li: ({ node: _node, ...props }) => <li {...props} />,
	a: ({ node: _node, ...props }) => <a {...props} />,
	blockquote: ({ node: _node, ...props }) => <blockquote {...props} />,
	strong: ({ node: _node, ...props }) => <strong {...props} />,
	em: ({ node: _node, ...props }) => <em {...props} />,
	hr: ({ node: _node, ...props }) => <hr {...props} />,
	inlineCode: ({ node: _node, children, ...props }) => (
		<code {...props}>{children}</code>
	),
	code: ({ className, children, node: _node, ...props }) => {
		const language = /language-([\w-]+)/.exec(className ?? "")?.[1] ?? "text"
		const text = String(children).replace(/\n$/, "")

		if (isSupportedCodeLang(language)) {
			return <CodeBlock lang={language}>{text}</CodeBlock>
		}

		return (
			<pre>
				<code className={className} {...props}>
					{children}
				</code>
			</pre>
		)
	},
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
	const rootClassName = useStyles(assistantMessageClass, proseHtml(size))

	return (
		<div
			className={joinClassNames(rootClassName, className)}
			aria-live={isAnimating ? "polite" : undefined}
			aria-busy={isAnimating || undefined}
		>
			<Streamdown
				components={streamdownComponents}
				plugins={{ code }}
				isAnimating={isAnimating}
				animated={isAnimating}
				mode={isAnimating ? "streaming" : "static"}
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
	// Streamdown's root uses Tailwind `space-y-*` which we don't ship; apply
	// rhythm to its direct children instead.
	"& > div > * + *": {
		marginTop: "1.25em",
	},
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
