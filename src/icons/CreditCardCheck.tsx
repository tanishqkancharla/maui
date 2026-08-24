import { createIcon } from "./createIcon"

export const CreditCardCheck = createIcon('CreditCardCheck', function CreditCardCheck(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 10.25H19.25V7.75C19.25 6.64543 18.3546 5.75 17.25 5.75H6.75C5.64543 5.75 4.75 6.64543 4.75 7.75V16.25C4.75 17.3546 5.64543 18.25 6.75 18.25H11.25M7.75 14.25H11.25M19.25 13.75C19.25 13.75 17.3214 15.8393 16.3571 18.25L14.75 16.3214" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
