import type React from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Archive, Clock, Envelope, Star, Trash } from "../icons"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { flex, flexItem } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type EmailThread = {
	id: string
	senders: string
	subject: string
	snippet: string
	time: string
	unread?: boolean
}

type InboxProps = {
	threads?: EmailThread[]
	selectedId?: string
	onSelectThread?: (id: string) => void
	className?: string
}

const defaultEmailThreads: EmailThread[] = [
	{
		id: "canopy-receipt",
		senders: "billing@canopy.space",
		subject: "Michael Kronovet Customer Receipt/Purchase Confirmation",
		snippet:
			"06/30/26 Dear Michael, Thank you for being a CANOPY member. Your payment of $425.00 has been processed.",
		time: "4:15 PM",
		unread: true,
	},
	{
		id: "anthem-eob",
		senders: "Anthem Blue Cross Communications",
		subject: "You have a new explanation of benefits",
		snippet:
			"Log in to review your claims details. View email in a browser Anthem Blue Cross and Blue Shield",
		time: "Jun 29",
		unread: true,
	},
	{
		id: "aside-weekly",
		senders: "Chanhee from Aside",
		subject: "This week in Aside: Pinned Tabs, New AI Providers, and more",
		snippet:
			"Tanishq, we shipped Pinned Tabs, added new AI providers, and improved memory search this week.",
		time: "Jun 29",
	},
	{
		id: "fathom-weekly",
		senders: "Team Fathom",
		subject: "Fathom Weekly Report",
		snippet:
			"Here is your weekly report for the sites below for Jun 22, 2026 to Jun 28, 2026. Total visits: 12,847.",
		time: "Jun 29",
		unread: true,
	},
	{
		id: "cal-receipt",
		senders: "Cal.com, Inc.",
		subject: "Your receipt from Cal.com, Inc. #2460-4809",
		snippet:
			"Receipt from Cal.com, Inc. Amount paid $12.00 Date paid Jun 28, 2026 Payment method Visa •••• 4242",
		time: "Jun 29",
	},
	{
		id: "github-pr",
		senders: "GitHub",
		subject: "[saffron-health/libretto] PR #412: Add workflow retry backoff",
		snippet:
			"@tanishqkancharla requested your review on saffron-health/libretto pull request #412.",
		time: "Jun 28",
		unread: true,
	},
	{
		id: "linear-issue",
		senders: "Linear",
		subject:
			"LIB-284 assigned to you: Fix session timeout on long-running jobs",
		snippet:
			"Karri assigned you a new issue in Libretto. Priority: High · Status: Todo · Project: Platform",
		time: "Jun 28",
	},
	{
		id: "stripe-payout",
		senders: "Stripe",
		subject: "Your Stripe payout for Jun 24–Jun 30 is on the way",
		snippet:
			"A payout of $3,842.17 is on its way to your bank account ending in 9876. Expected arrival: Jul 1.",
		time: "Jun 27",
	},
	{
		id: "notion-digest",
		senders: "Notion Team",
		subject: "Your weekly digest: 3 pages edited, 2 comments",
		snippet:
			"Product roadmap, Q3 planning, and Libretto launch checklist had activity in your workspace this week.",
		time: "Jun 27",
		unread: true,
	},
]

export function Inbox({
	threads = defaultEmailThreads,
	selectedId,
	onSelectThread,
	className,
}: InboxProps = {}) {
	const listClassName = useStyles(threadListClass)

	return (
		<div
			className={joinClassNames(listClassName, className)}
			aria-label="Email threads"
		>
			{threads.map((thread) => (
				<EmailThreadRow
					key={thread.id}
					thread={thread}
					selected={thread.id === selectedId}
					onSelect={onSelectThread}
				/>
			))}
		</div>
	)
}

