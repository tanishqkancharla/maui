import { createIcon } from "./createIcon"

export const ChevronUpLarge = createIcon('ChevronUpLarge', function ChevronUpLarge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 15.25L12 7.75L19.25 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
