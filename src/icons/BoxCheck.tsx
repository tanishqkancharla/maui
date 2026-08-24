import { createIcon } from "./createIcon"

export const BoxCheck = createIcon('BoxCheck', function BoxCheck(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m5 8.12 6.25 3.38M5 8.12v7l6.25 3.38v-7M5 8.12 11.25 5l6.25 3.12m0 0v4.38m0-4.38-6.25 3.38M19.5 15s-1.929 2.09-2.893 4.5L15 17.571" />
		</svg>
	)
})
