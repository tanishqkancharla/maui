import { createIcon } from "./createIcon"

export const ReportsChart = createIcon('ReportsChart', function ReportsChart(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 16.25H6.75a2 2 0 0 1-2-2v-7.5a2 2 0 0 1 2-2h10.5a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H13.5m-3 0-1.75 3m1.75-3h3m0 0 1.75 3m-6.5-7v-3.5m3.25 3.5v-2.5m3.25 2.5v-1.5" />
		</svg>
	)
})
