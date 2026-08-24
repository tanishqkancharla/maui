import { createIcon } from "./createIcon"

export const Map = createIcon('Map', function Map(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 6.75L9.25 4.75V17.25L4.75 19.25V6.75Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.75 6.75L19.25 4.75V17.25L14.75 19.25V6.75Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.75 6.75L9.25 4.75V17.25L14.75 19.25V6.75Z" />
		</svg>
	)
})
