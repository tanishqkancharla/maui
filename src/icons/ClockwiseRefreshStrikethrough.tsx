import { createIcon } from "./createIcon"

export const ClockwiseRefreshStrikethrough = createIcon('ClockwiseRefreshStrikethrough', function ClockwiseRefreshStrikethrough(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.25 14.75L8.75 17M8.75 17L11.25 19.25M8.75 17H13.25M19.25 10.75V11C19.25 13.2346 18.0284 15.1839 16.2165 16.2165M10.75 7H15.25M15.25 7L12.75 9.25M15.25 7L12.75 4.75M4.75 13.25V13C4.75 10.7654 5.97163 8.81605 7.78347 7.78347M5 5L7.78347 7.78347M7.78347 7.78347L16.2165 16.2165M16.2165 16.2165L19 19" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
