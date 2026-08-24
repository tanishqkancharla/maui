import { createIcon } from "./createIcon"

export const ChevronDownLarge = createIcon('ChevronDownLarge', function ChevronDownLarge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 8.75L12 16.25L19.25 8.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
