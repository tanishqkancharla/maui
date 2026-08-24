import { createIcon } from "./createIcon"

export const Activity = createIcon('Activity', function Activity(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 11.75H8.25L10.25 4.75L13.75 19.25L15.75 11.75H19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
