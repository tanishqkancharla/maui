import { css } from "goober";
import React, { useRef } from "react";
import { useSwitch } from "react-aria";
import { ToggleState } from "react-stately";

const switchClass = css`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 6px;

	& .switch-input {
		width: 0;
		height: 0;
		position: absolute;
		opacity: 0;
	}

	& .switch-toggle {
		position: relative;
		width: 26px;
		height: 16px;
		padding: 1px;
	}

	& .switch-toggle::before {
		content: "";
		z-index: 2;
		position: absolute;
		top: 3.5px;
		left: 4px;
		display: block;
		width: 9px;
		height: 9px;
		border-radius: 100%;
		background-color: black;
		/* background-color: var(--sand-6); */
		transition: all 130ms ease-in-out;
	}

	&:hover .switch-toggle::before {
		background-color: var(--sand-2);
	}

	& .switch-input:checked + .switch-toggle::before {
		/* border: 2px solid var(--accent-color); */
		left: 15px;
	}

	& .switch-input:checked + .switch-toggle::after {
		background-color: var(--accent-color);
	}

	& .switch-toggle::after {
		content: "";
		position: absolute;
		display: block;
		width: 26px;
		height: 14px;
		border-radius: 8px;
		/* border: 1px solid transparent; */
		/* background-color: black; */
		background-color: var(--sand-7);
		transition: all 130ms ease-in-out;
	}

	&:hover .switch-toggle::after {
		background-color: var(--sand-8);
	}

	&:focus-visible .switch-toggle::after {
		outline: 1px solid var(--accent-color);
	}
`;

export function Switch(props: {
	label: string;
	selected: boolean;
	onToggle: () => void;
}) {
	const { selected, onToggle } = props;
	const state: ToggleState = {
		isSelected: Boolean(selected),
		setSelected: (newSelected) =>
			newSelected === selected ? undefined : onToggle(),
		toggle: onToggle,
	};
	const ref = useRef(null);
	const { inputProps } = useSwitch({ onChange: onToggle }, state, ref);

	return (
		<label className={switchClass}>
			<input {...inputProps} className="switch-input" ref={ref} />
			<span className="switch-toggle"></span>
			<span className="switch-label">{props.label}</span>
		</label>
	);
}
