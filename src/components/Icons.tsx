import React from "react"

function Search(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			focusable="false"
			aria-hidden="true"
			role="img"
			width={24}
			height={24}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
			/>
		</svg>
	)
}

function DotsHorizontal(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			focusable="false"
			aria-hidden="true"
			role="img"
			width={24}
			height={24}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				fill="currentColor"
				d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
			/>
			<path
				fill="currentColor"
				d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
			/>
			<path
				fill="currentColor"
				d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"
			/>
		</svg>
	)
}

function ArrowDown(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			focusable="false"
			aria-hidden="true"
			role="img"
			width={24}
			height={24}
			fill="none"
			viewBox="0 0 24 24"
			{...props}
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M17.25 13.75L12 19.25L6.75 13.75"
			/>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M12 18.25V4.75"
			/>
		</svg>
	)
}

export const Icons = {
	Search,
	DotsHorizontal,
	ArrowDown,
}
