import { createIcon } from "./createIcon"

export const Octagon = createIcon('Octagon', function Octagon(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9 4.75L4.75 9V15L9 19.25H15L19.25 15V9L15 4.75H9Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
