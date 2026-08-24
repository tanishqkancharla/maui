import { createIcon } from "./createIcon"

export const Icon3dRectangle = createIcon('Icon3dRectangle', function Icon3dRectangle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 13.75V19.25H13.25M4.75 13.75H13.25M4.75 13.75L10.75 4.75H19.25M13.25 19.25V13.75M13.25 19.25L19.25 10.25V4.75M13.25 13.75L19.25 4.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
