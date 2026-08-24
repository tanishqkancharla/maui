import { createIcon } from "./createIcon"

export const LandscapeExpand = createIcon('LandscapeExpand', function LandscapeExpand(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M14.75 9.25H16.75V11.25M9.25 14.75H7.25V12.75M18.25 6.75H5.75C5.19772 6.75 4.75 7.19771 4.75 7.75V16.25C4.75 16.8023 5.19772 17.25 5.75 17.25H18.25C18.8023 17.25 19.25 16.8023 19.25 16.25V7.75C19.25 7.19772 18.8023 6.75 18.25 6.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
