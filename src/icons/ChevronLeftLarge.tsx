import { createIcon } from "./createIcon"

export const ChevronLeftLarge = createIcon('ChevronLeftLarge', function ChevronLeftLarge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.25 4.75L8.75 12L16.25 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
