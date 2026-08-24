import { createIcon } from "./createIcon"

export const Send = createIcon('Send', function Send(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.75 19.25L12 4.75L19.25 19.25L12 15.75L4.75 19.25Z" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15.5V12.75" />
		</svg>
	)
})
