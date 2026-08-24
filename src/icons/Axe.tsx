import { createIcon } from "./createIcon"

export const Axe = createIcon('Axe', function Axe(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<g clipPath="url(#Axe_clip0)">
				<path d="M17.25 13.25V4.75C17.25 4.75 15 5.75 11.5 5.75H6.75V12.25H11.5C15 12.25 17.25 13.25 17.25 13.25Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M14.75 6V12" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M7.75 12.5V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M10.25 12.5V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<defs>
				<clipPath id="Axe_clip0">
					<rect width={24} height={24} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
})
