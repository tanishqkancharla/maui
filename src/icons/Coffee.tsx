import { createIcon } from "./createIcon"

export const Coffee = createIcon('Coffee', function Coffee(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.25 10.75L15.1875 19.25H8.8125L7.75 10.75M16.25 10.75H7.75M16.25 10.75V10C16.25 9.20017 16.0291 8.45193 15.6449 7.81301M7.75 10.75V10C7.75 7.99723 9.13532 6.31802 11 5.86831C11.0974 5.84481 11.1962 5.82467 11.2961 5.80802M17.25 10.75H6.75M11.75 16.25L13.8419 5.55799C13.9337 5.08863 14.3451 4.75 14.8233 4.75H16.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
