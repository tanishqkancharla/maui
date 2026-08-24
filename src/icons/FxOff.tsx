import { createIcon } from "./createIcon"

export const FxOff = createIcon('FxOff', function FxOff(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.25 6.98077C14.25 5.64231 13.7222 4.75 12.1389 4.75C10.5556 4.75 10.25 5.75 10.0278 6.98077C9.93069 7.51848 9.74745 9.3152 9.55854 11.25M4.75 17.0192C4.75 18.3577 5.27778 19.25 6.86111 19.25C8.44444 19.25 8.8125 18 8.97222 17.0192C9.06216 16.4669 9.31506 13.7438 9.55854 11.25M9.55854 11.25H6.75M9.55854 11.25H12.25M13.75 13.75L16 16M16 16L18.25 18.25M16 16L18.25 13.75M16 16L13.75 18.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
