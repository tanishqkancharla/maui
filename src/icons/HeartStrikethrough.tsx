import { createIcon } from "./createIcon"

export const HeartStrikethrough = createIcon('HeartStrikethrough', function HeartStrikethrough(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M10.8768 17.2144L11.995 18.25L18.3235 12.3892C19.1996 11.3094 19.4528 9.94938 19.0898 8.71993M8.52455 15.036L5.66654 12.3892C4.2403 10.6312 4.49599 8.1461 6.31215 6.65973C8.12832 5.17336 10.5455 5.61 11.995 7.23321C13.2974 5.77475 15.3558 5.28685 17.1003 6.26964M18.25 5.75L5.75 18.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
