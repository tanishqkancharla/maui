import { css } from "goober"
import { useRef } from "react"
import { AriaTextFieldOptions, useTextField } from "react-aria"

const inputClass = css`
	background: var(--sand-3);
	width: 100%;
	color: white;
	padding: 6px 8px;
	border-radius: 4px;
	height: 28px;
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
	cursor: default;

	transition: box-shadow 80ms ease-in-out;

	&:focus {
		box-shadow: var(--accent-color) 0px 0px 0px 0px inset,
			rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset,
			var(--accent-color) 0px 0px 0px 1px inset;

		cursor: text;
		outline: none;
	}

	&:hover {
		background: var(--sand-4);
	}

	&::placeholder {
		font-style: italic;
		color: var(--sand-8);
	}
`

type InputProps = AriaTextFieldOptions<"input">

export function TextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)
	return <input className={inputClass} ref={ref} {...inputProps} />
}

const quietInputClass = css`
	flex: 1 1 auto;
	background-color: transparent;
	color: white;
	font-weight: 400;
	font-size: 12px;
	border: none;
	outline: none;
	letter-spacing: 0.01em;
	line-height: 16px;
	font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif;
	margin: 0;
	padding: 0;

	&::placeholder {
		font-style: italic;
		color: var(--sand-8);
	}
`

export function QuietTextField(props: InputProps) {
	const ref = useRef(null)
	const { inputProps } = useTextField({ ...props }, ref)

	return <input className={quietInputClass} {...inputProps} />
}
