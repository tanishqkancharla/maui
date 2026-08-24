import { createIcon } from "./createIcon"

export const HeartMinus = createIcon('HeartMinus', function HeartMinus(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" fill="none" viewBox="0 0 24 24" {...props}>
			<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m11 17.25-5.333-4.86c-1.427-1.759-1.171-4.244.645-5.73 1.816-1.487 4.234-1.05 5.683.573 1.45-1.623 3.836-2.044 5.683-.573C19.053 7.754 19.46 9.68 19 11.25m.25 6h-3.5" />
		</svg>
	)
})
