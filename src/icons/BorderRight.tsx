import { createIcon } from "./createIcon"

export const BorderRight = createIcon('BorderRight', function BorderRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 9v.01M6 12v.01m6-.01v.01M6 15v.01M9 6v.01M9 18v.01M15 6v.01M15 18v.01M6 6v.01M6 18v.01M12 6v.01M12 18v.01m6.25.24V5.75" />
		</svg>
	)
})
