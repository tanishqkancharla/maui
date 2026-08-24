import { createIcon } from "./createIcon"

export const Parenthesis = createIcon('Parenthesis', function Parenthesis(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.25 4.75C8.25 4.75 4.75 7.06294 4.75 12C4.75 16.9371 8.25 19.25 8.25 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M15.75 4.75C15.75 4.75 19.25 7.06294 19.25 12C19.25 16.9371 15.75 19.25 15.75 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
