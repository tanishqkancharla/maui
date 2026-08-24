import { createIcon } from "./createIcon"

export const Infinity = createIcon('Infinity', function Infinity(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 12.5c0 1-2.205 2.75-4 2.75s-3.25-.556-3.25-2.75S6.205 9.75 8 9.75s4 1.75 4 2.75Zm0 0c0 1 2.205 2.75 4 2.75s3.25-.556 3.25-2.75S17.795 9.75 16 9.75s-4 1.75-4 2.75Z" />
		</svg>
	)
})
