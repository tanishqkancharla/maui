import { createIcon } from "./createIcon"

export const ArrowUpLeft = createIcon('ArrowUpLeft', function ArrowUpLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 15.25V6.75H15.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7L17.25 17.25" />
		</svg>
	)
})
