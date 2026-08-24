import { createIcon } from "./createIcon"

export const Back = createIcon('Back', function Back(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 12L11.25 5.75V9.75H18.25C18.8023 9.75 19.25 10.1977 19.25 10.75V13.25C19.25 13.8023 18.8023 14.25 18.25 14.25H11.25V18.25L4.75 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
