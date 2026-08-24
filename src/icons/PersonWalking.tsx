import { createIcon } from "./createIcon"

export const PersonWalking = createIcon('PersonWalking', function PersonWalking(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 13.25L8.28521 10.8416C8.55678 9.61949 9.6407 8.75 10.8926 8.75C12.2088 8.75 13.0191 10.1011 13.5141 11.3207C13.7527 11.9088 14.2568 12.3403 15.25 12.25M11.25 9V13.632C11.25 14.0107 11.464 14.357 11.8028 14.5264L13.1444 15.1972C13.822 15.536 14.25 16.2285 14.25 16.9861V19.25M10.25 15.75C10.25 15.75 10 18 7.75 19.25M13.75 6.5C13.75 7.4665 12.9665 8.25 12 8.25C11.0335 8.25 10.25 7.4665 10.25 6.5C10.25 5.5335 11.0335 4.75 12 4.75C12.9665 4.75 13.75 5.5335 13.75 6.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
