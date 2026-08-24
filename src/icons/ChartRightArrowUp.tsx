import { createIcon } from "./createIcon"

export const ChartRightArrowUp = createIcon('ChartRightArrowUp', function ChartRightArrowUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.75 13.75V19.25H12.25V13.75H9.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M14.75 19.25H17.25V9.25H19.25L16.13 4.75L12.75 9.25H14.75V19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 13.75V19.25H7.25V13.75H4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
