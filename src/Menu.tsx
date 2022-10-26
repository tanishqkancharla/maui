import { css } from "goober";
import React from "react";
import { bodyFontStyles } from "./styles";

const listboxClass = css`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export function Listbox(props: { children: React.ReactNode }) {
	return (
		<ul role="listbox" className={listboxClass}>
			{props.children}
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

	&:hover {
		background-color: var(--sand-A4);
	}

	&:active {
		background-color: var(--sand-A5);
	}
`;

export function MenuItem(props: { children: React.ReactNode }) {
	return (
		<li role="option" className={listboxOptionClass}>
			{props.children}
		</li>
	);
}
