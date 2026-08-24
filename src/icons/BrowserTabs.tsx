import { createIcon } from "./createIcon"

export const BrowserTabs = createIcon('BrowserTabs', function BrowserTabs(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 4.75h-2a3 3 0 0 0-3 3v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-8m-9.5-3.5v2.5a1 1 0 0 0 1 1h3.5m-4.5-3.5h4.5m5 3.5v-.5a3 3 0 0 0-3-3h-2m5 3.5h-5m0 0v-3.5" />
		</svg>
	)
})
