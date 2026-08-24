import { createIcon } from "./createIcon"

export const RotateClockwise = createIcon('RotateClockwise', function RotateClockwise(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 18.25A6.25 6.25 0 1 1 17.25 12v2.385m-2.5-1.635 2.25 2.5 2.25-2.5" />
		</svg>
	)
})
