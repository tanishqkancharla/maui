import { createIcon } from "./createIcon"

export const ImageRotateRight = createIcon('ImageRotateRight', function ImageRotateRight(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.75 7.75H18.25C18.8023 7.75 19.25 8.19772 19.25 8.75V18.25C19.25 18.8023 18.8023 19.25 18.25 19.25H5.75C5.19771 19.25 4.75 18.8023 4.75 18.25V15.75M4.75 12.25V10C4.75 8.34315 6.09315 7 7.75 7H11M11 7L8.75 4.75M11 7L8.75 9.25M6.75 19.25L10.0221 13.2617C10.3903 12.5879 11.4045 12.5773 11.7883 13.2432L15.25 19.25M16.75 11.5C16.75 11.9142 16.4142 12.25 16 12.25C15.5858 12.25 15.25 11.9142 15.25 11.5C15.25 11.0858 15.5858 10.75 16 10.75C16.4142 10.75 16.75 11.0858 16.75 11.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
