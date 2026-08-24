import { createIcon } from "./createIcon"

export const HalfCircleBottom = createIcon('HalfCircleBottom', function HalfCircleBottom(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 11.75C4.75 16 7.99594 19.25 12 19.25C16.0041 19.25 19.25 16 19.25 11.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
