import { css } from "goober"
import React from "react"

const buttonClass = css`
	background: linear-gradient(var(--sand-3), var(--sand-2)),
		radial-gradient(var(--sand-3), var(--sand-2));
	color: white;
	padding: 6px 12px;
	border-radius: 4px;
	height: 28px;
	width: fit-content;
	font-weight: 400;
	font-size: 12px;
	border: none;
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px inset,
		rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
		rgb(62 62 58) 0px 0px 0px 1px inset;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	letter-spacing: 0.01em;

	line-height: 16px;
	-webkit-line-clamp: 1;
	line-clamp: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	transition: box-shadow 80ms ease-in-out;

	&:focus-visible {
		box-shadow: var(--accent-color) 0px 0px 0px 0px inset,
			rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
			var(--accent-color) 0px 0px 0px 1px inset;

		outline: none;
	}

	&:hover {
		background: linear-gradient(var(--sand-5), var(--sand-4)),
			radial-gradient(var(--sand-5), var(--sand-4));

		box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px inset,
			rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
			hsl(50, 3.8%, 30.6%) 0px 0px 0px 1px inset;
	}

	&:active {
		background: linear-gradient(var(--sand-6), var(--sand-4)),
			radial-gradient(var(--sand-6), var(--sand-4));
	}
`

export function Button(props: { children: string; onClick?: () => void }) {
	return (
		<button className={buttonClass} onClick={props.onClick}>
			{props.children}
		</button>
	)
}

const actionButtonClass = css`
	background: linear-gradient(var(--accent-A8), var(--accent-A7)),
		linear-gradient(var(--sand-3), var(--sand-2)),
		radial-gradient(var(--sand-3), var(--sand-2));

	color: white;
	padding: 6px 12px;
	border-radius: 4px;
	height: 28px;
	font-weight: 400;
	width: fit-content;
	font-size: 12px;
	border: none;
	box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px inset,
		rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
		var(--accent-7) 0px 0px 0px 1px inset;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	letter-spacing: 0.01em;
	line-height: 16px;

	transition: box-shadow 80ms ease-in-out;

	&:focus-visible {
		box-shadow: var(--accent-color) 0px 0px 0px 0px inset,
			rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
			var(--accent-color) 0px 0px 0px 1px inset;

		outline: none;
	}

	&:hover {
		background: linear-gradient(var(--accent-A9), var(--accent-A8)),
			linear-gradient(var(--sand-4), var(--sand-3)),
			radial-gradient(var(--sand-4), var(--sand-3));

		box-shadow: rgb(0 0 0 / 50%) 0px 0px 0px 0px inset,
			rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
			var(--accent-8) 0px 0px 0px 1px inset;
	}

	&:active {
		background: linear-gradient(var(--accent-A10), var(--accent-A9)),
			linear-gradient(var(--sand-5), var(--sand-4)),
			radial-gradient(var(--sand-5), var(--sand-4));
	}
`

export function ActionButton(props: { children: React.ReactNode }) {
	return <button className={actionButtonClass}>{props.children}</button>
}
