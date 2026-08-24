import { createIcon } from "./createIcon"

export const LayerMinus = createIcon('LayerMinus', function LayerMinus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 4.75H16.75M8.13333 13.75L4.75 15.5L12 19.25L19.25 15.5L15.8667 13.75M8.13333 13.75L4.75 12L12 8.25L19.25 12L15.8667 13.75M8.13333 13.75L12 15.75L15.8667 13.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
