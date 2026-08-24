import { createIcon } from "./createIcon"

export const Cheese = createIcon('Cheese', function Cheese(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.25 12.75H4.75V19.25H19.25V17H18.75C18.1977 17 17.75 16.5523 17.75 16V16C17.75 15.4477 18.1977 15 18.75 15H19.25V12.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M19.25 12.7812L8 4.75C8 4.75 4.75 7 4.75 13" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
