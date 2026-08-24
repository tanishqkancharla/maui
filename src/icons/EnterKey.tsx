import { createIcon } from "./createIcon"

export const EnterKey = createIcon('EnterKey', function EnterKey(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75V12a2 2 0 0 1-2 2h-8.5m0 0 3.5-3.25M6.75 14l3.5 3.25" />
		</svg>
	)
})
