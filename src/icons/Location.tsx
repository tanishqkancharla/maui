import { createIcon } from "./createIcon"

export const Location = createIcon('Location', function Location(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M10 14L12.75 19.25L19.25 4.75L4.75 11.75L10 14Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
