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

function CircleX(props: React.SVGProps<SVGSVGElement>) {
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
			<circle cx="12" cy="12" r="9" fill="currentColor" />
			<path
				stroke="var(--gray-3)"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M9 9L15 15M15 9L9 15"
			/>
		</svg>
	)
}

function Plus(props: React.SVGProps<SVGSVGElement>) {
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
				d="M12 5.75V18.25"
			/>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.5}
				d="M18.25 12H5.75"
			/>
		</svg>
	)
}

function Minus(props: React.SVGProps<SVGSVGElement>) {
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
				d="M18.25 12.25H5.75"
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

function Star(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M12 4.75L14.16 9.13L19 9.83L15.5 13.24L16.33 18.06L12 15.78L7.67 18.06L8.5 13.24L5 9.83L9.84 9.13L12 4.75Z"
			/>
		</svg>
	)
}

function Archive(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M5.25 8.75H18.75M7.25 8.75V18.25H16.75V8.75M6.25 5.75H17.75V8.75H6.25V5.75ZM9.75 12.25H14.25"
			/>
		</svg>
	)
}

function Trash(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M8.75 8.75V18.25M12 8.75V18.25M15.25 8.75V18.25M5.75 6.75H18.25M9.25 6.75L10.25 4.75H13.75L14.75 6.75M7.25 6.75L7.85 19.25H16.15L16.75 6.75"
			/>
		</svg>
	)
}

function Envelope(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M5.75 7.25H18.25V16.75H5.75V7.25ZM6.25 7.75L12 12.5L17.75 7.75"
			/>
		</svg>
	)
}

function Clock(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12ZM12 8.25V12.25L14.75 14"
			/>
		</svg>
	)
}

function Pin(props: React.SVGProps<SVGSVGElement>) {
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
				strokeWidth={1.8}
				d="M14.83 4.34L19.66 9.17C20.44 9.95 20.44 11.22 19.66 12L17.83 13.83L10.17 6.17L12 4.34C12.78 3.56 14.05 3.56 14.83 4.34Z"
			/>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={1.8}
				d="M13.5 10.5L6 18M9.5 14.5L4.75 19.25"
			/>
		</svg>
	)
}

export const Icons = {
	Search,
	CircleX,
	Plus,
	Minus,
	DotsHorizontal,
	ArrowDown,
	Star,
	Archive,
	Trash,
	Envelope,
	Clock,
	Pin,
}
