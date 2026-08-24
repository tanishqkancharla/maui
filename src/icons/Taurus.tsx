import { createIcon } from "./createIcon"

export const Taurus = createIcon('Taurus', function Taurus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 15C7.75 12.6528 9.65279 10.75 12 10.75C14.3472 10.75 16.25 12.6528 16.25 15C16.25 17.3472 14.3472 19.25 12 19.25C9.65279 19.25 7.75 17.3472 7.75 15Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 4.75C10.5 4.75 6.5 10.75 12 10.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M19.25 4.75C13.5 4.75 17.5 10.75 12 10.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
