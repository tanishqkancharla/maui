import { createIcon } from "./createIcon"

export const Nut = createIcon('Nut', function Nut(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 8L12 4.75L19.25 8V16L12 19.25L4.75 16V8Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<circle cx={12} cy={12} r={2.25} stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
