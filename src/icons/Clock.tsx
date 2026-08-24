import { createIcon } from "./createIcon"

export const Clock = createIcon('Clock', function Clock(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<circle cx={12} cy={12} r={7.25} stroke="currentColor" strokeWidth={1.5} />
			<path stroke="currentColor" strokeWidth={1.5} d="M12 8V12L14 14" />
		</svg>
	)
})
