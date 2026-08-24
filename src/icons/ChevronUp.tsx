import { createIcon } from "./createIcon"

export const ChevronUp = createIcon('ChevronUp', function ChevronUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.25 14.25L12 10.75L8.75 14.25" />
		</svg>
	)
})
