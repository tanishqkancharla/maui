import { createIcon } from "./createIcon"

export const CubeShape = createIcon('CubeShape', function CubeShape(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.75 9.75v8.5m0-8.5h8.5m-8.5 0 4-4m-4 12.5h8.5m-8.5 0 4-4m4.5 4v-8.5m0 8.5 4-4m-4-4.5 4-4m-8.5 0v8.5m0-8.5h8.5m-8.5 8.5h8.5m0 0v-8.5" />
		</svg>
	)
})
