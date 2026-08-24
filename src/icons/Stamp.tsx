import { createIcon } from "./createIcon"

export const Stamp = createIcon('Stamp', function Stamp(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<g clipPath="url(#Stamp_clip0_701_94)">
				<path d="M5.75 14.75C5.75 13.0931 7.09315 11.75 8.75 11.75H15.25C16.9069 11.75 18.25 13.0931 18.25 14.75V16.25H5.75V14.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10 11.5L8.96892 5.93209C8.85507 5.31731 9.32697 4.75 9.9522 4.75H14.0478C14.6731 4.75 15.145 5.31731 15.0311 5.93209L14 11.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M4.75 19.25H19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<defs>
				<clipPath id="Stamp_clip0_701_94">
					<rect width={24} height={24} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
})
