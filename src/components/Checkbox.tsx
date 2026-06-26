import { useRef } from "react"
import { useCheckbox } from "react-aria"
import { useToggleState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { focusRing } from "../utils/focusRing"

type CheckboxProps = {
	label?: string
	checked: boolean
	setChecked: (checked: boolean) => void
}

const checkboxClass = style(focusRing("& .checkbox-input:focus-visible + .checkbox-toggle"), {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	position: "relative",
	width: "fit-content",
	padding: "6px",
	gap: "6px",
	"& .checkbox-input": {
		position: "absolute",
		top: 0,
		left: 0,
		margin: 0,
		padding: 0,
		opacity: 0.0001,
	},
	"& .checkbox-toggle": {
		pointerEvents: "none",
		transition: "all 130ms ease-in-out",
		height: "14px",
		width: "14px",
		padding: "1px",
		borderRadius: "2px",
		backgroundColor: "var(--sand-7)",
	},
	"& input:checked + .checkbox-toggle": {
		backgroundColor: "var(--accent-color)",
	},
	"& .checkbox-toggle svg": {
		transition: "all 130ms ease-in-out",
	},
	"&:hover .checkbox-toggle": {
		backgroundColor: "var(--sand-8)",
	},
	"&:hover input:checked + .checkbox-toggle": {
		backgroundColor: "var(--accent-color)",
	},
})

export function Checkbox(props: CheckboxProps) {
	const { label, checked, setChecked } = props
	const state = useToggleState({ isSelected: checked, onChange: setChecked })
	const ref = useRef(null)
	const { inputProps } = useCheckbox({ "aria-label": props.label }, state, ref)
	const className = useStyles(checkboxClass)

	return (
		<label className={className}>
			<input type="checkbox" className="checkbox-input" {...inputProps} />
			<span className="checkbox-toggle">
				<svg
					focusable="false"
					aria-hidden="true"
					role="img"
					width={12}
					height={12}
					viewBox="0 0 11 11"
					style={{
						paddingLeft: 1,
						paddingTop: 1,
						opacity: checked ? 1 : 0,
						transform: checked ? "scale(1)" : "scale(0)",
						fill: "var(--sand-3)",
					}}
				>
					<path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z"></path>
				</svg>
			</span>
			{label && <span className="checbox-label">{label}</span>}
		</label>
	)
}
