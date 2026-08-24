import { createIcon } from "./createIcon"

export const DiceCube = createIcon('DiceCube', function DiceCube(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M4.75 8L12 11.25M4.75 8L12 4.75L19.25 8M4.75 8V16L12 19.25M12 11.25L19.25 8M12 11.25V19.25M19.25 8V16L12 19.25M16.99 11.8125H17M12.0213 8H12.0313M14.5213 15.25H14.5313M7.02118 11.75H7.03117M8.33374 13.75H8.34373M9.70886 15.7188H9.71885" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
