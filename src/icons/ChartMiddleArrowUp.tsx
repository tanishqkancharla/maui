import { createIcon } from "./createIcon"

export const ChartMiddleArrowUp = createIcon('ChartMiddleArrowUp', function ChartMiddleArrowUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 13.75V19.25H7.25V13.75H4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10.75 19.25H13.25V9.25H15L12 4.75L8.75 9.25H10.75V19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16.75 13.75V19.25H19.25V13.75H16.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
