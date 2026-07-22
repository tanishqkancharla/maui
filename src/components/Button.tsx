import React, { useCallback, useRef } from "react"
import { useId } from "react-aria"
import { style, useStyles } from "purse-styles"
import { useFocus } from "../hooks/useFocus"
import { useRefCurrent } from "../hooks/useRefCurrent"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { motion } from "../tokens/motion"
import { shadow } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

const buttonBaseClass = style(
	text("xs", 400, "highContrast"),
	focusRing(),
	motion.standard("box-shadow", "background"),
	shadow.subtle,
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
		`linear-gradient(${colors.gray[3]}, ${colors.gray[2]}), radial-gradient(${colors.gray[3]}, ${colors.gray[2]})`,
	"&:hover": {
		background:
			`linear-gradient(${colors.gray[5]}, ${colors.gray[4]}), radial-gradient(${colors.gray[5]}, ${colors.gray[4]})`,
	},
	"&:active": {
		background:
			`linear-gradient(${colors.gray[6]}, ${colors.gray[4]}), radial-gradient(${colors.gray[6]}, ${colors.gray[4]})`,
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
		`linear-gradient(${colors.accentAlpha[8]}, ${colors.accentAlpha[7]}), linear-gradient(${colors.gray[3]}, ${colors.gray[2]}), radial-gradient(${colors.gray[3]}, ${colors.gray[2]})`,
	"&:hover": {
		background:
			`linear-gradient(${colors.accentAlpha[9]}, ${colors.accentAlpha[8]}), linear-gradient(${colors.gray[4]}, ${colors.gray[3]}), radial-gradient(${colors.gray[4]}, ${colors.gray[3]})`,
	},
	"&:active": {
		background:
			`linear-gradient(${colors.accentAlpha[10]}, ${colors.accentAlpha[9]}), linear-gradient(${colors.gray[5]}, ${colors.gray[4]}), radial-gradient(${colors.gray[5]}, ${colors.gray[4]})`,
	},
})

export function ActionButton(props: { children: React.ReactNode }) {
	const className = useStyles(actionButtonClass)

	return <button className={className}>{props.children}</button>
}
