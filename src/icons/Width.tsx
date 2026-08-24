import { createIcon } from "./createIcon"

export const Width = createIcon('Width', function Width(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.75 9.75L17.25 12L14.75 14.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M9.25 9.75L6.75 12L9.25 14.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M19.25 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
