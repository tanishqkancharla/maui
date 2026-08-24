import { createIcon } from "./createIcon"

export const Minus = createIcon('Minus', function Minus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.25 12.25L5.75 12.25" />
		</svg>
	)
})
