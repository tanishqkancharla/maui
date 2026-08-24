import { createIcon } from "./createIcon"

export const CursorSpinner = createIcon('CursorSpinner', function CursorSpinner(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15.9959 13.1833V12.75M17.9889 14.0053L18.2953 13.6988M18.8169 15.9955H19.2502M17.9948 17.9885L18.3012 18.295M15.9959 19.25V18.8167M13.6991 18.295L14.0055 17.9886M12.75 15.9958H13.1833M13.7049 13.6986L14.0113 14.005M4.75 4.75L6.86111 15.25L9.5 10.5L14.25 9.06818L4.75 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
