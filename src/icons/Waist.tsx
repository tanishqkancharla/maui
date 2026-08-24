import { createIcon } from "./createIcon"

export const Waist = createIcon('Waist', function Waist(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 4.75S16 8.5 16 12.75m0 0H8m8 0s.695.945 1.313 2.25M8 12.75s-.695.945-1.313 2.25M8 12.75c0-4.25-1.25-8-1.25-8M6.687 15a9.88 9.88 0 0 0-.937 4.25M6.687 15C11 15 12 19.25 12 19.25S13 15 17.313 15m0 0a9.881 9.881 0 0 1 .937 4.25" />
		</svg>
	)
})
