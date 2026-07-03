import { style, useStyles } from "purse-styles"
import { H2, H3, P } from "../components/Typography"
import { Inbox, InboxMultiLine } from "../patterns/Inbox"

export function InboxPage() {
	const className = useStyles(pageClass)

	return (
		<section className={className}>
			<H2>Inbox</H2>
			<P>
				Two thread-list formats built from the same data, using Maui spacing,
				corner-radius, and shadow tokens.
			</P>

			<H3>Single-line</H3>
			<Inbox />

			<H3>Multi-line</H3>
			<InboxMultiLine />
		</section>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
