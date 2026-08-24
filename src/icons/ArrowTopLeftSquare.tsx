import { createIcon } from "./createIcon"

export const ArrowTopLeftSquare = createIcon('ArrowTopLeftSquare', function ArrowTopLeftSquare(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V12.75M16.25 16.25L11.75 11.75M11.75 11.75H15.125M11.75 11.75V15.125M5.75 9.25H8.25C8.80228 9.25 9.25 8.80228 9.25 8.25V5.75C9.25 5.19772 8.80228 4.75 8.25 4.75H5.75C5.19772 4.75 4.75 5.19772 4.75 5.75V8.25C4.75 8.80228 5.19772 9.25 5.75 9.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
