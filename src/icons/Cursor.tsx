import { createIcon } from "./createIcon"

export const Cursor = createIcon('Cursor', function Cursor(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.75 5.75L11 18.25L13 13L18.25 11L5.75 5.75Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 13L18.25 18.25" />
		</svg>
	)
})
