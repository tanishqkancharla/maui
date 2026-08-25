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
import {
	colorNames,
	colors,
	type ColorName,
	type PaletteName,
} from "../tokens/colors"
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

const elevationBlur =
	"rgba(0, 0, 0, 0.06) 0px 1px 1px -0.5px, rgba(0, 0, 0, 0.06) 0px 3px 3px -1.5px"

const ringSamples: { label: string; color: ColorName }[] = [
	{ label: "Save", color: "accent" },
	{ label: "Blue", color: "blue" },
	{ label: "Red", color: "red" },
	{ label: "Orange", color: "orange" },
	{ label: "gray", color: "gray" },
]

const ringTreatments: {
	title: string
	note: ReactNode
	shadow?: (fill: string, color: ColorName) => string
}[] = [
	{
		title: "A. Current — gray/black ring",
		note: (
			<>
				What ships today. Primary inherits <Code>shadow.subtle</Code>: a
				neutral 8% 1px ring plus Craft blurs.
			</>
		),
	},
	{
		title: "B. No ring",
		note: (
			<>
				Radix Themes <Code>solid</Code>, Material 3 filled, Polaris. Quiet
				already does this.
			</>
		),
		shadow: () => "none",
	},
	{
		title: "C. Hue-matched darker edge",
		note: (
			<>
				Primer, Stripe, Apple. Mix black into the fill for the 1px ring; keep
				the elevation blurs.
			</>
		),
		shadow: (fill) =>
			`color-mix(in oklch, black 18%, ${fill}) 0px 0px 0px 1px, ${elevationBlur}`,
	},
	{
		title: "D. Soft same-hue ring",
		note: (
			<>
				Ring only, no gray blur.{" "}
				<Code>color-mix(in oklch, fill 70%, black)</Code>.
			</>
		),
		shadow: (fill) =>
			`color-mix(in oklch, ${fill} 70%, black) 0px 0px 0px 1px`,
	},
	{
		title: "E. Inset alpha ring",
		note: (
			<>
				Radix <Code>outline</Code> / <Code>surface</Code>. Inner 1px from the
				palette alpha scale (step 8).
			</>
		),
		shadow: (_fill, color) => `inset 0 0 0 1px ${paletteAlpha(color)[8]}`,
	},
	{
		title: "F. Relative color",
		note: (
			<>
				<Code>oklch(from fill calc(l * 0.82) c h)</Code> — lower lightness,
				keep chroma, plus elevation blurs.
			</>
		),
		shadow: (fill) =>
			`oklch(from ${fill} calc(l * 0.82) c h) 0px 0px 0px 1px, ${elevationBlur}`,
	},
]

const tintedGrays: ColorName[] = [
	"gray",
	"mauve",
	"slate",
	"sage",
	"olive",
	"sand",
]

function paletteAlpha(name: ColorName) {
	if (name === "accent") return colors.accentAlpha
	return colors[`${name}Alpha` as `${PaletteName}Alpha`]
}

const primaryShadowOverride = memoize((boxShadow: string) =>
	style({
		display: "contents",
		"& > button": {
			boxShadow,
		},
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
	children: ReactNode
}) {
	const className = useStyles(
		props.boxShadow
			? primaryShadowOverride(props.boxShadow)
			: previewPassthrough,
	)
	return <span className={className}>{props.children}</span>
}

function PrimaryRingTreatments() {
	return (
		<section id="primary-ring-treatments">
			<H3>Primary ring treatments</H3>
			<P>
				Exploration, not shipped. Primary fills currently share the gray{" "}
				<Code>shadow.subtle</Code> ring used on default controls. Each row is
				the same five buttons with a different edge. Toggle light/dark in the
				sidebar to compare both themes.
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
							const boxShadow = treatment.shadow?.(fill, sample.color)
							return (
								<PrimaryShadowPreview
									key={sample.label}
									boxShadow={boxShadow}
								>
									<Button
										variant="primary"
										variantColor={
											sample.color === "accent" ? undefined : sample.color
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

			<H4>G. Tinted gray pairing</H4>
			<P>
				A different lever: keep the current ring, but use a chromatic-adjacent
				neutral as the fill. Radix pairs sage with teal, mauve with violet,
				slate with blue. Pure <Code>gray</Code> is the one that clashes.
			</P>
			<Flex
				row
				alignItems="center"
				gap={4}
				style={{ flexWrap: "wrap", marginTop: "8px" }}
			>
				<Button variant="primary">accent</Button>
				{tintedGrays.map((name) => (
					<Button key={name} variant="primary" variantColor={name}>
						{name}
					</Button>
				))}
			</Flex>
		</section>
	)
}
