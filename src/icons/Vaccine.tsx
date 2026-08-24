import { createIcon } from "./createIcon"

export const Vaccine = createIcon('Vaccine', function Vaccine(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9 6.75L6.75 9L14.875 17.125C15.4963 17.7463 16.5037 17.7463 17.125 17.125C17.7463 16.5037 17.7463 15.4963 17.125 14.875L9 6.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M7.5 7.5L5.75 5.75M5.75 5.75L6.75 4.75M5.75 5.75L4.75 6.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M17.5 17.5L19.25 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
