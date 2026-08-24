import { createIcon } from "./createIcon"

export const Waves = createIcon('Waves', function Waves(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 12.25c0-4.556 3.694-6.5 8.25-6.5A3.25 3.25 0 1 0 16.25 9a3.25 3.25 0 0 0 3.25 3.25M4.75 17s3.107-2.813 7.25 0 7.25 0 7.25 0" />
		</svg>
	)
})
