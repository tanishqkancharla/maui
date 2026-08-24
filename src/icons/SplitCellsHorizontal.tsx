import { createIcon } from "./createIcon"

export const SplitCellsHorizontal = createIcon('SplitCellsHorizontal', function SplitCellsHorizontal(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.75h7.25v14.5H12m0-14.5H4.75v14.5H12m0-14.5v2.5m0 12v-2.5m1.75-7 2.5 2.25m0 0-2.5 2.25m2.5-2.25h-8.5m2.5-2.25L7.75 12m0 0 2.5 2.25" />
		</svg>
	)
})
