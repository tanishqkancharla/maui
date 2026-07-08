import { style, useStyles } from "purse-styles"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { EmailMessageThread } from "../patterns/MessageList"

export function MessageListPage() {
	const pageClassName = useStyles(pageClass)

	return (
		<Prose className={pageClassName}>
			<H2>Message list</H2>
			<P>
				A vertical message thread pattern for reading email conversations. Each
				message sits in its own panel with an avatar, sender, timestamp, and
				plain-text body.
			</P>

			<H3>Email thread</H3>
			<Panel>
				<EmailMessageThread />
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
