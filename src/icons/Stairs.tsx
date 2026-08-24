import { createIcon } from "./createIcon"

export const Stairs = createIcon('Stairs', function Stairs(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.75 6.75H19.25V19.25H6.75V14.75H10.75V10.75H14.75V6.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
