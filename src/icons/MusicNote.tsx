import { createIcon } from "./createIcon"

export const MusicNote = createIcon('MusicNote', function MusicNote(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.25 16.5a2.75 2.75 0 1 0-5.5 0 2.75 2.75 0 0 0 5.5 0Zm0 0V4.75c7 0 7 6.5 7 6.5" />
		</svg>
	)
})
