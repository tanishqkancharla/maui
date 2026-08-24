import { createIcon } from "./createIcon"

export const ClosedCaptions = createIcon('ClosedCaptions', function ClosedCaptions(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.25 8.75h-.5a3 3 0 0 0-3 3v.5a3 3 0 0 0 3 3h.5m-5-6.5h-.5a3 3 0 0 0-3 3v.5a3 3 0 0 0 3 3h.5m8-7.5v8.5a2 2 0 0 1-2 2H6.75a2 2 0 0 1-2-2v-8.5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2Z" />
		</svg>
	)
})
