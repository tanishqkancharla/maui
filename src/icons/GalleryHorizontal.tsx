import { createIcon } from "./createIcon"

export const GalleryHorizontal = createIcon('GalleryHorizontal', function GalleryHorizontal(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.25 8.75v6.5m-3-8.5v10.5m-10.5 2h6.5a1 1 0 0 0 1-1V5.75a1 1 0 0 0-1-1h-6.5a1 1 0 0 0-1 1v12.5a1 1 0 0 0 1 1Z" />
		</svg>
	)
})
