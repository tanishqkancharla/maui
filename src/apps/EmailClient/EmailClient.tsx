import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { H2 } from "../../components/Typography"
import { InboxMultiLine } from "../../patterns/Inbox"
import { Message, MessageList } from "../../patterns/MessageList"
import { background, backgroundColor } from "../../tokens/background"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
import { shadow } from "../../tokens/shadow"
import { spacing } from "../../tokens/spacing"
import { text } from "../../tokens/text"
import { emailInbox, emailThreads, getThreadMessages } from "./data"

export function EmailClient() {
	const [selectedThreadId, setSelectedThreadId] = useState(emailInbox[0].id)
	const selectedThread = emailInbox.find((thread) => thread.id === selectedThreadId)
	const messages = getThreadMessages(selectedThreadId)

	const shellClassName = useStyles(shellClass)
	const inboxPaneClassName = useStyles(inboxPaneClass)
	const inboxListClassName = useStyles(inboxListClass)
	const inboxListResetClassName = useStyles(inboxListResetClass)
	const readingPaneClassName = useStyles(readingPaneClass)
	const inboxHeaderClassName = useStyles(inboxHeaderClass)
	const threadHeaderClassName = useStyles(threadHeaderClass)
	const emptyStateClassName = useStyles(emptyStateClass)

	return (
		<div className={shellClassName}>
			<section className={inboxPaneClassName} aria-label="Inbox">
				<header className={inboxHeaderClassName}>
					<H2>Inbox</H2>
				</header>

				<div className={inboxListClassName}>
					<InboxMultiLine
						threads={emailThreads}
						selectedId={selectedThreadId}
						onSelectThread={setSelectedThreadId}
						className={inboxListResetClassName}
					/>
				</div>
			</section>

			<section className={readingPaneClassName} aria-label="Message thread">
				{selectedThread ? (
					<>
						<header className={threadHeaderClassName}>
							<H2>{selectedThread.subject}</H2>
						</header>

						<MessageList aria-label={`${selectedThread.subject} thread`}>
							{messages.map((message) => (
								<Message
									key={message.id}
									sender={message.sender}
									timestamp={message.timestamp}
									edited={message.edited}
								>
									{message.body}
								</Message>
							))}
						</MessageList>
					</>
				) : (
					<p className={emptyStateClassName}>Select a thread to read messages.</p>
				)}
			</section>
		</div>
	)
}

const shellClass = style(radius.lg, shadow.subtle, {
	display: "grid",
	gridTemplateColumns: "minmax(320px, 38%) minmax(0, 1fr)",
	minHeight: "640px",
	overflow: "hidden",
	backgroundColor: backgroundColor.app,
})

const inboxPaneClass = style(background.element, shadow.subtle, {
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	minWidth: 0,
	minHeight: 0,
	position: "relative",
	zIndex: 1,
})

const inboxListClass = style(spacing.padding({ x: 4 }), {
	flex: 1,
	minHeight: 0,
	overflowY: "auto",
})

const inboxListResetClass = style({
	marginTop: 0,
})

const readingPaneClass = style(
	spacing.padding({ x: 8, y: 6 }),
	flex({ direction: "column", gap: 6 }),
	{
		minWidth: 0,
		minHeight: 0,
		overflowY: "auto",
	},
)

const inboxHeaderClass = style(spacing.padding({ x: 4, y: 4 }))

const threadHeaderClass = style({
	minWidth: 0,
})

const emptyStateClass = style(text("md", 400, "lowContrast"), {
	margin: 0,
})
