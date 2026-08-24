import { createIcon } from "./createIcon"

export const Rupee = createIcon('Rupee', function Rupee(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 5.75h3m0 0h5.5m-5.5 0s3.5 0 3.5 3.5m-6.5 0h6.5m0 0h2m-2 0c0 3.5-6.5 3.5-6.5 3.5L15 18" />
		</svg>
	)
})
