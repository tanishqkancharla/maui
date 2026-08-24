import { createIcon } from "./createIcon"

export const Aquarius = createIcon('Aquarius', function Aquarius(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 10.25L9.25 4.75V10.25L14.25 4.75V10.25L19.25 4.75V10.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 19.25L9.25 13.75V19.25L14.25 13.75V19.25L19.25 13.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
