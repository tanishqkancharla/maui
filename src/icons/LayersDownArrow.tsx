import { createIcon } from "./createIcon"

export const LayersDownArrow = createIcon('LayersDownArrow', function LayersDownArrow(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 13.75V19.25M12 19.25L9.75 16.75M12 19.25L14.25 16.75M8.09615 9.5L4.75 11L9 12.9052M8.09615 9.5L4.75 8L12 4.75L19.25 8L15.9038 9.5M8.09615 9.5L12 11.25L15.9038 9.5M15.9038 9.5L19.25 11L15 12.9052" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
