import { createIcon } from "./createIcon"

export const ArrowUpRight = createIcon('ArrowUpRight', function ArrowUpRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 15.25V6.75H8.75" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 7L6.75 17.25" />
		</svg>
	)
})
