import { createIcon } from "./createIcon"

export const Lamp = createIcon('Lamp', function Lamp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M15 4.75H9L4.75 12.25H19.25L15 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M12 12.5V19.25M12 19.25H8.75M12 19.25H15.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
