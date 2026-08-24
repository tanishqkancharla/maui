import { createIcon } from "./createIcon"

export const Grid2 = createIcon('Grid2', function Grid2(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<g clipPath="url(#Grid2_clip0_709_78)">
				<path d="M8.25 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M19.25 8.25L4.75 8.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M19.25 15.75L4.75 15.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
				<path d="M15.75 4.75V19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			</g>
			<defs>
				<clipPath id="Grid2_clip0_709_78">
					<rect width={24} height={24} fill="white" />
				</clipPath>
			</defs>
		</svg>
	)
})
