import { createIcon } from "./createIcon"

export const Timer2 = createIcon('Timer2', function Timer2(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 19.25C15.4518 19.25 18.25 16.4518 18.25 13C18.25 9.54822 15.4518 6.75 12 6.75V12.75H5.75C5.75 16.25 8.54822 19.25 12 19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 6.5V5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10 4.75H14" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M5.75 7.75L7.25 9.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
