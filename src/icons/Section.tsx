import { createIcon } from "./createIcon"

export const Section = createIcon('Section', function Section(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M13.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V9.25M13.25 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V9.25M13.25 4.75V7.25C13.25 8.35457 12.3546 9.25 11.25 9.25H4.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
