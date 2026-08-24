import { createIcon } from "./createIcon"

export const Undo = createIcon('Undo', function Undo(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.25 4.75L4.75 9L9.25 13.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.5 9H15.25C17.4591 9 19.25 10.7909 19.25 13V19.25" />
		</svg>
	)
})
