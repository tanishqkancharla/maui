import { createIcon } from "./createIcon"

export const Tie = createIcon('Tie', function Tie(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M13.25 8.25L14.395 6.24614C14.776 5.57948 14.2946 4.75 13.5268 4.75H10.4732C9.70533 4.75 9.22397 5.57948 9.60491 6.24614L10.75 8.25M13.25 8.25L14.1442 15.8511C14.2114 16.4225 14.0294 16.9951 13.6445 17.4227L12 19.25L10.3554 17.4227C9.97059 16.9951 9.78851 16.4225 9.85573 15.8511L10.75 8.25M13.25 8.25H10.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
