import { createIcon } from "./createIcon"

export const AlignTop = createIcon('AlignTop', function AlignTop(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M13.2502 19.25H10.75C9.64543 19.25 8.75 18.3546 8.75 17.25V10.75C8.75 9.64543 9.64543 8.75 10.75 8.75H13.2502C14.3548 8.75 15.2502 9.64543 15.2502 10.75V17.25C15.2502 18.3546 14.3548 19.25 13.2502 19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M4.75 4.75H19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
