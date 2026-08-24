import { createIcon } from "./createIcon"

export const FlagPriority3 = createIcon('FlagPriority3', function FlagPriority3(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 15.25C4.75 15.25 7 13.25 12 13.25C17 13.25 19.25 10 19.25 10L4.75 4.75V15.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
