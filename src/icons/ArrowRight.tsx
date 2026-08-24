import { createIcon } from "./createIcon"

export const ArrowRight = createIcon('ArrowRight', function ArrowRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.75 6.75L19.25 12L13.75 17.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H4.75" />
		</svg>
	)
})
