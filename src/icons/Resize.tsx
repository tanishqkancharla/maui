import { createIcon } from "./createIcon"

export const Resize = createIcon('Resize', function Resize(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 4.75L9.25 9.25M9.25 9.25V5.75M9.25 9.25H5.75M19.25 4.75L14.75 9.25M14.75 9.25V5.75M14.75 9.25H18.25M4.75 19.25L9.25 14.75M9.25 14.75V18.25M9.25 14.75H5.75M19.25 19.25L14.75 14.75M14.75 14.75V18.25M14.75 14.75H18.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
