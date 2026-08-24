import { createIcon } from "./createIcon"

export const MailOpenAttachment = createIcon('MailOpenAttachment', function MailOpenAttachment(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 11.25V8.75L12 4.75L4.75 8.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H11.25M19 9L13.25 12.25H10.75L5 9M17.25 16.25V15C17.25 14.3096 16.6904 13.75 16 13.75C15.3096 13.75 14.75 14.3096 14.75 15V17C14.75 18.2426 15.7574 19.25 17 19.25C18.2426 19.25 19.25 18.2426 19.25 17V16.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
