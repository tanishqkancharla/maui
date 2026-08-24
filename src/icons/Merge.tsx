import { createIcon } from "./createIcon"

export const Merge = createIcon('Merge', function Merge(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4.75 19.25 7.25-5V5m2 10.63 5.25 3.62m-10.5-11L12 4.75l3.25 3.5" />
		</svg>
	)
})
