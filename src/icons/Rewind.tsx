import { createIcon } from "./createIcon"

export const Rewind = createIcon('Rewind', function Rewind(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15.8603L19.25 18.25V5.75L16 8.13971" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 12L13.25 5.75V18.25L4.75 12Z" />
		</svg>
	)
})
