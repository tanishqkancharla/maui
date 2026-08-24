import { createIcon } from "./createIcon"

export const BorderBottom = createIcon('BorderBottom', function BorderBottom(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9v.01M18 9v.01M6 12v.01M18 12v.01M12 12v.01M6 15v.01M18 15v.01M6 6v.01M9 6v.01M15 6v.01M18 6v.01M12 6v.01M5.75 18.25h12.5" />
		</svg>
	)
})
