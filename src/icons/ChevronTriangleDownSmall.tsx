import { createIcon } from "./createIcon"

export const ChevronTriangleDownSmall = createIcon('ChevronTriangleDownSmall', function ChevronTriangleDownSmall(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 14.25L9.75 9.75H14.25L12 14.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
