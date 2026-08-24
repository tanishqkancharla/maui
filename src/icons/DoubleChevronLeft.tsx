import { createIcon } from "./createIcon"

export const DoubleChevronLeft = createIcon('DoubleChevronLeft', function DoubleChevronLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.25 8.75L7.75 12L11.25 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16.25 8.75L12.75 12L16.25 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
