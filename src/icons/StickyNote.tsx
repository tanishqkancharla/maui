import { createIcon } from "./createIcon"

export const StickyNote = createIcon('StickyNote', function StickyNote(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.75 19.25h-7a2 2 0 0 1-2-2V6.75a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v7m-5.5 5.5 5.5-5.5m-5.5 5.5v-4.5a1 1 0 0 1 1-1h4.5" />
		</svg>
	)
})
