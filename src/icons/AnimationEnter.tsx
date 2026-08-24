import { createIcon } from "./createIcon"

export const AnimationEnter = createIcon('AnimationEnter', function AnimationEnter(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10.75 7 .544-.543a2.412 2.412 0 0 1 3.412 0l3.838 3.837c.941.942.941 2.47 0 3.412l-3.838 3.838a2.412 2.412 0 0 1-3.412 0L10.751 17m1.499-5h-7.5m7.5 0-2.5-2.25m2.5 2.25-2.5 2.25" />
		</svg>
	)
})
