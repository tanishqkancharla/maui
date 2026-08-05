import { useEffect, useRef, useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../../components/Button"
import { Icons } from "../../components/Icons"
import { Loader } from "../../patterns/Loader"
import { AssistantMessage } from "../../patterns/AssistantMessage"
import { Editor } from "../../patterns/Editor"
import { backgroundColor } from "../../tokens/background"
import { border } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
import { shadow, shadowVars } from "../../tokens/shadow"
import { icon } from "../../tokens/sizing"
import { spacing } from "../../tokens/spacing"
import { monospace, text } from "../../tokens/text"

type ToolCall =
	| { id: string; kind: "read"; path: string }
	| { id: string; kind: "wrote"; path: string }
	| { id: string; kind: "shell"; command: string }

type ChatMessage =
	| { id: string; role: "user"; content: string }
	| {
			id: string
			role: "assistant"
			content: string
			toolCalls?: ToolCall[]
			streaming?: boolean
	  }

const welcomeMarkdown = `## Hello

I'm a **mock** assistant — replies are canned and streamed locally so you can
try TipTap + Streamdown together.

Ask about Maui patterns, or just say hi.`

const toolCallsFor = (prompt: string): ToolCall[] => {
	const slug = prompt
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 24)

	return [
		{ id: "read-editor", kind: "read", path: "Editor.tsx" },
		{ id: "read-assistant", kind: "read", path: "AssistantMessage.tsx" },
		{ id: "shell-tsc", kind: "shell", command: "npx tsc --noEmit" },
		{
			id: "wrote-aichat",
			kind: "wrote",
			path: `${slug || "reply"}.tsx`,
		},
	]
}

const replyFor = (prompt: string) => {
	const trimmed = prompt.trim()
	const topic = trimmed.length > 80 ? `${trimmed.slice(0, 77)}…` : trimmed

	return `### Re: ${topic || "your note"}

Here's a short sketch based on what you wrote:

1. Keep the **editor** on markdown — shortcuts stay close to how people type
2. Render the assistant with Streamdown so incomplete fences don't break layout
3. Share Maui \`prose\` styles so both surfaces read as one composition

\`\`\`ts
type Turn = {
  role: "user" | "assistant"
  markdown: string
}
\`\`\`

> This reply is mocked — no model is called.
`
}

function streamAssistantTurn(
	toolCalls: ToolCall[],
	markdown: string,
	onToolCalls: (calls: ToolCall[]) => void,
	onChunk: (text: string) => void,
	onDone: () => void,
	options?: { delayMs?: number; toolGapMs?: number },
) {
	let timeoutId = 0
	let cancelled = false
	const delayMs = options?.delayMs ?? 0
	const toolGapMs = options?.toolGapMs ?? 420
	let toolIndex = 0
	let textIndex = 0

	const tickText = () => {
		if (cancelled) return
		const step = 2 + Math.floor(Math.random() * 6)
		textIndex = Math.min(markdown.length, textIndex + step)
		onChunk(markdown.slice(0, textIndex))
		if (textIndex >= markdown.length) {
			onDone()
			return
		}
		timeoutId = window.setTimeout(
			tickText,
			16 + Math.floor(Math.random() * 28),
		)
	}

	const tickTools = () => {
		if (cancelled) return
		toolIndex += 1
		onToolCalls(toolCalls.slice(0, toolIndex))
		if (toolIndex >= toolCalls.length) {
			timeoutId = window.setTimeout(tickText, 180)
			return
		}
		timeoutId = window.setTimeout(tickTools, toolGapMs)
	}

	timeoutId = window.setTimeout(() => {
		if (toolCalls.length === 0) {
			tickText()
			return
		}
		tickTools()
	}, delayMs)

	return () => {
		cancelled = true
		window.clearTimeout(timeoutId)
	}
}

const THINKING_DELAY_MS = 3000

/**
 * Mock AI chat composed from the Editor and AssistantMessage patterns.
 * Submitting a message streams tool calls, then a canned markdown reply.
 */
