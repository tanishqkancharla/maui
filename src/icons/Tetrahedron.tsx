import { createIcon } from "./createIcon"

export const Tetrahedron = createIcon('Tetrahedron', function Tetrahedron(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 9.75V10.25M12 12.75V13.25M8.25 16.75L7.75 17.25M15.75 16.75L16.25 17.25M10.25 14.75L9.75 15.25M13.75 14.75L14.25 15.25M4.75 19.25L12 4.75L19.25 19.25H4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
