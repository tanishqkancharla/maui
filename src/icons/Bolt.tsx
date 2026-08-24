import { createIcon } from "./createIcon"

export const Bolt = createIcon('Bolt', function Bolt(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M10.75 13.25H6.75L13.25 4.75V10.75H17.25L10.75 19.25V13.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
