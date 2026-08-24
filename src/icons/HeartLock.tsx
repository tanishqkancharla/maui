import { createIcon } from "./createIcon"

export const HeartLock = createIcon('HeartLock', function HeartLock(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11 17.3285L5.66654 12.3892C4.2403 10.6312 4.49599 8.1461 6.31215 6.65973C8.12832 5.17336 10.5455 5.61 11.995 7.2332C13.4446 5.61 15.8305 5.189 17.6779 6.65973C19.0529 7.7544 19.4614 9.58041 19 11.149M15 15.75V14.4286C15 13.6396 15.6716 13 16.5 13C17.3284 13 18 13.6396 18 14.4286V15.75M13.75 15.75V18.25C13.75 18.8023 14.1977 19.25 14.75 19.25H18.25C18.8023 19.25 19.25 18.8023 19.25 18.25V15.75H13.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
