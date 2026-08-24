import { createIcon } from "./createIcon"

export const ArrowUp = createIcon('ArrowUp', function ArrowUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 10.25L12 4.75L6.75 10.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19.25V5.75" />
		</svg>
	)
})
