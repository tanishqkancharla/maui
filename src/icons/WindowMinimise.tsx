import { createIcon } from "./createIcon"

export const WindowMinimise = createIcon('WindowMinimise', function WindowMinimise(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.75 18.25h2.5a2 2 0 0 0 2-2v-8.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v.5m11.5.5-2.5 2.5m0 0h2.375m-2.375 0V8.875m-9 7.375v-2.5a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2v2.5a2 2 0 0 1-2 2h-2.5a2 2 0 0 1-2-2Z" />
		</svg>
	)
})
