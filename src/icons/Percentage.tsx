import { createIcon } from "./createIcon"

export const Percentage = createIcon('Percentage', function Percentage(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75L6.75 17.25" />
			<circle cx={16} cy={16} r={1.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
			<circle cx={8} cy={8} r={1.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
		</svg>
	)
})
