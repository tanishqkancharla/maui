import { createIcon } from "./createIcon"

export const ChevronDown = createIcon('ChevronDown', function ChevronDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.25 10.75L12 14.25L8.75 10.75" />
		</svg>
	)
})
