import { createIcon } from "./createIcon"

export const WindowError = createIcon('WindowError', function WindowError(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M19.25 8.25v-.5a2 2 0 0 0-2-2H6.75a2 2 0 0 0-2 2v.5m14.5 0H4.75m14.5 0v3m-14.5-3v8a2 2 0 0 0 2 2h4.5m4.206-2.886a2.25 2.25 0 0 1 3.18 3.18m-3.18-3.18a2.25 2.25 0 1 0 3.18 3.18m-3.18-3.18 3.18 3.18" />
		</svg>
	)
})
