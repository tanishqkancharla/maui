import { useState } from "react"
import { Table, TableBody, TableCell, TableHead,
	TableHeader, TableRow } from "../components/Table"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { motion, motionDurationMs, motionEasing } from "../tokens/motion"
import { shadowVars } from "../tokens/shadow"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
const animatedCardClass = style(
	motion.standard("transform", "box-shadow", "background", "border-color"),
	{
		border: "1px solid",
		borderRadius: "4px",
		padding: "8px 12px",
		width: "fit-content",
	},
)

export function MotionTokenPage() {
	const [isActive, setIsActive] = useState(false)
	const animatedCardClassName = useStyles(animatedCardClass)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Motion</H2>
			<P>
				Motion tokens keep interactive feedback consistent. Right now the system
				is mostly fast hover/focus transitions; reduced-motion behavior can come
				later.
			</P>

			<H3>Values</H3>
			<Table aria-label="Motion tokens">
				<TableHeader>
					<TableHead isRowHeader>Name</TableHead>
					<TableHead>Value</TableHead>
					<TableHead>Use</TableHead>
				</TableHeader>
				<TableBody>
					<TableRow>
						<TableCell>
							<code>motion.standard(...properties)</code>
						</TableCell>
						<TableCell>
							<code>{`style({ transition: "<property> ${motionDurationMs}ms ${motionEasing}" })`}</code>
						</TableCell>
						<TableCell>
							Builds a transition style object from the properties that should
							animate.
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<H3>Example</H3>
			<CodeBlock lang="tsx">{`const [isActive, setIsActive] = useState(false)

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
		background: isActive ? colors.accentAlpha[4] : colors.gray[3],
		borderColor: isActive ? colors.accent[8] : borderColor.outline,
		boxShadow: isActive ? shadowVars.medium : shadowVars.subtle,
	}}
/>`}</CodeBlock>

			<Panel
				style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "16px" }}
			>
				<Button onClick={() => setIsActive((value) => !value)}>
					Trigger motion
				</Button>
				<div
					className={animatedCardClassName}
					style={{
						background: isActive ? colors.accentAlpha[4] : colors.gray[3],
						borderColor: isActive ? colors.accent[8] : borderColor.outline,
						boxShadow: isActive ? shadowVars.medium : shadowVars.subtle,
						transform: isActive ? "translateX(96px)" : "translateX(0)",
					}}
				>
					Fast interactive transition
				</div>
			</Panel>
		</Prose>
	)
}

