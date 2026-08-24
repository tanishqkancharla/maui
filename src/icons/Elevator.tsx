import { createIcon } from "./createIcon"

export const Elevator = createIcon('Elevator', function Elevator(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.5 4.75H4.75V19.25H9.5M9.5 4.75H14.25V19.25H9.5M9.5 4.75V19.25M16.75 10.25L18 8.75L19.25 10.25M16.75 13.75L18 15.25L19.25 13.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
