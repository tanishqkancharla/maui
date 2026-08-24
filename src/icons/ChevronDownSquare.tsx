import { createIcon } from "./createIcon"

export const ChevronDownSquare = createIcon('ChevronDownSquare', function ChevronDownSquare(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m8.75 10.75 3.25 3.5 3.25-3.5m2-6H6.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2V6.75a2 2 0 0 0-2-2Z" />
		</svg>
	)
})
