import { createIcon } from "./createIcon"

export const ShopSign = createIcon('ShopSign', function ShopSign(props) {
	return (
		<svg focusable="false" aria-hidden="true" role="img" viewBox="0 0 24 24" fill="none" {...props}>
			<path d="M8.75 4.75H16.25L19.25 19.25H11.75L8.75 4.75ZM8.75 4.75L4.75 19.25" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<path d="M6 15.25H10.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
})
