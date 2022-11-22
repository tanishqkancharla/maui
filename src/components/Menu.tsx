import { CollectionChildren, Node } from "@react-types/shared";
import { css } from "goober";
import React, { useRef } from "react";
import {
	AriaListBoxOptions,
	mergeProps,
	useFocusRing,
	useListBox,
	useOption,
} from "react-aria";
import { Item, ListState, useListState } from "react-stately";
import { bodyFontStyles } from "../styles";

const listboxClass = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

type ListBoxProps<T> = {
	children: CollectionChildren<T>;
} & AriaListBoxOptions<T>;

export function Listbox<T extends object>(props: ListBoxProps<T>) {
	const state = useListState(props);
	const ref = useRef(null);
	const { listBoxProps } = useListBox(props, state, ref);

	return (
		<ul {...listBoxProps} ref={ref} className={listboxClass}>
			{[...state.collection].map((item) => (
				<MenuOption key={item.key} item={item} state={state} />
			))}
		</ul>
	);
}

const listboxOptionClass = css`
	margin: 0;
	padding: 0;
	color: white;
	cursor: default;
	${bodyFontStyles};
	padding: 4px 16px;
	text-align: center;
	border-radius: 2px;
	user-select: none;

	-webkit-user-select: none;
	-ms-user-select: none;
	user-select: none;

	&:active {
		background-color: var(--sand-A5);
	}
`;

type MenuOptionProps<T> = {
	item: Node<T>;
	state: ListState<T>;
};

function MenuOption<T extends object>({ item, state }: MenuOptionProps<T>) {
	const ref = useRef(null);
	const { optionProps, isFocused } = useOption(
		{ key: item.key, shouldFocusOnHover: true },
		state,
		ref
	);

	const { isFocusVisible, focusProps } = useFocusRing();

	return (
		<li
			{...mergeProps(optionProps, focusProps)}
			ref={ref}
			className={listboxOptionClass}
			style={{
				background: isFocused ? "var(--sand-A4)" : undefined,
				outline: isFocusVisible ? "1.5px solid rgba(79,146,197,0.2)" : "none",
			}}
		>
			{item.rendered}
		</li>
	);
}

export const MenuItem = Item;
