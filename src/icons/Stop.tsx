import { createIcon } from "./createIcon"

export const Stop = createIcon('Stop', function Stop(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<rect width={12.5} height={12.5} x={5.75} y={5.75} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} rx={1} />
		</svg>
	)
})
