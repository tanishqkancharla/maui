import { createIcon } from "./createIcon"

export const ArrowUpInCircle = createIcon('ArrowUpInCircle', function ArrowUpInCircle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25ZM12 19.25V8.75M12 8.75L8.75 12.25M12 8.75L15.25 12.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
