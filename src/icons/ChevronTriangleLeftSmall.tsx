import { createIcon } from "./createIcon"

export const ChevronTriangleLeftSmall = createIcon('ChevronTriangleLeftSmall', function ChevronTriangleLeftSmall(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.75 12L14.25 9.75V14.25L9.75 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
