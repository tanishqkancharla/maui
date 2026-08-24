import { createIcon } from "./createIcon"

export const ArrowRightCircle = createIcon('ArrowRightCircle', function ArrowRightCircle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15 12H8.75M13 14.25L15.25 12L13 9.75M4.75 12C4.75 16.0041 7.9959 19.25 12 19.25C16.0041 19.25 19.25 16.0041 19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.9959 4.75 4.75 7.99594 4.75 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
