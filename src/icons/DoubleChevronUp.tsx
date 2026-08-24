import { createIcon } from "./createIcon"

export const DoubleChevronUp = createIcon('DoubleChevronUp', function DoubleChevronUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 11.25L12 7.75L15.25 11.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8.75 16.25L12 12.75L15.25 16.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
