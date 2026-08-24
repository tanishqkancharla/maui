import { createIcon } from "./createIcon"

export const Badge = createIcon('Badge', function Badge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 8.75L18.25 4.75H5.75L9.75 8.75" />
			<circle cx={12} cy={14} r={5.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
		</svg>
	)
})
