import { createIcon } from "./createIcon"

export const CursorBlocked = createIcon('CursorBlocked', function CursorBlocked(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M18.2981 18.2981C19.5673 17.0289 19.5673 14.9711 18.2981 13.7019C17.0289 12.4327 14.9711 12.4327 13.7019 13.7019M18.2981 18.2981C17.0289 19.5673 14.9711 19.5673 13.7019 18.2981C12.4327 17.0289 12.4327 14.9711 13.7019 13.7019M18.2981 18.2981L13.7019 13.7019M4.75 4.75L6.86111 15.25L9.5 10.5L14.25 9.06818L4.75 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
