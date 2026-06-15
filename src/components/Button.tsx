import React, { useCallback, useRef } from "react"
import { useId } from "react-aria"
import { style, useStyles } from "purse-styles"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"

const buttonClass = style({
	background:
		"linear-gradient(var(--sand-3), var(--sand-2)), radial-gradient(var(--sand-3), var(--sand-2))",
	color: "white",
	padding: "6px 12px",
	borderRadius: "4px",
	height: "28px",
	width: "fit-content",
	fontWeight: 400,
	fontSize: "12px",
	border: "none",
	boxShadow:
		"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, rgb(62 62 58) 0px 0px 0px 1px inset",
	fontFamily:
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
	letterSpacing: "0.01em",
	lineHeight: "16px",
	textOverflow: "ellipsis",
	overflow: "hidden",
	whiteSpace: "nowrap",
	transition: "box-shadow 80ms ease-in-out, background 80ms ease-in-out",
	"&:focus": {
		boxShadow: "var(--accent-color) 0px 0px 0px 1px inset",
		outline: "none",
	},
	"&:hover": {
		background:
			"linear-gradient(var(--sand-5), var(--sand-4)), radial-gradient(var(--sand-5), var(--sand-4))",
		boxShadow:
			"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, hsl(50, 3.8%, 30.6%) 0px 0px 0px 1px inset",
	},
	"&:active": {
		background:
			"linear-gradient(var(--sand-6), var(--sand-4)), radial-gradient(var(--sand-6), var(--sand-4))",
	},
})

type ButtonAttributes = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>

type ButtonData = {
	id: string
	focused: boolean
}

type ButtonProps = {
	children: string | string[]
	onClick?: () => void
}

export function useButton(props: ButtonProps): [ButtonData, ButtonAttributes] {
	const ref = useRef<HTMLButtonElement>(null)
	const id = useId()
	const [focused, focusProps] = useFocus(id, ref)

	const onClickRef = useRefCurrent(props.onClick)

	const onClick = useCallback((event: React.SyntheticEvent) => {
		focusProps.onFocus(event)
		onClickRef.current?.()
	}, [])

	return [
		{ focused, id },
		{ ...focusProps, ref, onClick },
	]
}

export function Button(props: ButtonProps) {
	const [data, attributes] = useButton(props)
	const className = useStyles(buttonClass)

	return (
		<button className={className} {...attributes}>
			{props.children}
		</button>
	)
}

const actionButtonClass = style({
	background:
		"linear-gradient(var(--accent-A8), var(--accent-A7)), linear-gradient(var(--sand-3), var(--sand-2)), radial-gradient(var(--sand-3), var(--sand-2))",
	color: "white",
	padding: "6px 12px",
	borderRadius: "4px",
	height: "28px",
	fontWeight: 400,
	width: "fit-content",
	fontSize: "12px",
	border: "none",
	boxShadow:
		"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, var(--accent-7) 0px 0px 0px 1px inset",
	fontFamily:
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
	letterSpacing: "0.01em",
	lineHeight: "16px",
	transition: "box-shadow 80ms ease-in-out, background 80ms ease-in-out",
	"&:focus-visible": {
		boxShadow:
			"var(--accent-color) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, var(--accent-color) 0px 0px 0px 1px inset",
		outline: "none",
	},
	"&:hover": {
		background:
			"linear-gradient(var(--accent-A9), var(--accent-A8)), linear-gradient(var(--sand-4), var(--sand-3)), radial-gradient(var(--sand-4), var(--sand-3))",
		boxShadow:
			"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, var(--accent-8) 0px 0px 0px 1px inset",
	},
	"&:active": {
		background:
			"linear-gradient(var(--accent-A10), var(--accent-A9)), linear-gradient(var(--sand-5), var(--sand-4)), radial-gradient(var(--sand-5), var(--sand-4))",
	},
})

export function ActionButton(props: { children: React.ReactNode }) {
	const className = useStyles(actionButtonClass)

	return <button className={className}>{props.children}</button>
}
