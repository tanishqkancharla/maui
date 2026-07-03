import type React from "react"
import { style, useStyles } from "purse-styles"
import { flex, flexItem } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

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
	email?: string
	timestamp: string
	edited?: boolean
	avatar?: string
	children: React.ReactNode
	className?: string
}

export function Message({
	sender,
	email,
	timestamp,
	edited,
	avatar,
	children,
	className,
}: MessageProps) {
	const messageClassName = useStyles(messageClass)
	const avatarClassName = useStyles(avatarClass(sender))
	const headerClassName = useStyles(messageHeaderClass)
	const senderClassName = useStyles(senderNameClass)
	const metaClassName = useStyles(messageMetaClass)
	const bodyClassName = useStyles(messageBodyClass)
	const editedClassName = useStyles(editedLabelClass)

	return (
		<article className={joinClassNames(messageClassName, className)}>
			<div className={avatarClassName} aria-hidden="true">
				{avatar ?? initials(sender)}
			</div>

			<div className={flexItem({ size: "fill" })}>
				<header className={headerClassName}>
					<span className={senderClassName}>{sender}</span>
					{email ? <span className={metaClassName}>&lt;{email}&gt;</span> : null}
					<time className={metaClassName} dateTime={timestamp}>
						{timestamp}
					</time>
					{edited ? <span className={editedClassName}>(edited)</span> : null}
				</header>

				<div className={bodyClassName}>{children}</div>
			</div>
		</article>
	)
}

type MessageAttachmentProps = {
	title: string
	description?: string
	meta?: string
}

export function MessageAttachment({
	title,
	description,
	meta,
}: MessageAttachmentProps) {
	const cardClassName = useStyles(attachmentClass)
	const titleClassName = useStyles(attachmentTitleClass)
	const descriptionClassName = useStyles(attachmentDescriptionClass)
	const metaClassName = useStyles(attachmentMetaClass)

	return (
		<aside className={cardClassName}>
			<div className={titleClassName}>{title}</div>
			{description ? (
				<div className={descriptionClassName}>{description}</div>
			) : null}
			{meta ? <div className={metaClassName}>{meta}</div> : null}
		</aside>
	)
}

const emailThreadMessages = [
	{
		sender: "Maya Chen",
		email: "maya.chen@northwind.io",
		timestamp: "Jul 1, 9:14 AM",
		body: (
			<>
				<p>Hi team,</p>
				<p>
					I've attached the draft Q3 roadmap for review. The main themes are
					platform reliability, onboarding improvements, and the new billing
					workflow. Please leave comments inline by Friday so we can lock scope
					for the sprint planning session next week.
				</p>
				<p>Thanks,</p>
				<p>Maya</p>
			</>
		),
	},
	{
		sender: "James Ortiz",
		email: "james.ortiz@northwind.io",
		timestamp: "Jul 1, 11:02 AM",
		body: (
			<>
				<p>Thanks Maya — this looks solid overall.</p>
				<p>
					One concern on the migration timeline: can we push the auth rework to
					August? The SSO changes are still blocked on the vendor sandbox, and
					I'd rather not commit eng capacity until that's unblocked.
				</p>
				<p>— James</p>
			</>
		),
	},
	{
		sender: "Priya Sharma",
		email: "priya.sharma@northwind.io",
		timestamp: "Jul 1, 2:37 PM",
		edited: true,
		body: (
			<>
				<p>+1 on deferring auth. I'll update the timeline section and add a note
				about the vendor dependency.</p>
				<p>
					Also dropped a revised version of the roadmap doc with the August
					slide and a clearer cut line for v1 vs. stretch goals.
				</p>
				<MessageAttachment
					title="Q3 Product Roadmap — Draft v2"
					description="Platform reliability, onboarding, billing workflow, and revised auth timeline."
					meta="Google Docs · Updated 20 minutes ago"
				/>
			</>
		),
	},
	{
		sender: "Maya Chen",
		email: "maya.chen@northwind.io",
		timestamp: "Jul 1, 3:05 PM",
		body: (
			<p>
				Perfect — I'll circulate this version to leadership and use it as the
				agenda doc for Monday's planning meeting.
			</p>
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
					email={message.email}
					timestamp={message.timestamp}
					edited={"edited" in message ? message.edited : undefined}
				>
					{message.body}
				</Message>
			))}
		</MessageList>
	)
}

const avatarPalette = [
	{ background: "var(--accent-4)", color: "var(--accent-11)" },
	{ background: "hsl(160, 35%, 22%)", color: "hsl(160, 60%, 78%)" },
	{ background: "hsl(24, 40%, 22%)", color: "hsl(24, 80%, 78%)" },
	{ background: "hsl(320, 30%, 22%)", color: "hsl(320, 70%, 80%)" },
] as const

function initials(name: string) {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("")
}

function avatarColorIndex(seed: string) {
	let hash = 0
	for (let index = 0; index < seed.length; index += 1) {
		hash = seed.charCodeAt(index) + ((hash << 5) - hash)
	}
	return Math.abs(hash) % avatarPalette.length
}

const avatarClass = memoize((seed: string) => {
	const palette = avatarPalette[avatarColorIndex(seed)]

	return style(
		text("xs", 600, "highContrast"),
		radius.circle,
		{
			display: "grid",
			placeItems: "center",
			flexShrink: 0,
			width: "40px",
			height: "40px",
			backgroundColor: palette.background,
			color: palette.color,
		},
	)
})

const messageListClass = style(
	flex({ direction: "column", gap: 8 }),
	{
		maxWidth: "760px",
	}
)

const messageClass = style(
	flex({ align: "start", gap: 4 }),
	spacing.padding({ y: 2 }),
	{
		minWidth: 0,
	}
)

const messageHeaderClass = style(
	flex({ align: "baseline", gap: 2, wrap: true }),
	{
		marginBottom: "2px",
	}
)

const senderNameClass = style(text("sm", 600, "highContrast"))

const messageMetaClass = style(text("xs", 400, "lowContrast"))

const editedLabelClass = style(text("xs", 400, "lowContrast"), {
	fontStyle: "italic",
})

const messageBodyClass = style(
	text("sm", 400, "highContrast"),
	{
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		minWidth: 0,
		"& p": {
			margin: 0,
		},
	}
)

const attachmentClass = style(
	radius.lg,
	spacing.padding({ all: 4 }),
	{
		marginTop: "4px",
		maxWidth: "480px",
		border: "1px solid var(--sand-6)",
		backgroundColor: "var(--sand-2)",
	}
)

const attachmentTitleClass = style(text("md", 600, "highContrast"), {
	marginBottom: "4px",
})

const attachmentDescriptionClass = style(text("sm", 400, "lowContrast"), {
	marginBottom: "6px",
})

const attachmentMetaClass = style(text("xs", 400, "lowContrast"))

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
