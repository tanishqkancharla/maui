import { createIcon } from "./createIcon"

export const Shirt1 = createIcon('Shirt1', function Shirt1(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m9 5.25-4.25 4.5L6 12.25h1.75v6s1.25 1 4.25 1 4.25-1 4.25-1v-6H18l1.25-2.5L15 5.25m-6 0s3 1.25 3 5c0-3.75 3-5 3-5m-6 0s1.5-.465 3-.465 3 .465 3 .465" />
		</svg>
	)
})
