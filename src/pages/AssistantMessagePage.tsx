import { useEffect, useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import {
	AssistantMessage,
	AssistantMessageDemo,
} from "../patterns/AssistantMessage"
import { flex } from "../tokens/layout"

const streamingSample = `## Streaming demo

Watch **incomplete** markdown stay readable while tokens arrive:

- Emphasis before the closing marks
- Lists mid-item
- A fenced block before it closes

\`\`\`ts
export function sum(a: number, b: number) {
  return a + b
}
\`\`\`
`

export function AssistantMessagePage() {
	const pageClassName = useStyles(pageClass)
	const actionsClassName = useStyles(actionsClass)
	const [streamed, setStreamed] = useState("")
	const [isAnimating, setIsAnimating] = useState(false)

	useEffect(() => {
		if (!isAnimating) return

		let index = 0
		setStreamed("")
		const id = window.setInterval(() => {
			index = Math.min(streamingSample.length, index + 4)
			setStreamed(streamingSample.slice(0, index))
			if (index >= streamingSample.length) {
				window.clearInterval(id)
				setIsAnimating(false)
			}
		}, 24)

		return () => window.clearInterval(id)
	}, [isAnimating])

	return (
		<Prose className={pageClassName}>
			<H2>Assistant message</H2>
			<P>
				Renders assistant markdown with{" "}
				<code>streamdown</code> — built for incomplete tokens — and Maui prose
				styles so replies match the editor&apos;s reading type. Code fences use
				Maui&apos;s <code>CodeBlock</code>.
			</P>

			<H3>Static reply</H3>
			<Panel>
				<AssistantMessageDemo />
			</Panel>

			<H3>Mock stream</H3>
			<P>
				Replay a canned reply through Streamdown with{" "}
				<code>isAnimating</code> so unterminated markdown stays shaped while it
				arrives.
			</P>
			<Panel>
				<div className={actionsClassName}>
					<Button
						onClick={() => setIsAnimating(true)}
						disabled={isAnimating}
					>
						{isAnimating ? "Streaming…" : "Replay stream"}
					</Button>
				</div>
				{streamed ? (
					<AssistantMessage isAnimating={isAnimating}>{streamed}</AssistantMessage>
				) : (
					<P>Press replay to stream a sample reply.</P>
				)}
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const actionsClass = style(flex({ align: "center", gap: 4 }), {
	marginBottom: "16px",
})
