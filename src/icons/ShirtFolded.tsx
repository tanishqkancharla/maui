import { createIcon } from "./createIcon"

export const ShirtFolded = createIcon('ShirtFolded', function ShirtFolded(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M7.75 4.75H16.25M7.75 4.75L12 7.75M7.75 4.75V6.75M16.25 4.75L12 7.75M16.25 4.75V6.75M12 7.75L16.25 9.25V6.75M12 7.75L7.75 9.25V6.75M12 7.75V19.25M7.75 6.75H5.75C5.19772 6.75 4.75 7.19772 4.75 7.75V18.25C4.75 18.8023 5.19772 19.25 5.75 19.25H12M16.25 6.75H18.25C18.8023 6.75 19.25 7.19772 19.25 7.75V18.25C19.25 18.8023 18.8023 19.25 18.25 19.25H12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
