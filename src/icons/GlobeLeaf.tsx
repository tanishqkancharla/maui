import { createIcon } from "./createIcon"

export const GlobeLeaf = createIcon('GlobeLeaf', function GlobeLeaf(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M10 18.9706C9.65548 18.872 9.32146 18.7484 9 18.6021C6.49297 17.4611 4.75 14.9341 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C14.5256 4.75 16.7496 6.04145 18.0476 8C18.4509 8.60851 18.7648 9.28142 18.9706 10M12.75 19.25C12.75 19.25 14.2069 16.8966 16.1121 15.8879M9.25 5.5V9.25C9.25 10.9069 7.90685 12.25 6.25 12.25H5M8.5 18C8.5 18 9.75 16 9.75 14C9.75 11.8501 12.1535 13.0281 12.8267 9.74329C13.0484 8.6612 13.8954 7.75 15 7.75H17.5M19.25 12.75C19.25 12.75 12.75 13.9379 12.75 16.4483C12.75 18.2414 14.2069 19.25 16 19.25C18.8017 19.25 19.25 12.75 19.25 12.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
