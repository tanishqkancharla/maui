import { createIcon } from "./createIcon"

export const RobotBorder = createIcon('RobotBorder', function RobotBorder(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 8.25V6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H8.25M19.25 8.25V6.75C19.25 5.64543 18.3546 4.75 17.25 4.75H15.75M4.75 15.75V17.25C4.75 18.3546 5.64543 19.25 6.75 19.25H8.25M19.25 15.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H15.75M12 9.75H9.75C8.64543 9.75 7.75 10.6454 7.75 11.75V14.25C7.75 15.3546 8.64543 16.25 9.75 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V11.75C16.25 10.6454 15.3546 9.75 14.25 9.75H12ZM12 9.75V7.75M10.5057 13H10.5157M13.4742 13H13.4843" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
