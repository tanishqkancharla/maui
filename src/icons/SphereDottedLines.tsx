import { createIcon } from "./createIcon"

export const SphereDottedLines = createIcon('SphereDottedLines', function SphereDottedLines(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 12C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12M19.25 12C19.25 13.7949 16.0041 15.25 12 15.25C7.99594 15.25 4.75 13.7949 4.75 12M13 9.03066C13.704 9.0742 14.3757 9.16305 15 9.29042M9 9.29042C9.62432 9.16305 10.296 9.0742 11 9.03066M6 10.4251C6.29096 10.2332 6.62652 10.056 7 9.89654M17 9.89654C17.3735 10.056 17.709 10.2332 18 10.4251" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
