import { createIcon } from "./createIcon"

export const CalendarCheck = createIcon('CalendarCheck', function CalendarCheck(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.25 12.25v-3.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2h4.5m3.5-1.5 1.5 1.5c.75-2.25 3-3.5 3-3.5M8 4.75v3.5m8-3.5v3.5m-8.25 2.5h8.5" />
		</svg>
	)
})
