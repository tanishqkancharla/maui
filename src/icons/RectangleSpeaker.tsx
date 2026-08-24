import { createIcon } from "./createIcon"

export const RectangleSpeaker = createIcon('RectangleSpeaker', function RectangleSpeaker(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 9.25V7.75C19.25 6.64543 18.3546 5.75 17.25 5.75H6.75C5.64543 5.75 4.75 6.64543 4.75 7.75V16.25C4.75 17.3546 5.64543 18.25 6.75 18.25H10.25M16.0714 14.25L19.25 12.75V19.25L16.0714 18.25H14.75C14.1977 18.25 13.75 17.8023 13.75 17.25V15.25C13.75 14.6977 14.1977 14.25 14.75 14.25H16.0714Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
