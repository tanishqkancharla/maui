import { style, useStyles } from "purse-styles"
import { EmailClient } from "../apps/EmailClient/EmailClient"
import { H2, P } from "../components/Typography"

export function EmailClientPage() {
	const pageClassName = useStyles(pageClass)

	return (
		<section className={pageClassName}>
			<H2>Email client</H2>
			<P>
				A sample inbox app composed from the Inbox and Message list patterns.
				Select a thread on the left to read its conversation on the right.
			</P>

			<EmailClient />
		</section>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
