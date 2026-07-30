import { useEffect, useRef, useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../../components/Button"
import { Avatar } from "../../components/Avatar"
import { Loader } from "../../patterns/Loader"
import { AssistantMessage } from "../../patterns/AssistantMessage"
import { Editor } from "../../patterns/Editor"
import { border } from "../../tokens/borders"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
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
) {
	let index = 0
	const tick = () => {
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

	let timeoutId = window.setTimeout(tick, 40)
	return () => window.clearTimeout(timeoutId)
}

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
	const rowClassName = useStyles(rowClass)
	const metaClassName = useStyles(metaClass)
	const userBubbleClassName = useStyles(userBubbleClass)
	const composerClassName = useStyles(composerClass)
	const composerActionsClassName = useStyles(composerActionsClass)
	const hintClassName = useStyles(hintClass)

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
						<div key={message.id} className={rowClassName}>
							<Avatar name="You" size="sm" />
							<div>
								<div className={metaClassName}>You</div>
								<div className={userBubbleClassName}>{message.content}</div>
							</div>
						</div>
					) : (
						<div key={message.id} className={rowClassName}>
							<Avatar name="Maui" size="sm" />
							<div>
								<div className={metaClassName}>
									Assistant
									{message.streaming ? (
										<>
											{" "}
											<Loader
												size="0.75em"
												variant="muted"
												aria-label="Generating"
											/>
										</>
									) : null}
								</div>
								{message.content ? (
									<AssistantMessage isAnimating={Boolean(message.streaming)}>
										{message.content}
									</AssistantMessage>
								) : (
									<span className={hintClassName}>Thinking…</span>
								)}
							</div>
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
				/>
				<div className={composerActionsClassName}>
					<span className={hintClassName}>⌘/Ctrl+Enter to send</span>
					<Button
						onClick={send}
						disabled={streaming || !draft.trim()}
					>
						{streaming ? "Streaming…" : "Send"}
					</Button>
				</div>
			</div>
		</div>
	)
}

const shellClass = style(
	border([], "outline"),
	radius.lg,
	{
		display: "flex",
		flexDirection: "column",
		minHeight: "560px",
		maxHeight: "720px",
		overflow: "hidden",
		backgroundColor: colors.gray[1],
	},
)

const feedClass = style(
	spacing.padding({ x: 8, y: 6 }),
	flex({ direction: "column", gap: 8 }),
	{
		flex: 1,
		minHeight: 0,
		overflowY: "auto",
	},
)

const rowClass = style(flex({ align: "start", gap: 4 }), {
	minWidth: 0,
})

const metaClass = style(
	text("xs", 500, "lowContrast"),
	flex({ align: "center", gap: 2 }),
	{
		marginBottom: "6px",
	},
)

const userBubbleClass = style(
	text("md", 400, "highContrast"),
	radius.md,
	spacing.padding({ x: 6, y: 4 }),
	{
		backgroundColor: colors.gray[3],
		whiteSpace: "pre-wrap",
		maxWidth: "64ch",
	},
)

const composerClass = style(
	border(["top"], "border"),
	spacing.padding({ x: 6, y: 4 }),
	flex({ direction: "column", gap: 4 }),
	{
		backgroundColor: colors.gray[2],
	},
)

const composerActionsClass = style(flex({ align: "center", justify: "between" }))

const hintClass = style(text("xs", 400, "lowContrast"))
