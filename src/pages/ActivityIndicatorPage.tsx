import { style, useStyles } from "purse-styles"
import { Panel } from "./Panel"
import { ActivityIndicator } from "../components/ActivityIndicator"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { flex } from "../tokens/layout"
import { text } from "../tokens/text"

export function ActivityIndicatorPage() {
	const pageClassName = useStyles(pageClass)
	const rowClassName = useStyles(rowClass)
	const columnClassName = useStyles(columnClass)
	const inlineExampleClassName = useStyles(inlineExampleClass)

	return (
		<Prose className={pageClassName}>
			<H2>Activity indicator</H2>
			<P>
				An iOS-style spinner. Eight rounded spokes fade from the leading spoke
				to the tail, and the wheel rotates in 45° steps so the bright spoke hops
				clockwise. It is text-sized and accent-colored by default. Use it for
				loading; use Thinking when waiting on LLM inference.
			</P>

			<H3>Variants</H3>
			<Panel className={columnClassName}>
				<p className={inlineExampleClassName}>
					<ActivityIndicator variant="accent" aria-label="Loading, accent" />
					Loading messages
				</p>
				<p className={inlineExampleClassName}>
					<ActivityIndicator variant="primary" aria-label="Loading, primary" />
					Syncing calendar
				</p>
				<p className={inlineExampleClassName}>
					<ActivityIndicator variant="muted" aria-label="Loading, muted" />
					Fetching attachments
				</p>
			</Panel>

			<H3>Sizes</H3>
			<P>
				Use the same t-shirt sizes as icons, from <Code>2xs</Code> to{" "}
				<Code>xl</Code>, or a custom CSS length. The default is 1em.
			</P>
			<Panel className={rowClassName}>
				{(["2xs", "xs", "sm", "md", "lg", "xl"] as const).map((size) => (
					<div className={columnClassName} key={size}>
						<ActivityIndicator size={size} aria-label={`Loading, ${size}`} />
						<Text size="xs" color="lowContrast">
							{size}
						</Text>
					</div>
				))}
				<div className={columnClassName}>
					<ActivityIndicator size="37px" aria-label="Loading, custom size" />
					<Text size="xs" color="lowContrast">
						37px
					</Text>
				</div>
			</Panel>

			<H3>In a button</H3>
			<Panel className={rowClassName}>
				<Button variant="primary" isPending>
					Saving
				</Button>
				<Button isPending>Refreshing</Button>
			</Panel>
		</Prose>
	)
}

const pageClass = style({
	maxWidth: "1200px",
	paddingBottom: "32px",
})

const rowClass = style(flex({ alignItems: "center", gap: 6 }))

const columnClass = style(flex({ direction: "column", gap: 6 }))

const inlineExampleClass = style(
	text({ size: "md", fontWeight: 400, color: "highContrast" }),
	{
		display: "flex",
		alignItems: "center",
		gap: "6px",
		margin: 0,
	},
)
