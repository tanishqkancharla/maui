import { createIcon } from "./createIcon"

export const Kerning = createIcon('Kerning', function Kerning(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 4.75V19.25M7.75 16.25L9.25 13.25M9.25 13.25L12 7.75L14.75 13.25M9.25 13.25H14.75M14.75 13.25L16.25 16.25M4.75 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
