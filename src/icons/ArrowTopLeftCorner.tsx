import { createIcon } from "./createIcon"

export const ArrowTopLeftCorner = createIcon('ArrowTopLeftCorner', function ArrowTopLeftCorner(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 19.25V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H19.25M8.75 13.0833V8.75M8.75 8.75H13.0833M8.75 8.75L15.25 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
