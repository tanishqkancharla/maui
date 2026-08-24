import { createIcon } from "./createIcon"

export const Ladder = createIcon('Ladder', function Ladder(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.25 4.75L6.75 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11 7.25H16" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10 10.25H15" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9 13.25H14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8 16.25H13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M17.25 4.75L12.75 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
