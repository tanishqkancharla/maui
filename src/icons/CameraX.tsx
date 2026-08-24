import { createIcon } from "./createIcon"

export const CameraX = createIcon('CameraX', function CameraX(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9.75 10.75L12 13M12 13L14.25 15.25M12 13L14.25 10.75M12 13L9.75 15.25M19.25 9.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V9.75C4.75 8.64543 5.64543 7.75 6.75 7.75H7.08333C7.48703 7.75 7.85114 7.50726 8.00641 7.13462L8.74359 5.36538C8.89886 4.99274 9.26297 4.75 9.66667 4.75H14.3333C14.737 4.75 15.1011 4.99274 15.2564 5.36538L15.9936 7.13462C16.1489 7.50726 16.513 7.75 16.9167 7.75H17.25C18.3546 7.75 19.25 8.64543 19.25 9.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
