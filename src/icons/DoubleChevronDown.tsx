import { createIcon } from "./createIcon"

export const DoubleChevronDown = createIcon('DoubleChevronDown', function DoubleChevronDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 7.75L12 11.25L15.25 7.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8.75 12.75L12 16.25L15.25 12.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
