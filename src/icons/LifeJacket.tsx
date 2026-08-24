import { createIcon } from "./createIcon"

export const LifeJacket = createIcon('LifeJacket', function LifeJacket(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m12 8-2-3.25H7.75c0 5-3 9-3 9v3.5a2 2 0 0 0 2 2H12M12 8v11.25M12 8l2-3.25h2.25c0 5 3 9 3 9v3.5a2 2 0 0 1-2 2H12m-2.25-5.5h4.5" />
		</svg>
	)
})
