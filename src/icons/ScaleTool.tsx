import { createIcon } from "./createIcon"

export const ScaleTool = createIcon('ScaleTool', function ScaleTool(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 11.25v-3.5m0 0h3.5m-3.5 0 8.5 8.5m0 0v-3.5m0 3.5h-3.5m-8-7v-4.5h4.5m10 10v4.5h-4.5" />
		</svg>
	)
})
