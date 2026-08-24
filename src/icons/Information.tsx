import { createIcon } from "./createIcon"

export const Information = createIcon('Information', function Information(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 13V15" />
			<circle cx={12} cy={9} r={1} fill="currentColor" />
			<circle cx={12} cy={12} r={7.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
		</svg>
	)
})
