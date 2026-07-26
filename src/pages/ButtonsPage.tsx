import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Dialog } from "../components/Dialog"
import { Icons } from "../components/Icons"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { colors } from "../tokens/colors"
import { backgroundColor } from "../tokens/background"
import { borderColor } from "../tokens/borders"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

export function ButtonsPage() {
	const [dialogOpen, setDialogOpen] = useState(false)
	const [overlayOpen, setOverlayOpen] = useState(false)

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Buttons</H2>
			<H3>Text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>Button</Button>
				<Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
				<Button onClick={() => setOverlayOpen(true)}>Open Overlay</Button>
			</Flex>

			<H3>Quiet</H3>
			<Flex row alignItems="center" gap={4}>
				<Button variant="quiet">Button</Button>
				<Button variant="quiet">
					<Icons.Plus />
					Create
				</Button>
				<Button variant="quiet" aria-label="More actions">
					<Icons.DotsHorizontal />
				</Button>
			</Flex>

			<H3>Icons with text</H3>
			<Flex row alignItems="center" gap={4}>
				<Button>
					<Icons.Plus />
					Create
				</Button>
				<Button>
					Archive
					<Icons.Archive />
				</Button>
			</Flex>

			<H3>Icon only</H3>
			<P>Icon-only buttons need an accessible label that describes the action.</P>
			<Flex row alignItems="center" gap={4}>
				<Button aria-label="Search">
					<Icons.Search />
				</Button>
				<Button aria-label="More actions">
					<Icons.DotsHorizontal />
				</Button>
			</Flex>

			<H3>Craft Agents comparison</H3>
			<P>
				Craft uses a 15% foreground border without a subtle shadow, paired
				with a much lighter 3% foreground wash on hover.
			</P>
			<CraftAgentsComparison />

			{dialogOpen && (
				<Dialog onClickOutside={() => setDialogOpen(false)}>
					<H3>Dialog</H3>
					<P>Dialog composes Overlay and FocusScope into a modal surface.</P>
					<Button onClick={() => setDialogOpen(false)}>Close Dialog</Button>
				</Dialog>
			)}

			{overlayOpen && (
				<Overlay onClickOutside={() => setOverlayOpen(false)}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							height: "100%",
							background: "rgb(0 0 0 / 45%)",
						}}
					>
						<div
							style={{
								background: colors.gray[2],
								border: `1px solid ${borderColor.outline}`,
								borderRadius: "6px",
								padding: "24px",
							}}
						>
							<H3>Overlay</H3>
							<P>Click outside this panel or press the button to dismiss it.</P>
							<Button onClick={() => setOverlayOpen(false)}>
								Close Overlay
							</Button>
						</div>
					</div>
				</Overlay>
			)}
		</Prose>
	)
}

function CraftAgentsComparison() {
	const comparisonClassName = useStyles(comparisonClass)
	const sampleClassName = useStyles(comparisonSampleClass)
	const labelClassName = useStyles(comparisonLabelClass)
	const craftButtonClassName = useStyles(craftOutlineButtonClass)

	return (
		<div className={comparisonClassName}>
			<div className={sampleClassName}>
				<span className={labelClassName}>Current</span>
				<Button>Button</Button>
			</div>
			<div className={sampleClassName}>
				<span className={labelClassName}>Craft outline</span>
				<Button className={craftButtonClassName}>Button</Button>
			</div>
		</div>
	)
}

const craftOutlineButtonClass = style({
	boxSizing: "border-box",
	paddingBlock: `calc(${spacing.value(4)} - 1px)`,
	paddingInline: `calc(${spacing.value(6)} - 1px)`,
	border: `1px solid color-mix(in oklch, ${colors.gray[12]} 15%, transparent)`,
	backgroundColor: backgroundColor.element,
	boxShadow: "none",
	"&:hover": {
		backgroundColor: `color-mix(in oklch, ${colors.gray[12]} 3%, ${backgroundColor.element})`,
	},
})

const comparisonClass = style({
	display: "flex",
	alignItems: "flex-start",
	gap: spacing.value(12),
	flexWrap: "wrap",
})

const comparisonSampleClass = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-start",
	gap: spacing.value(4),
})

const comparisonLabelClass = style(text("xs", 500, "lowContrast"))
