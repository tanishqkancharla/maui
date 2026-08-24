import { createIcon } from "./createIcon"

export const BorderRadiusTopLeft = createIcon('BorderRadiusTopLeft', function BorderRadiusTopLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v.01M18 12v.01M12 12v.01M18 15v.01M6 15v.01M9 18v.01M6 18v.01m9-.01v.01M15 6v.01M18 18v.01M18 6v.01M12 18v.01m-.75-12.26h-1.5a4 4 0 0 0-4 4v1.5" />
		</svg>
	)
})
