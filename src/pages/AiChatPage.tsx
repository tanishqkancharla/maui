import { style, useStyles } from "purse-styles"
import { AiChat } from "../apps/AiChat/AiChat"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"

export function AiChatPage() {
	const pageClassName = useStyles(pageClass)

	return (
		<Prose className={pageClassName}>
			<H2>AI chat</H2>
			<P>
				A mock streaming chat composed from the Editor component and the
				Assistant message pattern. Messages you send get a canned markdown reply
				streamed locally through Streamdown — no backend or API.
			</P>

			<AiChat />
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})
