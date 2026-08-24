import { createIcon } from "./createIcon"

export const NewWithLines = createIcon('NewWithLines', function NewWithLines(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 14.25V9.75L7.75 14.25V9.75M12.75 14.25H10.25V12M10.25 12V9.75H12.75M10.25 12H12.75M14.75 9.75L15.65 14.25L17 12L18.35 14.25L19.25 9.75M4.75 17.25H19.25M4.75 6.75H19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
