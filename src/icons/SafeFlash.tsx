import { createIcon } from "./createIcon"

export const SafeFlash = createIcon('SafeFlash', function SafeFlash(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.417 8.75 10.75 12h2.5l-1.667 3.25M4.75 6.75V12a7.25 7.25 0 1 0 14.5 0V6.75l-7.25-2-7.25 2Z" />
		</svg>
	)
})
