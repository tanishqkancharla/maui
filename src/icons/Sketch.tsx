import { createIcon } from "./createIcon"

export const Sketch = createIcon('Sketch', function Sketch(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M16.25 4.75H7.75L4.75 9L12 19.25L19.25 9L16.25 4.75Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
