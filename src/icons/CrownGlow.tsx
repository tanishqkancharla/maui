import { createIcon } from "./createIcon"

export const CrownGlow = createIcon('CrownGlow', function CrownGlow(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.75v.5m3.625.471-.25.433m2.904 2.22-.433.25m-11.692.001-.433-.25m2.904-2.22-.25-.434M5.75 11.75v6.5a1 1 0 0 0 1 1h10.5a1 1 0 0 0 1-1v-6.5l-3.75 2.5-2.5-2.5-2.5 2.5-3.75-2.5Z" />
		</svg>
	)
})
