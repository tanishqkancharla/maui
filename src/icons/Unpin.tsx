import { createIcon } from "./createIcon"

export const Unpin = createIcon('Unpin', function Unpin(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.75 8.5V6.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V10l2 5.25H15.5M7.988 12 6.75 15.25H12v4M4.75 4.75l14.5 14.5" />
		</svg>
	)
})
