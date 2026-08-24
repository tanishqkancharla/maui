import { createIcon } from "./createIcon"

export const H1 = createIcon('H1', function H1(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.75 7.75v8.5m5.5-8.5v8.5m-5.25-4h5m5.25 4v-8.5l-1.5 1.5m1.5 7h-1.5m1.5 0h2" />
		</svg>
	)
})
