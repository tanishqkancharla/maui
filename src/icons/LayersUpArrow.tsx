import { createIcon } from "./createIcon"

export const LayersUpArrow = createIcon('LayersUpArrow', function LayersUpArrow(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.09615 14.5L4.75 16L12 19.25L19.25 16L15.9038 14.5M8.09615 14.5L4.75 13L9 11.0948M8.09615 14.5L12 16.25L15.9038 14.5M15.9038 14.5L19.25 13L15 11.0948M12 10.25V4.75M12 4.75L9.75 7.25M12 4.75L14.25 7.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
