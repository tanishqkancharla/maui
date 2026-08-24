import { createIcon } from "./createIcon"

export const ChartLeftArrowUp = createIcon('ChartLeftArrowUp', function ChartLeftArrowUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.75 13.75V19.25H14.25V13.75H11.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6.75 19.25H9.25V9.25H11L8 4.75L4.75 9.25H6.75V19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16.75 13.75V19.25H19.25V13.75H16.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
