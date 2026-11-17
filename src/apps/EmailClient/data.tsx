import type React from "react"
import { P } from "../../components/Typography"
import type { EmailThread } from "../../patterns/Inbox"

export type EmailMessage = {
	id: string
	sender: string
	timestamp: string
	edited?: boolean
	body: React.ReactNode
}

export type EmailThreadWithMessages = EmailThread & {
	messages: EmailMessage[]
}

export const emailInbox: [
	EmailThreadWithMessages,
	...EmailThreadWithMessages[],
] = [
	{
		id: "q3-roadmap",
		senders: "Maya Chen",
		subject: "Q3 product roadmap — review by Friday",
		snippet:
			"I've attached the draft Q3 roadmap for review. The main themes are platform reliability, onboarding improvements, and the new billing workflow.",
		time: "Jul 1",
		unread: true,
		messages: [
			{
				id: "q3-1",
				sender: "Maya Chen",
				timestamp: "Jul 1, 9:14 AM",
				body: (
					<>
						<P>Hi team,</P>
						<P>
							I've attached the draft Q3 roadmap for review. The main themes are
							platform reliability, onboarding improvements, and the new billing
							workflow. Please leave comments inline by Friday so we can lock
							scope for the sprint planning session next week.
						</P>
						<P>Thanks,</P>
						<P>Maya</P>
					</>
				),
			},
			{
				id: "q3-2",
				sender: "James Ortiz",
				timestamp: "Jul 1, 10:42 AM",
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
				id: "q3-3",
				sender: "Priya Sharma",
				timestamp: "Jul 1, 11:08 AM",
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
				id: "q3-4",
				sender: "Maya Chen",
				timestamp: "Jul 1, 2:31 PM",
				body: (
					<P>
						Perfect — I'll circulate this version to leadership and use it as the
						agenda doc for Monday's planning meeting.
					</P>
				),
			},
		],
	},
	{
		id: "stripe-payout",
		senders: "Stripe",
		subject: "Your Stripe payout for Jun 24–Jun 30 is on the way",
		snippet:
			"A payout of $3,842.17 is on its way to your bank account ending in 9876. Expected arrival: Jul 1.",
		time: "Jun 30",
		unread: true,
		messages: [
			{
				id: "stripe-1",
				sender: "Stripe",
				timestamp: "Jun 30, 6:02 AM",
				body: (
					<>
						<P>Hi Tanishq,</P>
						<P>
							A payout of $3,842.17 is on its way to your bank account ending in
							9876. Expected arrival: Jul 1.
						</P>
						<P>
							This payout covers charges from Jun 24 through Jun 30. You can view
							the full breakdown in your Stripe Dashboard.
						</P>
					</>
				),
			},
		],
	},
	{
		id: "github-pr",
		senders: "GitHub",
		subject: "[saffron-health/libretto] PR #412: Add workflow retry backoff",
		snippet:
			"@tanishqkancharla requested your review on saffron-health/libretto pull request #412.",
		time: "Jun 29",
		unread: true,
		messages: [
			{
				id: "github-1",
				sender: "GitHub",
				timestamp: "Jun 29, 4:18 PM",
				body: (
					<>
						<P>
							@tanishqkancharla requested your review on{" "}
							<strong>saffron-health/libretto</strong> pull request #412.
						</P>
						<P>
							Add workflow retry backoff — introduces exponential backoff for failed
							browser automation jobs and surfaces retry count in the run timeline.
						</P>
					</>
				),
			},
		],
	},
	{
		id: "canopy-receipt",
		senders: "billing@canopy.space",
		subject: "Michael Kronovet Customer Receipt/Purchase Confirmation",
		snippet:
			"06/30/26 Dear Michael, Thank you for being a CANOPY member. Your payment of $425.00 has been processed.",
		time: "Jun 29",
		messages: [
			{
				id: "canopy-1",
				sender: "billing@canopy.space",
				timestamp: "Jun 29, 4:15 PM",
				body: (
					<>
						<P>Dear Michael,</P>
						<P>
							Thank you for being a CANOPY member. Your payment of $425.00 has been
							processed for your monthly membership at CANOPY Jackson Square.
						</P>
						<P>Receipt #CAN-88421 · Visa •••• 4242</P>
					</>
				),
			},
		],
	},
	{
		id: "linear-issue",
		senders: "Linear",
		subject: "LIB-284 assigned to you: Fix session timeout on long-running jobs",
		snippet:
			"Karri assigned you a new issue in Libretto. Priority: High · Status: Todo · Project: Platform",
		time: "Jun 28",
		messages: [
			{
				id: "linear-1",
				sender: "Linear",
				timestamp: "Jun 28, 11:03 AM",
				body: (
					<>
						<P>Karri assigned you a new issue in Libretto.</P>
						<P>
							<strong>LIB-284</strong> — Fix session timeout on long-running jobs
						</P>
						<P>Priority: High · Status: Todo · Project: Platform</P>
					</>
				),
			},
		],
	},
	{
		id: "aside-weekly",
		senders: "Chanhee from Aside",
		subject: "This week in Aside: Pinned Tabs, New AI Providers, and more",
		snippet:
			"Tanishq, we shipped Pinned Tabs, added new AI providers, and improved memory search this week.",
		time: "Jun 27",
		messages: [
			{
				id: "aside-1",
				sender: "Chanhee from Aside",
				timestamp: "Jun 27, 8:00 AM",
				body: (
					<>
						<P>Hi Tanishq,</P>
						<P>Here's what shipped in Aside this week:</P>
						<P>
							Pinned Tabs keep your most-used workspaces one click away. We also
							added new AI providers and improved memory search across sessions.
						</P>
					</>
				),
			},
		],
	},
	{
		id: "notion-digest",
		senders: "Notion Team",
		subject: "Your weekly digest: 3 pages edited, 2 comments",
		snippet:
			"Product roadmap, Q3 planning, and Libretto launch checklist had activity in your workspace this week.",
		time: "Jun 27",
		unread: true,
		messages: [
			{
				id: "notion-1",
				sender: "Notion Team",
				timestamp: "Jun 27, 7:30 AM",
				body: (
					<>
						<P>Your workspace had a busy week.</P>
						<P>
							Product roadmap, Q3 planning, and Libretto launch checklist had
							activity. 3 pages edited and 2 new comments from your team.
						</P>
					</>
				),
			},
		],
	},
]

export const emailThreads = emailInbox.map(({ messages: _messages, ...thread }) => thread)

export function getThreadMessages(threadId: string) {
	return emailInbox.find((thread) => thread.id === threadId)?.messages ?? []
}
