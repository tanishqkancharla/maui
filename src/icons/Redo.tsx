import { createIcon } from "./createIcon"

export const Redo = createIcon('Redo', function Redo(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.75 4.75L19.25 9L14.75 13.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.25 9H8.75C6.54086 9 4.75 10.7909 4.75 13V19.25" />
		</svg>
	)
})
