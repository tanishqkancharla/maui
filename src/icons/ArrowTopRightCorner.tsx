import { createIcon } from "./createIcon"

export const ArrowTopRightCorner = createIcon('ArrowTopRightCorner', function ArrowTopRightCorner(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 19.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H4.75M15.25 13.0833V8.75M15.25 8.75H10.9167M15.25 8.75L8.75 15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
