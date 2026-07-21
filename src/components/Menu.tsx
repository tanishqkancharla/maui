import { CollectionChildren, Node } from "@react-types/shared"
import { useRef } from "react"
import {
	AriaListBoxOptions,
	mergeProps,
	useHover,
	useListBox,
	useOption,
} from "react-aria"
import { Item, ListState, useListState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { Flex, Spacer } from "./Utils"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

export const menu = style({
	margin: 0,
	padding: 0,
	listStyleType: "none",
	display: "flex",
	flexDirection: "column",
	gap: "1px",
})

type ListBoxProps<T> = {
	children: CollectionChildren<T>
} & AriaListBoxOptions<T>

export function ListBox<T extends object>(props: ListBoxProps<T>) {
	const state = useListState(props)
	const ref = useRef(null)
	const { listBoxProps } = useListBox(props, state, ref)
	const className = useStyles(menu)

	return (
		<ul {...listBoxProps} ref={ref} className={className}>
			{[...state.collection].map((item) => (
				<ListBoxOption
					key={item.key}
					item={item}
					state={state}
					onAction={props.onAction}
				/>
			))}
		</ul>
	)
}

export const menuItem = style(
	text("md", 400, "highContrast"),
	focusRing(),
	radius.sm,
	spacing.padding({ x: 8, y: 2 }),
	{
		margin: 0,
		cursor: "default",
		userSelect: "none",
		"&:hover": {
			backgroundColor: colors.grayAlpha[4],
		},
		"&[data-hovered='true']": {
			backgroundColor: colors.grayAlpha[4],
		},
		"&[aria-current='page']": {
			backgroundColor: colors.grayAlpha[5],
		},
		"&[aria-selected='true']": {
			backgroundColor: colors.grayAlpha[5],
		},
		"&:active": {
			backgroundColor: colors.grayAlpha[5],
		},
	},
)

type MenuOptionProps<T> = {
	item: Node<T>
	state: ListState<T>
	onAction?: AriaListBoxOptions<T>["onAction"]
}

function ListBoxOption<T extends object>({
	item,
	state,
	onAction,
}: MenuOptionProps<T>) {
	const ref = useRef(null)
	const { optionProps } = useOption({ key: item.key }, state, ref)
	const className = useStyles(menuItem)

	const { isHovered, hoverProps } = useHover({})

	return (
		<li
			{...mergeProps(optionProps, hoverProps, {
				onPointerDown: () => onAction?.(item.key),
				onMouseDown: () => onAction?.(item.key),
				onClick: () => onAction?.(item.key),
				onKeyDown: (event: React.KeyboardEvent) => {
					if (event.key === "Enter" || event.key === " ") {
						onAction?.(item.key)
					}
				},
			})}
			ref={ref}
			className={className}
			data-hovered={isHovered || undefined}
		>
			<Flex row alignItems="center">
				{item.rendered}
				<Spacer />
			</Flex>
		</li>
	)
}

export const MenuItem = Item
