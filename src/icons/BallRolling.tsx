import { createIcon } from "./createIcon"

export const BallRolling = createIcon('BallRolling', function BallRolling(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m4.75 8.75 14.5 10.5H6.75a2 2 0 0 1-2-2v-8.5Zm1-1.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z" />
		</svg>
	)
})
