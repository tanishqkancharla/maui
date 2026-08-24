import { createIcon } from "./createIcon"

export const ChevronRight = createIcon('ChevronRight', function ChevronRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.75 8.75L14.25 12L10.75 15.25" />
		</svg>
	)
})
