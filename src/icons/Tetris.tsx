import { createIcon } from "./createIcon"

export const Tetris = createIcon('Tetris', function Tetris(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 9.75H16.5V14.25M12 9.75V14.25M12 9.75H7.5M12 9.75V5.25H7.5V9.75M16.5 14.25H12M16.5 14.25V18.75H12V14.25M12 14.25H7.5V9.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
