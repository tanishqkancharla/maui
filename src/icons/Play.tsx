import { createIcon } from "./createIcon"

export const Play = createIcon('Play', function Play(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.25 12L5.75 5.75V18.25L18.25 12Z" />
		</svg>
	)
})
