import {
	ListBox as AriaListBox,
	ListBoxItem as AriaListBoxItem,
	type ListBoxItemProps as AriaListBoxItemProps,
	type ListBoxProps as AriaListBoxProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { background, backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { controlSize } from "../tokens/sizing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

const root = style(background.element, {
	margin: 0,
	padding: 0,
	listStyleType: "none",
	display: "flex",
	flexDirection: "column",
	gap: "1px",
	maxHeight: "inherit",
	overflowY: "auto",
	outline: "none",
})

const item = style(
	spacing.padding({ x: 4, y: 2 }),
	text({ size: "sm", fontWeight: 400, color: "highContrast" }),
	{
		position: "relative",
		minHeight: controlSize.minTarget,
		alignContent: "center",
		margin: 0,
		outline: "none",
		cursor: "default",
		userSelect: "none",
		"&:hover, &[data-hovered]": {
			background: backgroundColor.elementHover,
		},
		"&[data-focused]": {
			background: backgroundColor.elementHover,
		},
		"&[data-selected]": {
			color: colors.accent[9],
			fontWeight: 500,
		},
		"&[data-selected]::after": {
			content: '"✓"',
			position: "absolute",
			right: "8px",
			color: colors.accent[9],
			fontWeight: 500,
		},
		"&[data-disabled]": {
			color: colors.gray[8],
		},
	},
)

/** `root` goes on RAC `ListBox`; `item` goes on RAC `ListBoxItem` and keys off `data-hovered`, `data-focused`, `data-selected` (trailing ✓), `data-disabled`. */
export const listBoxStyles = { root, item } as const

export interface ListBoxProps<T>
	extends Omit<AriaListBoxProps<T>, "className"> {}

export function ListBox<T>(props: ListBoxProps<T>) {
	const className = useStyles(listBoxStyles.root)

	return <AriaListBox {...props} className={className} />
}

export interface ListBoxItemProps<T = object>
	extends Omit<AriaListBoxItemProps<T>, "className"> {}

export function ListBoxItem<T extends object = object>(
	props: ListBoxItemProps<T>,
) {
	const className = useStyles(listBoxStyles.item)
	const textValue =
		props.textValue ??
		(typeof props.children === "string" ? props.children : undefined)

	return <AriaListBoxItem {...props} textValue={textValue} className={className} />
}