function EmailThreadRow(props: {
	thread: EmailThread
	selected?: boolean
	onSelect?: (id: string) => void
}) {
	const rowClassName = useStyles(
		threadRowClass,
		...(props.selected ? [threadRowSelectedClass] : []),
	)
	const senderClassName = useStyles(threadSenderClass)
	const senderTextClassName = useStyles(threadSenderTextClass)
	const contentClassName = useStyles(threadContentClass)
	const subjectClassName = useStyles(threadSubjectClass)
	const snippetClassName = useStyles(threadSnippetClass)
	const timeClassName = useStyles(threadTimeClass)
	const toolbarClassName = useStyles(threadToolbarClass)

	return (
		<article
			className={rowClassName}
			onClick={
				props.onSelect
					? () => {
							props.onSelect?.(props.thread.id)
						}
					: undefined
			}
			data-selected={props.selected ? true : undefined}
			aria-current={props.selected ? "true" : undefined}
		>
			<div className={senderClassName}>
				<UnreadDot unread={props.thread.unread} />
				<span className={senderTextClassName}>{props.thread.senders}</span>
			</div>

			<div className={contentClassName}>
				<span className={subjectClassName}>{props.thread.subject}</span>
				<span className={snippetClassName}>{props.thread.snippet}</span>
			</div>

			<time className={`${timeClassName} email-thread-row-time`}>
				{props.thread.time}
			</time>

			<ThreadHoverActions
				className={`${toolbarClassName} email-thread-row-toolbar`}
			/>
		</article>
	)
}

function ThreadHoverActions(props: { className: string }) {
	return (
		<div className={props.className}>
			<ThreadAction label="Star thread">
				<Star size="md" />
			</ThreadAction>
			<ThreadAction label="Archive thread">
				<Archive size="md" />
			</ThreadAction>
			<ThreadAction label="Delete thread">
				<Trash size="md" />
			</ThreadAction>
			<ThreadAction label="Mark unread">
				<Envelope size="md" />
			</ThreadAction>
			<ThreadAction label="Snooze thread">
				<Clock size="md" />
			</ThreadAction>
		</div>
	)
}

function ThreadAction(props: {
	label: string
	children: React.ReactNode
}) {
	return (
		<Button
			variant="quiet"
			aria-label={props.label}
			onClick={(event) => {
				event.stopPropagation()
			}}
		>
			{props.children}
		</Button>
	)
}

function UnreadDot(props: { unread?: boolean; align?: "start" }) {
	const dotClassName = useStyles(
		unreadDotStyle(!!props.unread),
		...(props.align === "start" ? [unreadDotAlignStartClass] : []),
	)

	return <span className={dotClassName} aria-hidden="true" />
}

const truncate = style({
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
})

const threadListClass = style(flex({ direction: "column" }), {
	marginTop: "20px",
	gap: "1px",
})

const threadRowSelectedClass = style({
	backgroundColor: backgroundColor.elementActive,
})

const threadRowClass = style(
	text("md", 400, "lowContrast"),
	spacing.padding({ x: 3 }),
	radius.md,
	{
		position: "relative",
		display: "grid",
		gridTemplateColumns: "minmax(180px, 24%) minmax(0, 1fr) 92px",
		alignItems: "center",
		minHeight: "40px",
		userSelect: "none",
		"&:hover": {
			backgroundColor: backgroundColor.elementHover,
		},
		"&:hover .email-thread-row-toolbar": {
			opacity: 1,
			pointerEvents: "auto",
			transform: "translateY(-50%)",
		},
		"&:hover .email-thread-row-time": {
			opacity: 0,
		},
	},
)

const threadSenderClass = style(
	text("md", 400, "highContrast"),
	flex({ align: "center", gap: 3 }),
	{
		minWidth: 0,
	},
)

const threadSenderTextClass = style(truncate, flexItem({ size: "fill" }), {
	minWidth: 0,
})

const unreadDotStyle = memoize((unread: boolean) =>
	style({
		flexShrink: 0,
		width: "6px",
		height: "6px",
		borderRadius: "50%",
		backgroundColor: unread ? colors.accent[9] : "transparent",
	}),
)

const unreadDotAlignStartClass = style({
	marginTop: "7px",
})

const threadContentClass = style(spacing.gap[3], {
	display: "inline-flex",
	minWidth: 0,
	width: "100%",
	maxWidth: "100%",
	overflow: "hidden",
	paddingRight: "16px",
})

const threadSubjectBaseClass = style(truncate, {
	flex: "0 1 auto",
	minWidth: 0,
})

const threadSubjectClass = style(
	threadSubjectBaseClass,
	text("md", 400, "highContrast"),
)

