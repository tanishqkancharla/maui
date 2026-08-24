import { createIcon } from "./createIcon"

export const Sidebar = createIcon('Sidebar', function Sidebar(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.75 4.75h4.5a2 2 0 0 1 2 2v10.5a2 2 0 0 1-2 2h-4.5m-8-2V6.75a2 2 0 0 1 2-2h2.5v14.5h-2.5a2 2 0 0 1-2-2Z" />
		</svg>
	)
})
