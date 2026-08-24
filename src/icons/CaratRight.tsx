import { createIcon } from "./createIcon"

export const CaratRight = createIcon('CaratRight', function CaratRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.25 12L8.75 7.75V16.25L14.25 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
