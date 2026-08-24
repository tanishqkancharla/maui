import { createIcon } from "./createIcon"

export const Navigation = createIcon('Navigation', function Navigation(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 4.75L5.75 19.25L12 15.75L18.25 19.25L12 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
