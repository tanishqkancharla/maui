import { createIcon } from "./createIcon"

export const ChevronRightSquare = createIcon('ChevronRightSquare', function ChevronRightSquare(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10.75 15.25 3.5-3.25-3.5-3.25m6.5-4H6.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2V6.75a2 2 0 0 0-2-2Z" />
		</svg>
	)
})
