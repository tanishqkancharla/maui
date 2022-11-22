import { CollectionChildren, Node } from "@react-types/shared"
import { css } from "goober"
import React, { useRef } from "react"
import {
	AriaListBoxOptions,
	mergeProps,
	useHover,
	useListBox,
	useOption,
} from "react-aria"
import { Item, ListState, useListState } from "react-stately"
import { bodyFontStyles } from "../utils/styles"
import { Icons } from "./Icons"
import { Flex, Spacer } from "./Utils"

const listboxClass = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`

type ListBoxProps<T> = {
	children: CollectionChildren<T>
} & AriaListBoxOptions<T>

export function Listbox<T extends object>(props: ListBoxProps<T>) {
	const state = useListState(props)
	const ref = useRef(null)
	const { listBoxProps } = useListBox(props, state, ref)

	return (
		<ul {...listBoxProps} ref={ref} className={listboxClass}>
			{[...state.collection].map((item) => (
				<MenuOption key={item.key} item={item} state={state} />
			))}
		</ul>
	)
}

const listboxOptionClass = css`
	margin: 0;
	padding: 0;
	color: white;
	cursor: default;
	${bodyFontStyles};
	padding: 4px 16px;
	border-radius: 2px;
	user-select: none;

	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:active {
		background-color: var(--sand-A5);
	}
`

type MenuOptionProps<T> = {
	item: Node<T>
	state: ListState<T>
}

function MenuOption<T extends object>({ item, state }: MenuOptionProps<T>) {
	const ref = useRef(null)
	const { optionProps, isSelected } = useOption({ key: item.key }, state, ref)

	const { isHovered, hoverProps } = useHover({})

	return (
		<li
			{...mergeProps(optionProps, hoverProps)}
			ref={ref}
			className={listboxOptionClass}
			style={{
				background: isHovered ? "var(--sand-A4)" : undefined,
				outline: "none",
			}}
		>
			<Flex row alignItems="center">
				{item.rendered}
				<Spacer />
				{isSelected && <Icons.Check />}
			</Flex>
		</li>
	)
}

export const MenuItem = Item
