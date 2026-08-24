import { createIcon } from "./createIcon"

export const KanbanPlus = createIcon('KanbanPlus', function KanbanPlus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 7.25V4.75H13.75V19.25H19.25V16.75M17.5 10.75V12.5M17.5 12.5V14.25M17.5 12.5H19.25M17.5 12.5H15.75M4.75 19.25V4.75H10.25V19.25H4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
