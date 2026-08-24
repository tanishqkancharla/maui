import { createIcon } from "./createIcon"

export const Borders = createIcon('Borders', function Borders(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.25 19.25H7.75M19.25 7.75V16.25M4.75 7.75L4.75 16.25M16.25 4.75L7.75 4.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
