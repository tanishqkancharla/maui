import { createIcon } from "./createIcon"

export const ArrowDownRight = createIcon('ArrowDownRight', function ArrowDownRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 8.75V17.25H8.75" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17L6.75 6.75" />
		</svg>
	)
})
