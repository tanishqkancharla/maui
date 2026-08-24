import { createIcon } from "./createIcon"

export const CaratDown = createIcon('CaratDown', function CaratDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 15.25L16.25 9.75H7.75L12 15.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
