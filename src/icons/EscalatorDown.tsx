import { createIcon } from "./createIcon"

export const EscalatorDown = createIcon('EscalatorDown', function EscalatorDown(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 4.75L14.8633 13.7396C15.5955 14.3905 16.5411 14.75 17.5208 14.75H19.25V19.25H16.5069C15.5356 19.25 14.5975 18.8966 13.8677 18.2558L4.75 10.25M14.75 4.75L19.25 9.25M19.25 9.25H15.75M19.25 9.25V5.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
