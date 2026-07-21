import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { H2 } from "../../components/Typography"
import { InboxMultiLine } from "../../patterns/Inbox"
import { Message, MessageList } from "../../patterns/MessageList"
import { colors } from "../../tokens/colors"
import { flex } from "../../tokens/layout"
import { radius } from "../../tokens/radius"
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
	const threadSubjectClassName = useStyles(threadSubjectClass)
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
							<h2 className={threadSubjectClassName}>{selectedThread.subject}</h2>
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

const shellClass = style(
	radius.lg,
	{
		display: "grid",
		gridTemplateColumns: "minmax(320px, 38%) minmax(0, 1fr)",
		gap: "1px",
		minHeight: "640px",
		overflow: "hidden",
		backgroundColor: colors.gray[4],
		border: `1px solid ${colors.gray[4]}`,
	}
)

const paneBaseClass = style({
	minWidth: 0,
	minHeight: 0,
	backgroundColor: colors.gray[1],
})

const inboxPaneClass = style(paneBaseClass, {
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
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
	paneBaseClass,
	spacing.padding({ x: 8, y: 6 }),
	flex({ direction: "column", gap: 6 }),
	{
		overflowY: "auto",
	}
)

const inboxHeaderClass = style(spacing.padding({ x: 4, y: 4 }))

const threadHeaderClass = style({
	minWidth: 0,
})

const threadSubjectClass = style(text("lg", 600, "highContrast"), {
	margin: 0,
})

const emptyStateClass = style(text("md", 400, "lowContrast"), {
	margin: 0,
})
