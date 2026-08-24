import { createIcon } from "./createIcon"

export const ArrowTopRightSquare = createIcon('ArrowTopRightSquare', function ArrowTopRightSquare(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M11.25 4.75H6.75C5.64543 4.75 4.75 5.64543 4.75 6.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V12.75M7.75 16.25L12.25 11.75M12.25 11.75H8.875M12.25 11.75V15.125M15.75 9.25H18.25C18.8023 9.25 19.25 8.80228 19.25 8.25V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H15.75C15.1977 4.75 14.75 5.19772 14.75 5.75V8.25C14.75 8.80228 15.1977 9.25 15.75 9.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
