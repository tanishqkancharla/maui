import { createIcon } from "./createIcon"

export const ArrowDown = createIcon('ArrowDown', function ArrowDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 13.75L12 19.25L6.75 13.75" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.25V4.75" />
		</svg>
	)
})
