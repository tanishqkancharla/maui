import { style, useStyles } from "purse-styles"
import { Prose, proseContainerStyle } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { Calendar } from "../apps/Calendar/Calendar"
import { spacing } from "../tokens/spacing"

export function CalendarPage() {
	const pageClassName = useStyles(pageClass)
	const introClassName = useStyles(proseContainerStyle)

	return (
		<div className={pageClassName}>
			<Prose className={introClassName}>
				<H2>Calendar</H2>
				<P>
					A sample schedule app with a mini month, multi-day time grid, and
					event details. Built from Maui buttons, fields, select, avatar,
					and color tokens.
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
