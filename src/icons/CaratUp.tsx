import { createIcon } from "./createIcon"

export const CaratUp = createIcon('CaratUp', function CaratUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 9.75L16.25 15.25H7.75L12 9.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
