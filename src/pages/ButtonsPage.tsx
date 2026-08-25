import { useState, type ReactNode } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Code } from "../components/Code"
import { Dialog } from "../components/Dialog"
import { Icons } from "../components/Icons"
import { Overlay } from "../components/Overlay"
import { Prose } from "../components/Prose"
import { H2, H3, H4, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { borderColor } from "../tokens/borders"
import { colorNames, colors, type ColorName } from "../tokens/colors"
import { memoize } from "../utils/memoize"

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

			<H3>Primary</H3>
			<P>
				<code>variant="primary"</code> fills with step 9 of{" "}
				<code>variantColor</code> (a palette name, default{" "}
				<code>"accent"</code>). Quiet uses the same color at the 3.5%
				surface-wash mix.
			</P>
			<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
				<Button variant="primary">Save</Button>
				<Button variant="primary">
					<Icons.Plus />
					Create
				</Button>
				<Button variant="primary" variantColor="blue">
					Blue
				</Button>
				<Button variant="primary" variantColor="red">
					Red
				</Button>
				<Button variant="primary" variantColor="orange">
					Orange
				</Button>
				<Button variant="quiet" variantColor="accent">
					Quiet accent
				</Button>
				<Button variant="quiet" variantColor="blue">
					Quiet blue
				</Button>
			</Flex>
			<Flex
				row
				alignItems="center"
				gap={3}
				style={{ flexWrap: "wrap", marginTop: "12px" }}
			>
				{colorNames.map((name) => (
					<Button key={name} variant="primary" variantColor={name}>
						{name}
					</Button>
				))}
			</Flex>

			<PrimaryRingTreatments />

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

const ringSamples: { label: string; color: ColorName }[] = [
	{ label: "Save", color: "accent" },
	{ label: "Blue", color: "blue" },
	{ label: "Red", color: "red" },
	{ label: "Orange", color: "orange" },
	{ label: "gray", color: "gray" },
]

function campsiteChromaticShadow(fill: string) {
	return [
		`0px 0px 4px oklch(from ${fill} calc(l * 0.42) c h / 0.18)`,
		`0px 0px 0px 0.5px oklch(from ${fill} calc(l * 0.42) c h / 0.6)`,
		"inset 0px 0.5px 0px rgb(255 255 255 / 0.08)",
		"inset 0px 0px 1px 1px rgb(255 255 255 / 0.12)",
		`inset 0px -1px 1px oklch(from ${fill} calc(l * 0.42) c h / 0.24)`,
		`inset 0px -4px 8px -4px oklch(from ${fill} calc(l * 0.42) c h / 0.1)`,
	].join(", ")
}

const ringTreatments: {
	title: string
	note: ReactNode
	overflowVisible?: boolean
	shadow?: (fill: string) => string
}[] = [
	{
		title: "Current — gray/black ring",
		note: (
			<>
				What ships today. Primary inherits <Code>shadow.subtle</Code>: a
				neutral 8% 1px ring plus Craft blurs.
			</>
		),
	},
	{
		title: "Tinted shadow.subtle",
		note: (
			<>
				Same three layers and offsets as <Code>shadow.subtle</Code>, but
				black/white is replaced with the fill hue at the same alphas (8% ring,
				6% blurs).
			</>
		),
		shadow: (fill) =>
			`oklch(from ${fill} l c h / 0.08) 0px 0px 0px 1px, oklch(from ${fill} l c h / 0.06) 0px 1px 1px -0.5px, oklch(from ${fill} l c h / 0.06) 0px 3px 3px -1.5px`,
	},
	{
		title: "Tinted shadow.subtle, mixed into black",
		note: (
			<>
				Same stack, pigment is <Code>color-mix(in oklch, fill 55%, black)</Code>{" "}
				then the original 8%/6% alphas — a colored gray, not a wash of the
				fill.
			</>
		),
		shadow: (fill) => {
			const pigment = `color-mix(in oklch, ${fill} 55%, black)`
			return `oklch(from ${pigment} l c h / 0.08) 0px 0px 0px 1px, oklch(from ${pigment} l c h / 0.06) 0px 1px 1px -0.5px, oklch(from ${pigment} l c h / 0.06) 0px 3px 3px -1.5px`
		},
	},
	{
		title: "Campsite chromatic",
		note: (
			<>
				What Campsite does on colored fills (<Code>important</Code> /{" "}
				<Code>onboarding</Code>): 0.5px same-hue hairline, same-hue outer
				glow, white inset highlight, darker inset wash. Not the gray Craft
				ring.
			</>
		),
		overflowVisible: true,
		shadow: campsiteChromaticShadow,
	},
]

const primaryShadowOverride = memoize(
	(boxShadow: string, overflowVisible: boolean) =>
		style({
			display: "contents",
			"& > button": overflowVisible
				? { boxShadow, overflow: "visible" }
				: { boxShadow },
			"& > button:focus-visible": {
				outline: "none",
				position: "relative",
				zIndex: 1,
				boxShadow: `0 0 0 1px ${colors.blueAlpha[8]}, 0 0 6px ${colors.blueAlpha[5]}, ${boxShadow}`,
			},
		}),
)

const previewPassthrough = style({ display: "contents" })

function PrimaryShadowPreview(props: {
	boxShadow?: string
	overflowVisible?: boolean
	children: ReactNode
}) {
	const className = useStyles(
		props.boxShadow
			? primaryShadowOverride(
					props.boxShadow,
					Boolean(props.overflowVisible),
				)
			: previewPassthrough,
	)
	return <span className={className}>{props.children}</span>
}

function PrimaryRingTreatments() {
	return (
		<section id="primary-ring-treatments">
			<H3>Primary ring treatments</H3>
			<P>
				Exploration, not shipped. Each row is the same five buttons with a
				different edge. Toggle light/dark in the sidebar to compare both
				themes.
			</P>
			{ringTreatments.map((treatment) => (
				<div key={treatment.title} style={{ marginTop: "16px" }}>
					<H4>{treatment.title}</H4>
					<P>{treatment.note}</P>
					<Flex
						row
						alignItems="center"
						gap={4}
						style={{ flexWrap: "wrap", marginTop: "8px" }}
					>
						{ringSamples.map((sample) => {
							const fill = colors[sample.color][9]
							const boxShadow = treatment.shadow?.(fill)
							return (
								<PrimaryShadowPreview
									key={sample.label}
									boxShadow={boxShadow}
									overflowVisible={treatment.overflowVisible}
								>
									<Button
										variant="primary"
										variantColor={
											sample.color === "accent"
												? undefined
												: sample.color
										}
									>
										{sample.label}
									</Button>
								</PrimaryShadowPreview>
							)
						})}
					</Flex>
				</div>
			))}
		</section>
	)
}
