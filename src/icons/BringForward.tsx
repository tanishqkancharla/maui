import { createIcon } from "./createIcon"

export const BringForward = createIcon('BringForward', function BringForward(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 9.75v.5m0 3.5v.5m0 3.5v.5a1 1 0 0 0 1 1h.5m3.5 0h.5m3.5 0h.5m-3.5-4h6.5a2 2 0 0 0 2-2v-6.5a2 2 0 0 0-2-2h-6.5a2 2 0 0 0-2 2v6.5a2 2 0 0 0 2 2Z" />
		</svg>
	)
})
