import { createIcon } from "./createIcon"

export const Crucifix = createIcon('Crucifix', function Crucifix(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 4.75V9.75M12 9.75V19.25M12 9.75H7.75M12 9.75H16.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
