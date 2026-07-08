import type React from "react"
import { style, useStyles } from "purse-styles"
import { Avatar } from "../components/Avatar"
import { P } from "../components/Typography"
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadowTokens } from "../tokens/shadows"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

type MessageListProps = React.ComponentPropsWithoutRef<"div"> & {
	"aria-label"?: string
}

export function MessageList({
	className,
	children,
	"aria-label": ariaLabel = "Message thread",
	...props
}: MessageListProps) {
	const listClassName = useStyles(messageListClass)

	return (
		<div
			{...props}
			className={joinClassNames(listClassName, className)}
			role="feed"
			aria-label={ariaLabel}
		>
			{children}
		</div>
	)
}

type MessageProps = {
	sender: string
	timestamp: string
	edited?: boolean
	children: React.ReactNode
	className?: string
}

export function Message({
	sender,
	timestamp,
	edited,
	children,
	className,
}: MessageProps) {
	const messageClassName = useStyles(messageClass)
	const headerClassName = useStyles(messageHeaderClass)
	const senderClassName = useStyles(senderNameClass)
	const metaClassName = useStyles(messageMetaClass)
	const bodyClassName = useStyles(messageBodyClass)
	const editedClassName = useStyles(editedLabelClass)

	return (
		<article className={joinClassNames(messageClassName, className)}>
			<header className={headerClassName}>
				<Avatar name={sender} size="sm" />
				<span className={senderClassName}>{sender}</span>
				<time className={metaClassName} dateTime={timestamp}>
					{timestamp}
				</time>
				{edited ? <span className={editedClassName}>(edited)</span> : null}
			</header>

			<div className={bodyClassName}>{children}</div>
		</article>
	)
}

const emailThreadMessages = [
	{
		sender: "Maya Chen",
		timestamp: "Jul 1",
		body: (
			<>
				<P>Hi team,</P>
				<P>
					I've attached the draft Q3 roadmap for review. The main themes are
					platform reliability, onboarding improvements, and the new billing
					workflow. Please leave comments inline by Friday so we can lock scope
					for the sprint planning session next week.
				</P>
				<P>Thanks,</P>
				<P>Maya</P>
			</>
		),
	},
	{
		sender: "James Ortiz",
		timestamp: "Jul 1",
		body: (
			<>
				<P>Thanks Maya — this looks solid overall.</P>
				<P>
					One concern on the migration timeline: can we push the auth rework to
					August? The SSO changes are still blocked on the vendor sandbox, and
					I'd rather not commit eng capacity until that's unblocked.
				</P>
				<P>— James</P>
			</>
		),
	},
	{
		sender: "Priya Sharma",
		timestamp: "Jul 1",
		edited: true,
		body: (
			<>
				<P>
					+1 on deferring auth. I'll update the timeline section and add a note
					about the vendor dependency.
				</P>
				<P>
					Also dropped a revised version of the roadmap doc with the August
					slide and a clearer cut line for v1 vs. stretch goals.
				</P>
			</>
		),
	},
	{
		sender: "Maya Chen",
		timestamp: "Jul 1",
		body: (
			<P>
				Perfect — I'll circulate this version to leadership and use it as the
				agenda doc for Monday's planning meeting.
			</P>
		),
	},
] as const

export function EmailMessageThread() {
	return (
		<MessageList aria-label="Q3 product roadmap email thread">
			{emailThreadMessages.map((message) => (
				<Message
					key={`${message.sender}-${message.timestamp}`}
					sender={message.sender}
					timestamp={message.timestamp}
					edited={"edited" in message ? message.edited : undefined}
				>
					{message.body}
				</Message>
			))}
		</MessageList>
	)
}

const messageListClass = style(
	flex({ direction: "column", gap: 6 }),
	{
		maxWidth: "760px",
	}
)

const messageClass = style(
	radius.lg,
	shadowTokens.minimalFlat,
	spacing.padding({ all: 8 }),
	{
		backgroundColor: "var(--sand-2)",
		minWidth: 0,
	}
)

const messageHeaderClass = style(
	flex({ align: "center", gap: 2, wrap: true }),
	{
		marginBottom: "8px",
	}
)

const senderNameClass = style(text("sm", 500, "highContrast"))

const messageMetaClass = style(text("xs", 400, "lowContrast"), {
	marginLeft: "2px",
})

const editedLabelClass = style(text("xs", 400, "lowContrast"), {
	fontStyle: "italic",
})

const messageBodyClass = style(
	text("md", 400, "highContrast"),
	{
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		minWidth: 0,
	}
)

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