export function AiChat() {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{ id: "welcome", role: "assistant", content: welcomeMarkdown },
	])
	const [draft, setDraft] = useState("")
	const [streaming, setStreaming] = useState(false)
	const cancelStreamRef = useRef<(() => void) | null>(null)
	const feedRef = useRef<HTMLDivElement>(null)

	const shellClassName = useStyles(shellClass)
	const feedClassName = useStyles(feedClass)
	const assistantRowClassName = useStyles(assistantRowClass)
	const assistantMessageClassName = useStyles(assistantMessageClass)
	const toolCallsClassName = useStyles(toolCallsClass)
	const toolCallClassName = useStyles(toolCallClass)
	const toolShellClassName = useStyles(toolShellClass)
	const userRowClassName = useStyles(userRowClass)
	const userBubbleClassName = useStyles(userBubbleClass)
	const composerClassName = useStyles(composerClass)
	const composerEditorClassName = useStyles(composerEditorClass)
	const sendButtonClassName = useStyles(sendButtonClass)
	const sendIconClassName = useStyles(icon("sm"))
	const thinkingClassName = useStyles(thinkingClass)

	useEffect(() => {
		return () => cancelStreamRef.current?.()
	}, [])

	useEffect(() => {
		const el = feedRef.current
		if (!el) return
		el.scrollTop = el.scrollHeight
	}, [messages])

	const send = () => {
		const prompt = draft.trim()
		if (!prompt || streaming) return

		cancelStreamRef.current?.()

		const userId = `user-${Date.now()}`
		const assistantId = `assistant-${Date.now()}`
		const fullReply = replyFor(prompt)
		const plannedTools = toolCallsFor(prompt)

		setDraft("")
		setStreaming(true)
		setMessages((prev) => [
			...prev,
			{ id: userId, role: "user", content: prompt },
			{
				id: assistantId,
				role: "assistant",
				content: "",
				toolCalls: [],
				streaming: true,
			},
		])

		cancelStreamRef.current = streamAssistantTurn(
			plannedTools,
			fullReply,
			(toolCalls) => {
				setMessages((prev) =>
					prev.map((message) =>
						message.id === assistantId
							? { ...message, toolCalls, streaming: true }
							: message,
					),
				)
			},
			(text) => {
				setMessages((prev) =>
					prev.map((message) =>
						message.id === assistantId
							? { ...message, content: text, streaming: true }
							: message,
					),
				)
			},
			() => {
				setStreaming(false)
				setMessages((prev) =>
					prev.map((message) =>
						message.id === assistantId
							? { ...message, streaming: false }
							: message,
					),
				)
				cancelStreamRef.current = null
			},
			{ delayMs: THINKING_DELAY_MS },
		)
	}

	return (
		<div className={shellClassName}>
			<div
				ref={feedRef}
				className={feedClassName}
				role="log"
				aria-label="Conversation"
				aria-relevant="additions"
			>
				{messages.map((message) =>
					message.role === "user" ? (
						<div key={message.id} className={userRowClassName}>
							<div className={userBubbleClassName}>{message.content}</div>
						</div>
					) : (
						<div key={message.id} className={assistantRowClassName}>
							{message.toolCalls && message.toolCalls.length > 0 ? (
								<div className={toolCallsClassName} aria-label="Tool calls">
									{message.toolCalls.map((call) => (
										<div key={call.id} className={toolCallClassName}>
											{call.kind === "read" ? (
												<>Read {call.path}</>
											) : call.kind === "wrote" ? (
												<>Wrote {call.path}</>
											) : (
												<>
													{"$ "}
													<span className={toolShellClassName}>
														{call.command}
													</span>
												</>
											)}
										</div>
									))}
								</div>
							) : null}
							{message.content ? (
								<AssistantMessage
									size="sm"
									className={assistantMessageClassName}
									isAnimating={Boolean(message.streaming)}
								>
									{message.content}
								</AssistantMessage>
							) : null}
							{message.streaming ? (
								<span className={thinkingClassName}>
									<Loader
										size="0.75em"
										variant="muted"
										aria-label="Thinking"
									/>
									Thinking
								</span>
							) : null}
						</div>
					),
				)}
			</div>

			<div className={composerClassName}>
				<Editor
					content={draft}
					onChange={setDraft}
					onSubmit={send}
					editable={!streaming}
					placeholder="Message the assistant…"
					aria-label="Compose message"
					size="sm"
					className={composerEditorClassName}
					actions={
						<Button
							aria-label={streaming ? "Streaming" : "Send"}
							className={sendButtonClassName}
							disabled={streaming || !draft.trim()}
							onClick={send}
						>
							<Icons.ArrowUp className={sendIconClassName} />
						</Button>
					}
				/>
			</div>
		</div>
	)
}

const shellClass = style(border([], "outline"), radius.lg, {
	display: "flex",
	flexDirection: "column",
	minHeight: "560px",
	maxHeight: "720px",
	overflow: "hidden",
})

const feedClass = style(
	spacing.padding({ x: 8, y: 6 }),
	flex({ direction: "column", gap: 6 }),
	{
		flex: 1,
		minHeight: 0,
		overflowY: "auto",
	},
)

const assistantRowClass = style(flex({ direction: "column", gap: 3 }), {
	minWidth: 0,
	width: "100%",
	alignSelf: "stretch",
})

const assistantMessageClass = style({
	maxWidth: "none",
	width: "100%",
})

const toolCallsClass = style(flex({ direction: "column", gap: 2 }), {
	minWidth: 0,
})

const toolCallClass = style(text("xs", 400, "lowContrast"), {
	minWidth: 0,
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const toolShellClass = style(monospace)

const userRowClass = style(flex({ justify: "end" }), {
	minWidth: 0,
	alignSelf: "stretch",
})

const userBubbleClass = style(
	text("md", 400, "highContrast"),
	radius.md,
	shadow.subtle,
	spacing.padding({ x: 4, y: 2 }),
	{
		backgroundColor: backgroundColor.app,
		whiteSpace: "pre-wrap",
		maxWidth: "80%",
	},
)

const composerClass = style(spacing.padding({ x: 6, top: 4, bottom: 6 }), {
	backgroundColor: "transparent",
})

const composerEditorClass = style({
	maxWidth: "none",
	width: "100%",
	// Keep the editor's subtle elevation on focus; drop the blue focus ring.
	"&:focus-within": {
		outline: "none",
		boxShadow: shadowVars.subtle,
		zIndex: "auto",
	},
})

/** Filled circular send control — icon-only Button without the default shadow. */
const sendButtonClass = style(radius.circle, {
	boxShadow: "none",
	// Editor shell is also `background.app` white; a light wash keeps the circle
	// readable once the default Button shadow is removed.
	backgroundColor: colors.gray[3],
	"&:hover": {
		backgroundColor: colors.gray[4],
	},
	"&:active": {
		backgroundColor: colors.gray[5],
	},
})

const thinkingClass = style(
	text("xs", 400, "lowContrast"),
	flex({ align: "center", gap: 4 }),
)
