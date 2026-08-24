import { createIcon } from "./createIcon"

export const FastForward = createIcon('FastForward', function FastForward(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 15.8603L4.75 18.25V5.75L8 8.13971" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.25 12L10.75 5.75V18.25L19.25 12Z" />
		</svg>
	)
})
