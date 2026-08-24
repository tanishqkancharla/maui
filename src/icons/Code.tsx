import { createIcon } from "./createIcon"

export const Code = createIcon('Code', function Code(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<rect width={14.5} height={14.5} x={4.75} y={4.75} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} rx={2} />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.75 10.75L11.25 13L8.75 15.25" />
		</svg>
	)
})
