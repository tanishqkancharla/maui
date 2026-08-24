import { createIcon } from "./createIcon"

export const DoNotDisturb = createIcon('DoNotDisturb', function DoNotDisturb(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15.15 9.92857C15.15 10.5368 14.735 11.0666 14.1444 11.2123L8.27115 12.6606C7.37778 12.8809 6.75 13.6823 6.75 14.6024V17.25C6.75 18.3546 7.64543 19.25 8.75 19.25H15.25C16.3546 19.25 17.25 18.3546 17.25 17.25V9.92857C17.25 7.06852 14.8994 4.75 11.9999 4.75C10.6224 4.75 9.36877 5.27331 8.43225 6.12938C8.00203 6.52265 8.11725 7.19299 8.59374 7.52871C9.06101 7.85794 9.70004 7.73145 10.1668 7.40146C10.6832 7.03635 11.3161 6.82143 11.9999 6.82143C13.7396 6.82143 15.15 8.21254 15.15 9.92857Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
