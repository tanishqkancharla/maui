import { css } from "goober";
import React from "react";

export function H1(props: { children: string }) {
	return <h1>{props.children}</h1>;
}

export function H2(props: { children: string }) {
	return <h2>{props.children}</h2>;
}

export function H3(props: { children: string }) {
	return <h3>{props.children}</h3>;
}

const pClass = css`
	margin: 1.25em 0;
	color: var(--sand-11);
	font-size: 0.9rem;
	font-family: system-ui, -apple-system;
	letter-spacing: 0.015em;
	line-height: 19px;
	max-width: 500px;
`;

export function P(props: { children: string }) {
	return <p className={pClass}>{props.children}</p>;
}

const blockquoteClass = css`
	border-left: 2px solid var(--accent-color);
	margin: 1.45em 0;
	padding-left: 12px;
	font-style: italic;
	color: var(--sand-10);
	font-size: 0.9rem;
	font-family: system-ui, -apple-system;
	letter-spacing: 0.015em;
	line-height: 19px;
	max-width: 500px;
`;

export function Blockquote(props: { children: string }) {
	return <blockquote className={blockquoteClass}>{props.children}</blockquote>;
}
