import { createIcon } from "./createIcon"

export const ImageRotateLeft = createIcon('ImageRotateLeft', function ImageRotateLeft(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M18.25 19.25H5.75C5.19771 19.25 4.75 18.8023 4.75 18.25V8.75C4.75 8.19772 5.19771 7.75 5.75 7.75H9.25M18.25 19.25C18.8023 19.25 19.25 18.8023 19.25 18.25V15.75M18.25 19.25L14.7883 13.2432C14.4045 12.5773 13.3903 12.5879 13.0221 13.2617L9.75 19.25M19.25 12.25V10C19.25 8.34315 17.9069 7 16.25 7H13M13 7L15.25 4.75M13 7L15.25 9.25M7.75 11.5C7.75 11.9142 8.08579 12.25 8.5 12.25C8.91421 12.25 9.25 11.9142 9.25 11.5C9.25 11.0858 8.91421 10.75 8.5 10.75C8.08579 10.75 7.75 11.0858 7.75 11.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
