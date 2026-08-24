import { createIcon } from "./createIcon"

export const Wheat = createIcon('Wheat', function Wheat(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19.25V4.75m.75 5.5v-1.5a3 3 0 0 1 3-3h1.5v1.5a3 3 0 0 1-3 3h-1.5Zm-1.5 0v-1.5a3 3 0 0 0-3-3h-1.5v1.5a3 3 0 0 0 3 3h1.5Zm1.5 7v-1.5a3 3 0 0 1 3-3h1.5v1.5a3 3 0 0 1-3 3h-1.5Zm-1.5 0v-1.5a3 3 0 0 0-3-3h-1.5v1.5a3 3 0 0 0 3 3h1.5Z" />
		</svg>
	)
})
