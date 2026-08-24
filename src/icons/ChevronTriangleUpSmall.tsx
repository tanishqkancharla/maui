import { createIcon } from "./createIcon"

export const ChevronTriangleUpSmall = createIcon('ChevronTriangleUpSmall', function ChevronTriangleUpSmall(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 9.75L9.75 14.25H14.25L12 9.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
