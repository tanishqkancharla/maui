import { createIcon } from "./createIcon"

export const ClockDottedLine = createIcon('ClockDottedLine', function ClockDottedLine(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M12 8V12L14 14M12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75M18.6021 9C18.7484 9.32146 18.872 9.65548 18.9706 10C19.0412 10.2465 19.0991 10.4984 19.1435 10.7549M18.6021 15C18.7484 14.6785 18.872 14.3445 18.9706 14C19.0412 13.7535 19.0991 13.5016 19.1435 13.2451M15 5.39786C15.6571 5.69694 16.2618 6.09125 16.7963 6.56315M16.7963 17.4368C16.2618 17.9087 15.6571 18.3031 15 18.6021" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
