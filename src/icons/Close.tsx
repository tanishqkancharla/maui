import { createIcon } from "./createIcon"

export const Close = createIcon('Close', function Close(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L6.75 17.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 6.75L17.25 17.25" />
		</svg>
	)
})
