import { createIcon } from "./createIcon"

export const CreditCardLock = createIcon('CreditCardLock', function CreditCardLock(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 11.25V7.75C19.25 6.64543 18.3546 5.75 17.25 5.75H6.75C5.64543 5.75 4.75 6.64543 4.75 7.75V16.25C4.75 17.3546 5.64543 18.25 6.75 18.25H11.25M5 10.25H19M7.75 14.25H11.25M15.75 15.5V14.75C15.75 14.1977 16.1977 13.75 16.75 13.75H17.25C17.8023 13.75 18.25 14.1977 18.25 14.75V15.5M14.75 15.75V18.25C14.75 18.8023 15.1977 19.25 15.75 19.25H18.25C18.8023 19.25 19.25 18.8023 19.25 18.25V15.75H14.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
