import { createIcon } from "./createIcon"

export const ArrowDownLeft = createIcon('ArrowDownLeft', function ArrowDownLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 8.75V17.25H15.25" />
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17.25 6.75" />
		</svg>
	)
})
