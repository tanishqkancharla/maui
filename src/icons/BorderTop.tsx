import { createIcon } from "./createIcon"

export const BorderTop = createIcon('BorderTop', function BorderTop(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v.01M6 9v.01M18 12v.01M6 12v.01m6-.01v.01M18 15v.01M6 15v.01M9 18v.01M6 18v.01m9-.01v.01m3-.01v.01M12 18v.01m6.25-12.26H5.75" />
		</svg>
	)
})
