import { createIcon } from "./createIcon"

export const Transform = createIcon('Transform', function Transform(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8 7.25H9.25V5.75M8 7.25H6.75V4.75H9.25V5.75M8 7.25L6 16.75M6 16.75H7.25V18.25M6 16.75H4.75V19.25H7.25V18.25M7.25 18.25H16.75M16.75 18.25V16.75H18M16.75 18.25V19.25H19.25V16.75H18M18 16.75L16 7.25M16 7.25H17.25V4.75H14.75V5.75M16 7.25H14.75V5.75M14.75 5.75H9.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
