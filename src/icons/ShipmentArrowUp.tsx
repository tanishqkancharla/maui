import { createIcon } from "./createIcon"

export const ShipmentArrowUp = createIcon('ShipmentArrowUp', function ShipmentArrowUp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M5 9.25H19M12 5V9M12 16.25V11.75M12 11.75L9.75 14.25M12 11.75L14.25 14.25M17.2502 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V9.63478C4.75 9.22174 4.87788 8.81884 5.11606 8.48141L7.75 4.75H16.2502L18.8842 8.48141C19.1224 8.81884 19.2502 9.22174 19.2502 9.63478V17.25C19.2502 18.3546 18.3548 19.25 17.2502 19.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
