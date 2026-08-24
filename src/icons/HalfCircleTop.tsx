import { createIcon } from "./createIcon"

export const HalfCircleTop = createIcon('HalfCircleTop', function HalfCircleTop(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 12.25C4.75 8 7.99594 4.75 12 4.75C16.0041 4.75 19.25 8 19.25 12.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
