import { createIcon } from "./createIcon"

export const ChevronRightLarge = createIcon('ChevronRightLarge', function ChevronRightLarge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 4.75L16.25 12L8.75 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
