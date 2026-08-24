import { createIcon } from "./createIcon"

export const BezierControlPoints = createIcon('BezierControlPoints', function BezierControlPoints(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.75 6H11.75M16.75 6C16.75 6.69036 17.3096 7.25 18 7.25C18.6904 7.25 19.25 6.69036 19.25 6C19.25 5.30964 18.6904 4.75 18 4.75C17.3096 4.75 16.75 5.30964 16.75 6ZM7.25 18H12.25M7.25 18C7.25 17.3096 6.69036 16.75 6 16.75C5.30964 16.75 4.75 17.3096 4.75 18C4.75 18.6904 5.30964 19.25 6 19.25C6.69036 19.25 7.25 18.6904 7.25 18ZM4.75 5.75C7.42857 5.75 10.5 7.5 12 12C13.5 16.5 16.5714 18.25 19.25 18.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
