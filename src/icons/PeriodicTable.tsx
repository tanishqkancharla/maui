import { createIcon } from "./createIcon"

export const PeriodicTable = createIcon('PeriodicTable', function PeriodicTable(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M13.25 12V17L9 19.25L4.75 17V12L9 9.75L13.25 12ZM13.25 12L17 10.25M17 10.25L14.75 9V6L17 4.75L19.25 6V9L17 10.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.75 14.25V13.25L9 12.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
