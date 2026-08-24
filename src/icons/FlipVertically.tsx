import { createIcon } from "./createIcon"

export const FlipVertically = createIcon('FlipVertically', function FlipVertically(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.75 5.75V18.25H19.25L14.75 5.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9.25 5.75V18.25H4.75L9.25 5.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
