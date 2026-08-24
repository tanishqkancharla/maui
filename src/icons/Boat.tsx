import { createIcon } from "./createIcon"

export const Boat = createIcon('Boat', function Boat(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 17.75C4.75 17.75 7.5 20.9296 12 18C16.5 15.0703 19.25 18.25 19.25 18.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M17.75 14.25L19 11.75H5L6.65625 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12.25 11.5V4.75L7 11.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
