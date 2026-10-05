import { useState } from "react"
import { Table, TableBody, TableCell, TableHead,
	TableHeader, TableRow } from "../components/Table"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { CodeBlock } from "../components/CodeBlock"
import { Panel } from "./Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { motion, motionDurationMs, motionEasing, overlayMotion } from "../tokens/motion"
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
				Motion tokens keep control feedback and transient overlays consistent.
				Controls stay fast; overlays enter gently, dismiss faster, and reduce to
				opacity-only motion when requested.
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
							<Code>motion.standard(...properties)</Code>
						</TableCell>
						<TableCell>
							<Code>{`style({ transition: "<property> ${motionDurationMs}ms ${motionEasing}" })`}</Code>
						</TableCell>
						<TableCell>
							Builds a transition style object from the properties that should
							animate.
						</TableCell>
					</TableRow>
					{overlayRecipes.map((recipe) => (
						<TableRow key={recipe.name}>
							<TableCell>
								<Code>{recipe.name}</Code>
							</TableCell>
							<TableCell>
								<Code>{`${recipe.durationMs}ms ${recipe.easing}`}</Code>
							</TableCell>
							<TableCell>{recipe.use}</TableCell>
						</TableRow>
					))}
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

const overlayRecipes = [
	{
		name: "overlayMotion.tooltipEnter",
		...overlayMotion.tooltipEnter,
		use: "Tooltip opacity and 2px directional travel.",
	},
	{
		name: "overlayMotion.tooltipExit",
		...overlayMotion.tooltipExit,
		use: "Tooltip opacity-only dismissal.",
	},
	{
		name: "overlayMotion.dialogEnter",
		...overlayMotion.dialogEnter,
		use: "Dialog opacity and 0.98 → 1 scale.",
	},
	{
		name: "overlayMotion.dialogExit",
		...overlayMotion.dialogExit,
		use: "Dialog reverse scale and fade.",
	},
	{
		name: "overlayMotion.backdrop",
		...overlayMotion.backdrop,
		use: "Backdrop opacity.",
	},
	{
		name: "overlayMotion.reduced",
		...overlayMotion.reduced,
		use: "Opacity-only reduced motion.",
	},
] as const
