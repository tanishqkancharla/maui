import { createIcon } from "./createIcon"

export const Candle = createIcon('Candle', function Candle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M9 16.75L9.875 10.75H14.125L15 16.75M6.75 19.25H17.25C17.8023 19.25 18.25 18.8023 18.25 18.25V17.75C18.25 17.1977 17.8023 16.75 17.25 16.75H6.75C6.19772 16.75 5.75 17.1977 5.75 17.75V18.25C5.75 18.8023 6.19772 19.25 6.75 19.25ZM13.25 7C13.25 7.9665 12.6904 8.25 12 8.25C11.3096 8.25 10.75 7.9665 10.75 7C10.75 6.0335 12 4.75 12 4.75C12 4.75 13.25 6.0335 13.25 7Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
