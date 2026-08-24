import { createIcon } from "./createIcon"

export const SplitCellsVertical = createIcon('SplitCellsVertical', function SplitCellsVertical(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 12V4.75h14.5V12m-14.5 0v7.25h14.5V12m-14.5 0h2.5m12 0h-2.5m-7-1.75L12 7.75m0 0 2.25 2.5M12 7.75v8.5m-2.25-2.5 2.25 2.5m0 0 2.25-2.5" />
		</svg>
	)
})
