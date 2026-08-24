import { createIcon } from "./createIcon"

export const ZoomOut = createIcon('ZoomOut', function ZoomOut(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<circle cx={11} cy={11} r={6.25} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.5 15.5L19.25 19.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.25 11L8.75 11" />
		</svg>
	)
})
