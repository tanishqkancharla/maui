import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { H2, H3 } from "../../components/Typography"
import { InboxMultiLine } from "../../patterns/Inbox"
import { Message, MessageList } from "../../patterns/MessageList"
import { backgroundColor } from "../../tokens/background"
import { colors } from "../../tokens/colors"
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
	const inboxBrandClassName = useStyles(inboxBrandClass)
	const inboxMarkClassName = useStyles(inboxMarkClass)
	const inboxListClassName = useStyles(inboxListClass)
	const inboxListResetClassName = useStyles(inboxListResetClass)
	const readingPaneClassName = useStyles(readingPaneClass)
	const threadHeaderClassName = useStyles(threadHeaderClass)
	const emptyStateClassName = useStyles(emptyStateClass)

	return (
		<div className={shellClassName}>
			<section className={inboxPaneClassName} aria-label="Inbox">
				<header className={inboxBrandClassName}>
					<span className={inboxMarkClassName} aria-hidden="true" />
					<H3>Inbox</H3>
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
	gridTemplateColumns: "240px minmax(0, 1fr)",
	minHeight: "640px",
	overflow: "hidden",
	backgroundColor: backgroundColor.app,
})

const inboxPaneClass = style(
	flex({ direction: "column", gap: 8 }),
	spacing.padding({ all: 2 }),
	{
		minWidth: 0,
		minHeight: 0,
		overflow: "hidden",
	},
)

const inboxBrandClass = style(flex({ direction: "column", gap: 12 }), {
	paddingTop: spacing.value(6),
	paddingInline: spacing.value(4),
})

const inboxMarkClass = style({
	width: "10px",
	height: "10px",
	borderRadius: "999px",
	backgroundColor: colors.accent[9],
})

const inboxListClass = style({
	flex: 1,
	minHeight: 0,
	overflowY: "auto",
})

const inboxListResetClass = style({
	marginTop: 0,
})

const readingPaneClass = style(
	spacing.padding({ x: 16, y: 8 }),
	flex({ direction: "column", gap: 6 }),
	{
		minWidth: 0,
		minHeight: 0,
		overflowY: "auto",
	},
)

const threadHeaderClass = style({
	minWidth: 0,
})

const emptyStateClass = style(text("md", 400, "lowContrast"), {
	margin: 0,
})
