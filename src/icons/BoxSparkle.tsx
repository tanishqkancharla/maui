import { createIcon } from "./createIcon"

export const BoxSparkle = createIcon('BoxSparkle', function BoxSparkle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16 9.75H5.75C5.19772 9.75 4.75 10.1977 4.75 10.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V10.75C19.25 10.1977 18.8023 9.75 18.25 9.75H16ZM16 9.75L18.25 4.75M10.75 14.25H13.25M12 4.75C12 4.75 12 6 10.75 6C12 6 12 7.25 12 7.25C12 7.25 12 6 13.25 6C12 6 12 4.75 12 4.75ZM7.5 5.75C7.5 5.75 7.5 6.5 6.75 6.5C7.5 6.5 7.5 7.25 7.5 7.25C7.5 7.25 7.5 6.5 8.25 6.5C7.5 6.5 7.5 5.75 7.5 5.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
