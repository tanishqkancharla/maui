import { createIcon } from "./createIcon"

export const LayerPlus = createIcon('LayerPlus', function LayerPlus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.13333 13.75L4.75 15.5L12 19.25L19.25 15.5L15.8667 13.75M8.13333 13.75L4.75 12L12 8.25L19.25 12L15.8667 13.75M8.13333 13.75L12 15.75L15.8667 13.75M17.5 4.75V6.5M17.5 6.5V8.25M17.5 6.5H19.25M17.5 6.5L15.75 6.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
