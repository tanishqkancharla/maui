import { createIcon } from "./createIcon"

export const Target = createIcon('Target', function Target(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<circle cx={12} cy={12} r={7.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
			<circle cx={12} cy={12} r={4.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
			<circle cx={12} cy={12} r={1.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
		</svg>
	)
})
