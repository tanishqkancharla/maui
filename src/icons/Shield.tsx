import { createIcon } from "./createIcon"

export const Shield = createIcon('Shield', function Shield(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.75L4.75001 8C4.75001 8 4.00001 19.25 12 19.25C20 19.25 19.25 8 19.25 8L12 4.75Z" />
		</svg>
	)
})
