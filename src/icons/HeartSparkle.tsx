import { createIcon } from "./createIcon"

export const HeartSparkle = createIcon('HeartSparkle', function HeartSparkle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.995 18.25L5.66654 12.3892C4.2403 10.6312 4.49599 8.1461 6.31215 6.65973C8.12832 5.17336 10.5455 5.61 11.995 7.2332C13.4446 5.61 15.8305 5.189 17.6779 6.65973C19.4759 8.09115 19.7366 10.4982 18.4343 12.2467M16.9999 14.75L16.3571 16.357L14.75 16.9999L16.3571 17.6427L17 19.25L17.6429 17.6427L19.25 16.9999L17.6427 16.357L16.9999 14.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
