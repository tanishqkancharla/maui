import { createIcon } from "./createIcon"

export const HandHome = createIcon('HandHome', function HandHome(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.25 14L10.05 12.32C10.6716 11.947 11.383 11.75 12.1079 11.75H13.25V14L10.75 15.25M7.25 19.25C13.75 19.25 19.25 14.75 19.25 14.75V12.75H13.25M7.25 19.25V12.75H4.75V19.25H7.25ZM14.75 9.25V7.19907C14.75 6.91343 14.8721 6.64142 15.0856 6.45166L17 4.75L18.9144 6.45166C19.1279 6.64142 19.25 6.91343 19.25 7.19907V9.25H14.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
