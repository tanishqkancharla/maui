import { createIcon } from "./createIcon"

export const Checkmark = createIcon('Checkmark', function Checkmark(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 12.75L10 15.25L16.25 8.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
