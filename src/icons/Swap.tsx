import { createIcon } from "./createIcon"

export const Swap = createIcon('Swap', function Swap(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 10.25H19.25L13.75 4.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M19.25 13.75H4.75L10.25 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
