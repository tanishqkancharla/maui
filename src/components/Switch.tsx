import { useRef } from "react"
import { useSwitch } from "react-aria"
import { ToggleState, useToggleState } from "react-stately"
import { style } from "../utils/styles"

const switchClass = style({
	//   `
	// 	display: flex;
	// 	flex-direction: row;
	// 	align-items: center;
	// 	position: relative;
	// 	width: fit-content;
	// 	padding: 6px;
	// 	gap: 6px;
	// 	& .switch-input {
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		margin: 0;
	// 		padding: 0;
	// 		opacity: 0.0001;
	// 	}
	// 	& .switch-toggle {
	// 		position: relative;
	// 		width: 26px;
	// 		height: 16px;
	// 		padding: 1px;
	// 	}
	// 	& .switch-toggle::before {
	// 		content: "";
	// 		z-index: 2;
	// 		position: absolute;
	// 		top: 3.5px;
	// 		left: 4px;
	// 		display: block;
	// 		width: 9px;
	// 		height: 9px;
	// 		border-radius: 100%;
	// 		background-color: black;
	// 		/* background-color: var(--sand-6); */
	// 		transition: all 130ms ease-in-out;
	// 	}
	// 	&:hover .switch-toggle::before {
	// 		background-color: var(--sand-2);
	// 	}
	// 	& .switch-input:checked + .switch-toggle::before {
	// 		/* border: 2px solid var(--accent-color); */
	// 		left: 15px;
	// 	}
	// 	& .switch-input:checked + .switch-toggle::after {
	// 		background-color: var(--accent-color);
	// 	}
	// 	& .switch-toggle::after {
	// 		content: "";
	// 		position: absolute;
	// 		display: block;
	// 		width: 26px;
	// 		height: 14px;
	// 		border-radius: 8px;
	// 		/* border: 1px solid transparent; */
	// 		/* background-color: black; */
	// 		background-color: var(--sand-7);
	// 		transition: all 130ms ease-in-out;
	// 	}
	// 	&:hover .switch-toggle::after {
	// 		background-color: var(--sand-8);
	// 	}
	// 	&:focus-visible .switch-toggle::after {
	// 		outline: 1px solid var(--accent-color);
	// 	}
	// `
})

type SwitchProps = {
	label: string
	selected: boolean
	onChange: (selected: boolean) => void
}

export function Switch(props: SwitchProps) {
	const { selected, onChange, label } = props
	const state: ToggleState = useToggleState({ isSelected: selected, onChange })
	const ref = useRef(null)

	const { inputProps } = useSwitch({ "aria-label": label }, state, ref)

	return (
		<label className={switchClass}>
			<input {...inputProps} className="switch-input" ref={ref} />
			<span className="switch-toggle"></span>
			<span className="switch-label">{props.label}</span>
		</label>
	)
}
