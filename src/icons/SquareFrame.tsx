import { createIcon } from "./createIcon"

export const SquareFrame = createIcon('SquareFrame', function SquareFrame(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 7.75a3 3 0 0 1 3-3h8.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3h-8.5a3 3 0 0 1-3-3v-8.5Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.25 7.75h-1.5a1 1 0 0 0-1 1v1.5m2.5 6h-1.5a1 1 0 0 1-1-1v-1.5m8.5-3.5v-1.5a1 1 0 0 0-1-1h-1.5m2.5 6v1.5a1 1 0 0 1-1 1h-1.5" />
		</svg>
	)
})
