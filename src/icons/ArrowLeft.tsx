import { createIcon } from "./createIcon"

export const ArrowLeft = createIcon('ArrowLeft', function ArrowLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.25 6.75L4.75 12L10.25 17.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.25 12H5" />
		</svg>
	)
})
