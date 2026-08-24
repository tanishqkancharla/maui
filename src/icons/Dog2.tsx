import { createIcon } from "./createIcon"

export const Dog2 = createIcon('Dog2', function Dog2(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M6.75 11.75H13.25L14.0714 6.75L16.25 9.75H19.25L18.7239 11.0653C18.4377 11.7808 17.7447 12.25 16.974 12.25C16.5471 12.25 16.1735 12.537 16.0635 12.9495L15.25 16V17.25C15.25 18.3546 14.3546 19.25 13.25 19.25H12.75V15.75L9.75 14.75L8.75 17.75L8.81126 17.9338C9.0271 18.5813 8.54513 19.25 7.86257 19.25H6.75V11.75ZM6.75 11.75C6.75 11.75 4.75 11.5 4.75 9.75M11 9L7 5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
