import { createIcon } from "./createIcon"

export const Icon24hrClock = createIcon('Icon24hrClock', function Icon24hrClock(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12v.25A7.25 7.25 0 1 1 9 5.767m3.25-.09c0-.512.558-.927 1.247-.927.688 0 1.253.2 1.253.926 0 .727-2.5 2.574-2.5 2.574h2.5M12 10.75V12l2.25 2.25m4.167-6.875H16.75l1.667-2.625v2.625Zm0 0v.875m0-.875h.833" />
		</svg>
	)
})
