import React, { useCallback, useRef } from "react"
import { useId } from "react-aria"
import { style, useStyles } from "purse-styles"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

const buttonBaseClass = style(
	text("xs", 400, "highContrast"),
	focusRing(),
	motion.standard("box-shadow", "background"),
	spacing.padding({ x: 6, y: 4 }),
	{
		borderRadius: "4px",
		width: "fit-content",
		border: "none",
		textBox: "trim-both cap alphabetic",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
	},
)

const buttonClass = style(buttonBaseClass, {
	background:
		"linear-gradient(var(--gray-3), var(--gray-2)), radial-gradient(var(--gray-3), var(--gray-2))",
	boxShadow:
		"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, var(--gray-A3) 0px 0.5px 0px 0px inset, var(--gray-7) 0px 0px 0px 1px inset",
	"&:hover": {
		background:
			"linear-gradient(var(--gray-5), var(--gray-4)), radial-gradient(var(--gray-5), var(--gray-4))",
		boxShadow:
			"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, var(--gray-A3) 0px 0.5px 0px 0px inset, var(--gray-8) 0px 0px 0px 1px inset",
	},
	"&:active": {
		background:
			"linear-gradient(var(--gray-6), var(--gray-4)), radial-gradient(var(--gray-6), var(--gray-4))",
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

const actionButtonClass = style(buttonBaseClass, {
	color: "white",
	background:
		"linear-gradient(var(--accent-A8), var(--accent-A7)), linear-gradient(var(--gray-3), var(--gray-2)), radial-gradient(var(--gray-3), var(--gray-2))",
	boxShadow:
		"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, var(--accent-7) 0px 0px 0px 1px inset",
	"&:hover": {
		background:
			"linear-gradient(var(--accent-A9), var(--accent-A8)), linear-gradient(var(--gray-4), var(--gray-3)), radial-gradient(var(--gray-4), var(--gray-3))",
		boxShadow:
			"rgb(0 0 0 / 50%) 0px 0px 0px 0px inset, rgb(255 255 255 / 5%) 0px 0.5px 0px 0px inset, var(--accent-8) 0px 0px 0px 1px inset",
	},
	"&:active": {
		background:
			"linear-gradient(var(--accent-A10), var(--accent-A9)), linear-gradient(var(--gray-5), var(--gray-4)), radial-gradient(var(--gray-5), var(--gray-4))",
	},
})

export function ActionButton(props: { children: React.ReactNode }) {
	const className = useStyles(actionButtonClass)

	return <button className={className}>{props.children}</button>
}
