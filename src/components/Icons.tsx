import React from "react"

function Check() {
	return (
		<svg
			focusable="false"
			aria-hidden="true"
			role="img"
			width={12}
			height={12}
			viewBox="0 0 11 11"
			style={{
				paddingLeft: 1,
				paddingTop: 1,
				fill: "currentColor",
			}}
		>
			<path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z"></path>
		</svg>
	)
}

export const Icons = {
	Check,
}
