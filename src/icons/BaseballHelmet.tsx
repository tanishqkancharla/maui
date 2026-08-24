import { createIcon } from "./createIcon"

export const BaseballHelmet = createIcon('BaseballHelmet', function BaseballHelmet(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M17 12H19.25C19.25 7.99594 16.0041 4.75 12 4.75C7.99594 4.75 4.75 7.99594 4.75 12V15C4.75 17.3472 6.65279 19.25 9 19.25M17 12H13.25V15C13.25 17.3472 11.3472 19.25 9 19.25M17 12V15C17 17.3472 15.0972 19.25 12.75 19.25H9M10.25 15C10.25 15.6904 9.69036 16.25 9 16.25C8.30964 16.25 7.75 15.6904 7.75 15C7.75 14.3096 8.30964 13.75 9 13.75C9.69036 13.75 10.25 14.3096 10.25 15Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
