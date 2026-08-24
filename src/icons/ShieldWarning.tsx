import { createIcon } from "./createIcon"

export const ShieldWarning = createIcon('ShieldWarning', function ShieldWarning(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 4.75L4.75002 8C4.75002 8 4.00002 19.25 12 19.25C20 19.25 19.25 8 19.25 8L12 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12.5 15C12.5 15.2761 12.2761 15.5 12 15.5C11.7239 15.5 11.5 15.2761 11.5 15C11.5 14.7239 11.7239 14.5 12 14.5C12.2761 14.5 12.5 14.7239 12.5 15Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 9V11" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
