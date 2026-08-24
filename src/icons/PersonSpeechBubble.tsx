import { createIcon } from "./createIcon"

export const PersonSpeechBubble = createIcon('PersonSpeechBubble', function PersonSpeechBubble(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.25 5.75H6.75C5.64543 5.75 4.75 6.64543 4.75 7.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V14.75M5.75 18.75L6.03849 17.8845C6.4634 16.6098 7.65632 15.75 9 15.75C10.3437 15.75 11.5366 16.6098 11.9615 17.8845L12.25 18.75M11.75 5.75V8.25C11.75 8.80228 12.1977 9.25 12.75 9.25H13.75V11.25L16 9.25H18.25C18.8023 9.25 19.25 8.80228 19.25 8.25V5.75C19.25 5.19772 18.8023 4.75 18.25 4.75H12.75C12.1977 4.75 11.75 5.19772 11.75 5.75ZM10.25 12C10.25 12.6904 9.69036 13.25 9 13.25C8.30964 13.25 7.75 12.6904 7.75 12C7.75 11.3096 8.30964 10.75 9 10.75C9.69036 10.75 10.25 11.3096 10.25 12Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
