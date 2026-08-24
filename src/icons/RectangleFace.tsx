import { createIcon } from "./createIcon"

export const RectangleFace = createIcon('RectangleFace', function RectangleFace(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.75 9.75V10.25M7.75 13C7.75 13 9 14.25 12 14.25C15 14.25 16.25 13 16.25 13M14.25 9.75V10.25M4.75 5.75H19.25V18.25H4.75V5.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
