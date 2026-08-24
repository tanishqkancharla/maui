import { createIcon } from "./createIcon"

export const DoubleChevronRight = createIcon('DoubleChevronRight', function DoubleChevronRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 8.75L11.25 12L7.75 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12.75 8.75L16.25 12L12.75 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
