import { createIcon } from "./createIcon"

export const PencilInCircle = createIcon('PencilInCircle', function PencilInCircle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 18.894V12m0 0L12 8.75 14.25 12m-4.5 0S10 14.25 12 14.25 14.25 12 14.25 12m0 0v6.894m5-6.894a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z" />
		</svg>
	)
})
