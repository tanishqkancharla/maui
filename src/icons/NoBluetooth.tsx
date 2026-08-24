import { createIcon } from "./createIcon"

export const NoBluetooth = createIcon('NoBluetooth', function NoBluetooth(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.75 12v6.25l4.5-3.25-4.5-3Zm0 0-6-4.25m6 4.25-3 2.25m3-6v-2.5L15.25 9 13 10.5" />
		</svg>
	)
})
