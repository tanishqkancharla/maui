import { createIcon } from "./createIcon"

export const SkipBack = createIcon('SkipBack', function SkipBack(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 12L18.25 5.75V18.25L9.75 12Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.75 5.75V18.25" />
		</svg>
	)
})
