import { createIcon } from "./createIcon"

export const Lego = createIcon('Lego', function Lego(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 18.25v-3.5a1 1 0 0 1 1-1h1v-2h3.5v2h3.5v-2h3.5v2h1a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1H5.75a1 1 0 0 1-1-1Z" />
		</svg>
	)
})
