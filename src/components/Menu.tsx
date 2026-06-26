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
import { focusRing } from "../utils/focusRing"

const listboxClass = style({
	margin: 0,
	padding: 0,
	listStyleType: "none",
})

type ListBoxProps<T> = {
	children: CollectionChildren<T>
} & AriaListBoxOptions<T>

export function ListBox<T extends object>(props: ListBoxProps<T>) {
	const state = useListState(props)
	const ref = useRef(null)
	const { listBoxProps } = useListBox(props, state, ref)
	const className = useStyles(listboxClass)

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

const listboxOptionClass = style(focusRing(), {
	margin: 0,
	color: "white",
	cursor: "default",
	fontWeight: 400,
	fontSize: "12px",
	fontFamily:
		'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif',
	letterSpacing: "0.01em",
	lineHeight: "16px",
	padding: "4px 16px",
	borderRadius: "2px",
	userSelect: "none",
	"&:active": {
		backgroundColor: "var(--sand-A5)",
	},
})

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
	const { optionProps, isSelected } = useOption({ key: item.key }, state, ref)
	const className = useStyles(listboxOptionClass)

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
			style={{
				background: isHovered ? "var(--sand-A4)" : undefined,
			}}
		>
			<Flex row alignItems="center">
				{item.rendered}
				<Spacer />
			</Flex>
		</li>
	)
}

export const MenuItem = Item