const threadSnippetClass = style(
	truncate,
	flexItem({ size: "fill" }),
	text("md", 400, "lowContrast"),
	{
		minWidth: 0,
	},
)

const threadTimeClass = style(text("md", 400, "lowContrast"), {
	justifySelf: "end",
})

const threadToolbarClass = style(
	shadow.subtle,
	radius.sm,
	flex({ align: "center", gap: 1 }),
	spacing.padding({ all: 1 }),
	{
		position: "absolute",
		top: "50%",
		right: "6px",
		zIndex: 1,
		background: backgroundColor.element,
		opacity: 0,
		pointerEvents: "none",
		transform: "translateY(-50%)",
	},
)

export function InboxMultiLine({
	threads = defaultEmailThreads,
	selectedId,
	onSelectThread,
	className,
}: InboxProps = {}) {
	const listClassName = useStyles(compactListClass)

	return (
		<div
			className={joinClassNames(listClassName, className)}
			aria-label="Email threads (multi-line)"
		>
			{threads.map((thread) => (
				<CompactThreadRow
					key={thread.id}
					thread={thread}
					selected={thread.id === selectedId}
					onSelect={onSelectThread}
				/>
			))}
		</div>
	)
}

function CompactThreadRow(props: {
	thread: EmailThread
	selected?: boolean
	onSelect?: (id: string) => void
}) {
	const rowClassName = useStyles(
		compactRowClass,
		props.selected && threadRowSelectedClass,
	)
	const bodyClassName = useStyles(compactBodyClass)
	const headerClassName = useStyles(compactHeaderClass)
	const senderClassName = useStyles(compactSenderClass)
	const timeClassName = useStyles(compactTimeClass)
	const subjectClassName = useStyles(threadSubjectClass)
	const snippetClassName = useStyles(compactSnippetClass)
	const toolbarClassName = useStyles(compactToolbarClass)

	return (
		<article
			className={rowClassName}
			onClick={
				props.onSelect
					? () => {
							props.onSelect?.(props.thread.id)
						}
					: undefined
			}
			data-selected={props.selected ? true : undefined}
			aria-current={props.selected ? "true" : undefined}
		>
			<UnreadDot unread={props.thread.unread} align="start" />

			<div className={bodyClassName}>
				<div className={headerClassName}>
					<span className={senderClassName}>{props.thread.senders}</span>

					<time className={`${timeClassName} email-thread-row-time`}>
						{props.thread.time}
					</time>
				</div>

				<span className={subjectClassName}>{props.thread.subject}</span>
				<span className={snippetClassName}>{props.thread.snippet}</span>
			</div>

			<ThreadHoverActions
				className={`${toolbarClassName} email-thread-row-toolbar`}
			/>
		</article>
	)
}

const compactListClass = style(flex({ direction: "column" }), {
	marginTop: "20px",
	gap: "1px",
})

const compactRowClass = style(
	spacing.padding({ y: 6, x: 4 }),
	flex({ gap: 3 }),
	radius.md,
	{
		position: "relative",
		userSelect: "none",
		"&:hover": {
			backgroundColor: backgroundColor.elementHover,
		},
		"&:hover .email-thread-row-toolbar": {
			opacity: 1,
			pointerEvents: "auto",
		},
		"&:hover .email-thread-row-time": {
			opacity: 0,
		},
	},
)

const compactBodyClass = style(flexItem({ size: "fill" }), {
	display: "flex",
	flexDirection: "column",
	gap: "4px",
	minWidth: 0,
})

const compactHeaderClass = flex({ align: "center", justify: "between", gap: 6 })

const compactSenderClass = style(
	truncate,
	flexItem({ size: "fill" }),
	text("md", 400, "highContrast"),
	{
		minWidth: 0,
	},
)

const compactTimeClass = style(text("md", 400, "lowContrast"), {
	flexShrink: 0,
})

const compactSnippetClass = style(truncate, text("md", 400, "lowContrast"), {
	display: "-webkit-box",
	WebkitLineClamp: 2,
	WebkitBoxOrient: "vertical",
	whiteSpace: "normal",
})

const compactToolbarClass = style(threadToolbarClass, {
	top: "8px",
	transform: "none",
})

function joinClassNames(...classNames: Array<string | undefined>) {
	return classNames.filter(Boolean).join(" ")
}
