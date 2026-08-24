import { createIcon } from "./createIcon"

export const Highlighter = createIcon('Highlighter', function Highlighter(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.25 17.25L19.25 7.75L16.25 4.75L6.75 12.75M11.25 17.25L4.75 19.25M11.25 17.25L6.75 12.75M4.75 19.25L6.75 12.75M4.75 19.25H19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
