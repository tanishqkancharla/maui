import { createIcon } from "./createIcon"

export const Hexagon = createIcon('Hexagon', function Hexagon(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 4.75L4.75 8.75V15.25L8.75 19.25H15.25L19.25 15.25V8.75L15.25 4.75H8.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
