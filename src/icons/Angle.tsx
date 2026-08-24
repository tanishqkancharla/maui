import { createIcon } from "./createIcon"

export const Angle = createIcon('Angle', function Angle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M19.256 17.25H4.75L19.25 6.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M11.5 12.6627C12.5836 13.7866 13.25 15.3155 13.25 17" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
