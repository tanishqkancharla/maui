import { createIcon } from "./createIcon"

export const Italic = createIcon('Italic', function Italic(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14 4.75H11.75M14 4.75H16.25M14 4.75L10 19.25M10 19.25H7.75M10 19.25H12.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
