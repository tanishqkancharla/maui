import { style, useStyles } from "purse-styles"
import { H2, P } from "../components/Typography"
import { EmailClient } from "../patterns/EmailClient"

export function EmailClientPage() {
	const className = useStyles(pageClass)

	return (
		<section className={className}>
			<H2>Email client</H2>
			<P>
				A first pass at the dense email thread row, using Maui spacing,
				corner-radius, and shadow tokens.
			</P>

			<EmailClient />
		</section>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
