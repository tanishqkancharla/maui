import { createIcon } from "./createIcon"

export const SpeedSlow = createIcon('SpeedSlow', function SpeedSlow(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.25 19.25H12A6.25 6.25 0 1 1 18.17 12M16.5 8.5l.75-.75M12 6.5V4.75m0 0H9.75m2.25 0h2.25m2.5 11h2.5l-2.5 3.5h2.5m-6.5-6.5h1.5l-1.5 2.5h1.5" />
		</svg>
	)
})
