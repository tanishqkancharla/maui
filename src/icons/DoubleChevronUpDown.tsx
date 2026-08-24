import { createIcon } from "./createIcon"

export const DoubleChevronUpDown = createIcon('DoubleChevronUpDown', function DoubleChevronUpDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15.25 9.25L12 5.75L8.75 9.25M15.25 14.75L12 18.25L8.75 14.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
