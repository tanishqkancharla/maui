import { style, useStyles } from "purse-styles"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Loader } from "../patterns/Loader"
import { flex } from "../tokens/layout"
import { text } from "../tokens/text"

export function LoaderPage() {
	const pageClassName = useStyles(pageClass)
	const rowClassName = useStyles(rowClass)
	const columnClassName = useStyles(columnClass)
	const inlineExampleClassName = useStyles(inlineExampleClass)

	return (
		<Prose className={pageClassName}>
			<H2>Loader</H2>
			<P>
				A tiny 3x3 dot grid loader, sized to sit inline with text. Each dot
				starts in a random orientation and steps forward using Conway's Game
				of Life rules. Since a 3x3 board dies out or freezes within a few
				generations, the grid reseeds itself with a new random pattern
				whenever it goes extinct or falls into a repeating loop, so it never
				stops animating.
			</P>

			<H3>Variants</H3>
			<Panel className={columnClassName}>
				<p className={inlineExampleClassName}>
					<Loader size="0.8em" variant="primary" aria-label="Loading, primary" />
					Loading your inbox, hang tight.
				</p>
				<p className={inlineExampleClassName}>
					<Loader size="0.8em" variant="accent" aria-label="Loading, accent" />
					Syncing your mailbox, hang tight.
				</p>
				<p className={inlineExampleClassName}>
					<Loader size="0.8em" variant="muted" aria-label="Loading, muted" />
					Fetching updates in the background.
				</p>
			</Panel>

			<H3>Sizes</H3>
			<Panel className={rowClassName}>
				<Loader size="0.8em" aria-label="Loading, small" />
				<Loader size="1.4em" aria-label="Loading, default" />
			</Panel>

			<H3>Inline with text</H3>
			<Panel>
				<p className={inlineExampleClassName}>
					<Loader size="0.8em" aria-label="Syncing" /> Syncing your mailbox,
					hang tight.
				</p>
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const rowClass = style(flex({ align: "center", gap: 6 }))

const columnClass = style(flex({ direction: "column", gap: 6 }))

const inlineExampleClass = style(text("md", 400, "highContrast"), {
	display: "flex",
	alignItems: "center",
	gap: "6px",
	margin: 0,
})
