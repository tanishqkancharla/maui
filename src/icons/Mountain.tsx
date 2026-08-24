import { createIcon } from "./createIcon"

export const Mountain = createIcon('Mountain', function Mountain(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M13.25 19.25H4.75L7.14611 13.3302C7.8205 11.664 10.1795 11.664 10.8539 13.3302L13.25 19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6.75 19.25H19.25L13 4.75L9.5 12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
