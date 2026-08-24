import { createIcon } from "./createIcon"

export const AspectRatio = createIcon('AspectRatio', function AspectRatio(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 11.25v-1.5a1 1 0 0 1 1-1h1.5m6 4v1.5a1 1 0 0 1-1 1h-1.5m-7 3h10.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v8.5a2 2 0 0 0 2 2Z" />
		</svg>
	)
})
