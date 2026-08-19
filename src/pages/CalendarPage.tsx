import { style, useStyles } from "purse-styles"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { Calendar } from "../patterns/Calendar"
import { spacing } from "../tokens/spacing"

export function CalendarPage() {
	const pageClassName = useStyles(pageClass)
	const introClassName = useStyles(introClass)

	return (
		<div className={pageClassName}>
			<Prose className={introClassName}>
				<H2>Calendar</H2>
				<P>
					A three-pane schedule pattern: mini month and calendars on the
					left, a multi-day time grid in the center, and event details on
					the right. Built from Maui buttons, fields, select, avatar, and
					color tokens.
				</P>
			</Prose>
			<Calendar />
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
