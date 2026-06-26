import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../../components/Button"
import { H2, H3, P } from "../../components/Typography"
import { motion } from "../../utils/motion"

const animatedCardClass = style(
	motion.standard("transform", "box-shadow", "background", "border-color"),
	{
		border: "1px solid",
		borderRadius: "4px",
		padding: "8px 12px",
		width: "fit-content",
	},
)

export function MotionPage() {
	const [isActive, setIsActive] = useState(false)
	const animatedCardClassName = useStyles(animatedCardClass)

	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Motion</H2>
			<P>
				Motion tokens keep interactive feedback consistent. Right now the system
				is mostly fast hover/focus transitions; reduced-motion behavior can come
				later.
			</P>

			<H3>Values</H3>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={tableHeaderStyle}>Name</th>
						<th style={tableHeaderStyle}>Value</th>
						<th style={tableHeaderStyle}>Use</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={tableCellStyle}>
							<code>motion.standard(...properties)</code>
						</td>
						<td style={tableCellStyle}>
							<code>{`style({ transition: "<property> 80ms ease-in-out" })`}</code>
						</td>
						<td style={tableCellStyle}>
							Builds a transition style object from the properties that should
							animate.
						</td>
					</tr>
				</tbody>
			</table>

			<H3>Example</H3>
			<pre style={codeBlockStyle}>
				<code>{`const [isActive, setIsActive] = useState(false)

const animatedCard = style(
	motion.standard("transform", "box-shadow", "background", "border-color"),
	{
		border: "1px solid",
		borderRadius: "4px",
		padding: "8px 12px",
		width: "fit-content",
	},
)

<Button onClick={() => setIsActive((value) => !value)}>Trigger motion</Button>
<div
	className={useStyles(animatedCard)}
	style={{
		transform: isActive ? "translateX(96px)" : "translateX(0)",
		background: isActive ? "var(--accent-A4)" : "var(--sand-3)",
		borderColor: isActive ? "var(--accent-8)" : "var(--sand-6)",
		boxShadow: isActive ? "var(--shadow-middle)" : "var(--shadow-thin)",
	}}
/>`}</code>
			</pre>

			<div
				className="maui-example-panel"
				style={{ display: "flex", flexDirection: "column", gap: "16px" }}
			>
				<Button onClick={() => setIsActive((value) => !value)}>
					Trigger motion
				</Button>
				<div
					className={animatedCardClassName}
					style={{
						background: isActive ? "var(--accent-A4)" : "var(--sand-3)",
						borderColor: isActive ? "var(--accent-8)" : "var(--sand-6)",
						boxShadow: isActive ? "var(--shadow-middle)" : "var(--shadow-thin)",
						transform: isActive ? "translateX(96px)" : "translateX(0)",
					}}
				>
					Fast interactive transition
				</div>
			</div>
		</section>
	)
}

const tableHeaderStyle = {
	color: "var(--sand-10)",
	fontSize: "11px",
	fontWeight: 500,
	letterSpacing: "0.04em",
	padding: "0 12px 8px 0",
	textAlign: "left",
	textTransform: "uppercase",
} as const
const tableCellStyle = {
	borderTop: "1px solid var(--sand-5)",
	color: "var(--sand-11)",
	padding: "10px 12px 10px 0",
	verticalAlign: "top",
} as const
const codeBlockStyle = {
	background: "var(--sand-2)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	color: "var(--sand-12)",
	padding: "12px",
	overflowX: "auto",
} as const
