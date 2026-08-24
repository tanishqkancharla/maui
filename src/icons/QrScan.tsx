import { createIcon } from "./createIcon"

export const QrScan = createIcon('QrScan', function QrScan(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 7.25v-2.5h14.5v2.5m-14.5 9.5v2.5h14.5v-2.5M4.75 12h14.5" />
		</svg>
	)
})
