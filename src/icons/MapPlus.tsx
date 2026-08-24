import { createIcon } from "./createIcon"

export const MapPlus = createIcon('MapPlus', function MapPlus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.25 4.75L4.75 6.75V19.25L9.25 17.25M9.25 4.75V17.25M9.25 4.75L14.75 6.75M9.25 17.25L12.2798 18.3517M14.75 6.75L19.25 4.75V12.25M14.75 6.75V14.25M17.5 15.75V17.5M17.5 17.5V19.25M17.5 17.5H19.25M17.5 17.5H15.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
