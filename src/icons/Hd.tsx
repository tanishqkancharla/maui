import { createIcon } from "./createIcon"

export const Hd = createIcon('Hd', function Hd(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 9.75V14.25M10.75 9.75V14.25M8 11.75H10M6.75 18.25H17.25C18.3546 18.25 19.25 17.3546 19.25 16.25V7.75C19.25 6.64543 18.3546 5.75 17.25 5.75H6.75C5.64543 5.75 4.75 6.64543 4.75 7.75V16.25C4.75 17.3546 5.64543 18.25 6.75 18.25ZM13.25 9.75V14.25H14.25C15.3546 14.25 16.25 13.3546 16.25 12.25V11.75C16.25 10.6454 15.3546 9.75 14.25 9.75H13.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
