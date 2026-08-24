import { createIcon } from "./createIcon"

export const EscalatorUp = createIcon('EscalatorUp', function EscalatorUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 4.75L9.13666 13.7396C8.40445 14.3905 7.45886 14.75 6.4792 14.75H4.75V19.25H7.49312C8.46439 19.25 9.40248 18.8966 10.1323 18.2558L19.25 10.25M4.75 9.25L9.25 4.75M9.25 4.75H5.75M9.25 4.75V8.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
