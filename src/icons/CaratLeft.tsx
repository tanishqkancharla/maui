import { createIcon } from "./createIcon"

export const CaratLeft = createIcon('CaratLeft', function CaratLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 12L14.25 7.75V16.25L8.75 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
