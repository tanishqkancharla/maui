import { createIcon } from "./createIcon"

export const Bottle = createIcon('Bottle', function Bottle(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.75 19.25v-3.186a8 8 0 0 1 2.343-5.657l.657-.657v-2.5m6.5 12v-3.186a8 8 0 0 0-2.343-5.657l-.657-.657v-2.5m-3.5 0v-2.5h3.5v2.5m-3.5 0h3.5" />
		</svg>
	)
})
