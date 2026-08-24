import { createIcon } from "./createIcon"

export const Pencil2 = createIcon('Pencil2', function Pencil2(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 19.25V12L12 4.75L16.25 12V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M10.25 8C10.25 8 10.5 9.25 12 9.25C13.5 9.25 13.75 8 13.75 8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M16 13.75H8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
