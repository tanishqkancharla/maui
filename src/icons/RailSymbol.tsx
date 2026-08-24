import { createIcon } from "./createIcon"

export const RailSymbol = createIcon('RailSymbol', function RailSymbol(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 9H19.25M4.75 15H19.25M9.75 4.75L14.25 9L9.75 15L14.25 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
