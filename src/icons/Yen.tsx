import { createIcon } from "./createIcon"

export const Yen = createIcon('Yen', function Yen(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 13.75H12M12 13.75H15.25M12 13.75V19.25M12 13.75V11.75M12 11.75L7.75 4.75M12 11.75L16.25 4.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M8.75 16.75H15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
