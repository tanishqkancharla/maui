import { useEffect, useRef, useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../../components/Button"
import { Loader } from "../../patterns/Loader"
import { AssistantMessage } from "../../patterns/AssistantMessage"
import { Editor } from "../../patterns/Editor"
import { backgroundColor } from "../../tokens/background"
import { border } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
import { shadow } from "../../tokens/shadow"
import { spacing } from "../../tokens/spacing"
import { text } from "../../tokens/text"

type ChatMessage =
	| { id: string; role: "user"; content: string }
	| { id: string; role: "assistant"; content: string; streaming?: boolean }

const welcomeMarkdown = `## Hello

I'm a **mock** assistant — replies are canned and streamed locally so you can
try TipTap + Streamdown together.

Ask about Maui patterns, or just say hi.`

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

function streamText(
	full: string,
	onChunk: (text: string) => void,
	onDone: () => void,
	options?: { delayMs?: number },
) {
	let index = 0
	let timeoutId = 0
	let cancelled = false
	const delayMs = options?.delayMs ?? 0

	const tick = () => {
		if (cancelled) return
		// Variable-sized chunks feel more like token streaming than char-by-char.
		const step = 2 + Math.floor(Math.random() * 6)
		index = Math.min(full.length, index + step)
		onChunk(full.slice(0, index))
		if (index >= full.length) {
			onDone()
			return
		}
		timeoutId = window.setTimeout(tick, 16 + Math.floor(Math.random() * 28))
	}

	timeoutId = window.setTimeout(tick, delayMs)
	return () => {
		cancelled = true
		window.clearTimeout(timeoutId)
	}
}

const THINKING_DELAY_MS = 3000

/**
 * Mock AI chat composed from the Editor and AssistantMessage patterns.
 * Submitting a message streams a canned markdown reply through Streamdown.
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
	const userRowClassName = useStyles(userRowClass)
	const userBubbleClassName = useStyles(userBubbleClass)
	const composerClassName = useStyles(composerClass)
	const composerEditorClassName = useStyles(composerEditorClass)
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

		setDraft("")
		setStreaming(true)
		setMessages((prev) => [
			...prev,
			{ id: userId, role: "user", content: prompt },
			{ id: assistantId, role: "assistant", content: "", streaming: true },
		])

		cancelStreamRef.current = streamText(
			fullReply,
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
						<Button onClick={send} disabled={streaming || !draft.trim()}>
							{streaming ? "Streaming…" : "Send"}
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
	backgroundColor: colors.gray[1],
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

const composerClass = style(spacing.padding({ x: 6, y: 4 }), {
	backgroundColor: "transparent",
})

const composerEditorClass = style({
	maxWidth: "none",
	width: "100%",
})

const thinkingClass = style(
	text("xs", 400, "lowContrast"),
	flex({ align: "center", gap: 4 }),
)
