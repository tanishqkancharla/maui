import { createIcon } from "./createIcon"

export const Journal = createIcon('Journal', function Journal(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M6.75 7.5H4.75M6.75 10.5H4.75M6.75 13.5H4.75M6.75 16.5H4.75M6.75 19.25H17.25C17.8023 19.25 18.25 18.8023 18.25 18.25V5.75C18.25 5.19772 17.8023 4.75 17.25 4.75H6.75C6.19772 4.75 5.75 5.19771 5.75 5.75V18.25C5.75 18.8023 6.19772 19.25 6.75 19.25ZM12.75 10.25V4.75H15.25V10.25L14 8.75L12.75 10.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
