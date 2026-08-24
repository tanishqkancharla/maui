import { colors } from "../tokens/colors"
import { createIcon } from "./createIcon"

export const CircleX = createIcon("CircleX", function CircleX(props) {
	return (
		<svg
			focusable="false"
			aria-hidden="true"
			role="img"
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<circle cx="12" cy="12" r="9" fill="currentColor" />
			<path
				stroke={colors.gray[3]}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9 9L15 15M15 9L9 15"
			/>
		</svg>
	)
})
