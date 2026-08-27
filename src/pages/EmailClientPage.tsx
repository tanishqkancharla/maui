import { style, useStyles } from "purse-styles"
import { EmailClient } from "../apps/EmailClient/EmailClient"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { spacing } from "../tokens/spacing"

export function EmailClientPage() {
	const pageClassName = useStyles(pageClass)
	const introClassName = useStyles(introClass)

	return (
		<div className={pageClassName}>
			<Prose className={introClassName}>
				<H2>Email client</H2>
				<P>
					A sample inbox app composed from the Inbox and Message list patterns.
					Select a thread on the left to read its conversation on the right.
				</P>
			</Prose>
			<EmailClient />
		</div>
	)
}

const pageClass = style(spacing.padding({ bottom: 16 }), {
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(8),
	width: "100%",
	maxWidth: "100%",
	minWidth: 0,
})

const introClass = style({
	maxWidth: "72ch",
})
