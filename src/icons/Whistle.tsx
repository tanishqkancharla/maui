import { createIcon } from "./createIcon"

export const Whistle = createIcon('Whistle', function Whistle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12h.01M4.75 7.75V12h3c1.657 0 2.94 1.496 4.015 2.757A4.25 4.25 0 1 0 15 7.75h-.75v.5a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-.5h-6Z" />
		</svg>
	)
})
