import { createIcon } from "./createIcon"

export const SmallShapes = createIcon('SmallShapes', function SmallShapes(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.5 13.75V16.5M16.5 16.5V19.25M16.5 16.5H19.25M16.5 16.5H13.75M5.75 10.25H9.25C9.80228 10.25 10.25 9.80228 10.25 9.25V5.75C10.25 5.19772 9.80228 4.75 9.25 4.75H5.75C5.19772 4.75 4.75 5.19772 4.75 5.75V9.25C4.75 9.80228 5.19772 10.25 5.75 10.25ZM7.5 13.75L10.25 19.25H4.75L7.5 13.75ZM16.5 10.25C14.9812 10.25 13.75 9.01878 13.75 7.5C13.75 5.98122 14.9812 4.75 16.5 4.75C18.0188 4.75 19.25 5.98122 19.25 7.5C19.25 9.01878 18.0188 10.25 16.5 10.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
