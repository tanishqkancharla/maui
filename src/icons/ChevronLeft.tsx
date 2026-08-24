import { createIcon } from "./createIcon"

export const ChevronLeft = createIcon('ChevronLeft', function ChevronLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.25 8.75L9.75 12L13.25 15.25" />
		</svg>
	)
})
