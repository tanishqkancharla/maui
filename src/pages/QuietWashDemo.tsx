import React from "react"
import { Button as RACButton } from "react-aria-components"
import { defineVars, style, useStyles, type StyleElement } from "purse-styles"
import { Icons } from "../components/Icons"
import { CodeBlock } from "../components/CodeBlock"
import { H3, P } from "../components/Typography"
import { Text } from "../components/Text"
import { Flex } from "../components/Utils"
import { isCssColor, type ButtonVariantColor } from "../components/Button"
import {
	backgroundColor,
	surfaceMixPercent,
	surfaceWash,
} from "../tokens/background"
import {
	colors,
	type ColorName,
	type ColorScale,
	type PaletteName,
} from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { DARK_THEME } from "../theme/dataTheme"
import { memoize } from "../utils/memoize"

const HOVER_LIGHT = 6
const HOVER_DARK = 9
const PRESS_LIGHT = 12
const PRESS_DARK = 18

type Preview = "hover" | "press"

function paletteAlpha(name: ColorName): ColorScale {
	if (name === "accent") return colors.accentAlpha
	return colors[`${name}Alpha` as `${PaletteName}Alpha`]
}

function themeWash(foreground: string, lightPercent: number, darkPercent: number) {
	return defineVars({
		wash: {
			default: surfaceWash(foreground, lightPercent, backgroundColor.element),
			[DARK_THEME]: surfaceWash(foreground, darkPercent, backgroundColor.element),
		},
	}).wash
}

const chromeClass = style(
	text({ size: "xs", fontWeight: 400 }),
	focusRing("&:focus-visible"),
	spacing.padding({ x: 6, y: 4 }),
	{
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: spacing.value(2),
		borderRadius: "4px",
		width: "fit-content",
		height: "28px",
		border: "none",
		backgroundColor: "transparent",
		boxShadow: "none",
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		"& > svg": { flexShrink: 0 },
		"&:has(> svg)": { paddingBlock: spacing.value(3) },
		"&:has(> svg:first-child:not(:only-child))": {
			paddingInlineStart: spacing.value(4),
		},
		"&:has(> svg:last-child:not(:only-child))": {
			paddingInlineEnd: spacing.value(4),
		},
		"&:has(> svg:only-child)": { paddingInline: spacing.value(3) },
	},
)

const buttonTextClass = style({
	display: "block",
	minWidth: 0,
	textBox: "trim-both cap alphabetic",
})

function washSelectors(hover: string, press: string, colorHover: string) {
	return {
		"&:hover:not(:disabled):not([data-preview]), &[data-preview='hover']": {
			color: colorHover,
			backgroundColor: hover,
		},
		"&:active:not(:disabled):not([data-preview]), &[data-pressed]:not(:disabled):not([data-preview]), &[data-preview='press']":
			{
				color: colorHover,
				backgroundColor: press,
			},
	}
}

const currentGrayClass = style(chromeClass, {
	color: colors.gray[11],
	...washSelectors(
		backgroundColor.elementHover,
		backgroundColor.elementActive,
		colors.gray[12],
	),
})

const proposedGrayClass = style(chromeClass, {
	color: colors.gray[11],
	...washSelectors(
		themeWash(colors.grayAlpha[9], HOVER_LIGHT, HOVER_DARK),
		themeWash(colors.grayAlpha[9], PRESS_LIGHT, PRESS_DARK),
		colors.gray[12],
	),
})

const currentColoredClass = memoize((color: ButtonVariantColor) => {
	if (isCssColor(color)) {
		const fill = `oklch(from ${color} l c h / 1)`
		const hoverFill = `oklch(from ${fill} calc(l - 0.04) c h)`
		const wash = surfaceWash(fill, surfaceMixPercent.active, "transparent")
		return style(chromeClass, {
			color: fill,
			...washSelectors(wash, wash, hoverFill),
		})
	}
	const scale = colors[color]
	const wash = surfaceWash(scale[9], surfaceMixPercent.active, "transparent")
	return style(chromeClass, {
		color: scale[11],
		...washSelectors(wash, wash, scale[12]),
	})
})

const proposedColoredClass = memoize((color: ButtonVariantColor) => {
	if (isCssColor(color)) {
		const fill = `oklch(from ${color} l c h / 1)`
		const hoverFill = `oklch(from ${fill} calc(l - 0.04) c h)`
		return style(chromeClass, {
			color: fill,
			...washSelectors(
				themeWash(fill, HOVER_LIGHT, HOVER_DARK),
				themeWash(fill, PRESS_LIGHT, PRESS_DARK),
				hoverFill,
			),
		})
	}
	const scale = colors[color]
	const alpha = paletteAlpha(color)
	return style(chromeClass, {
		color: scale[11],
		...washSelectors(
			themeWash(alpha[9], HOVER_LIGHT, HOVER_DARK),
			themeWash(alpha[9], PRESS_LIGHT, PRESS_DARK),
			scale[12],
		),
	})
})

function DemoButton({
	buttonStyle,
	preview,
	children,
	"aria-label": ariaLabel,
}: {
	buttonStyle: StyleElement
	preview?: Preview
	children: React.ReactNode
	"aria-label"?: string
}) {
	const chrome = useStyles(buttonStyle)
	const label = useStyles(buttonTextClass)
	return (
		<RACButton
			className={chrome}
			aria-label={ariaLabel}
			data-preview={preview}
			excludeFromTabOrder={preview !== undefined}
		>
			{renderButtonChildren(children, label)}
		</RACButton>
	)
}

function renderButtonChildren(children: React.ReactNode, className: string) {
	const rendered: React.ReactNode[] = []
	let textRun: (string | number)[] = []
	const flush = () => {
		if (textRun.length === 0) return
		rendered.push(
			<span className={className} key={`text-${rendered.length}`}>
				{textRun}
			</span>,
		)
		textRun = []
	}
	for (const child of React.Children.toArray(children)) {
		if (typeof child === "string" || typeof child === "number") {
			textRun.push(child)
			continue
		}
		flush()
		rendered.push(child)
	}
	flush()
	return rendered
}

function SampleRow({
	kind,
	preview,
}: {
	kind: "current" | "proposed"
	preview?: Preview
}) {
	const gray = kind === "current" ? currentGrayClass : proposedGrayClass
	const colored = kind === "current" ? currentColoredClass : proposedColoredClass
	const frozen = preview !== undefined
	return (
		<Flex
			row
			alignItems="center"
			gap={4}
			style={{ flexWrap: "wrap", pointerEvents: frozen ? "none" : undefined }}
		>
			<DemoButton buttonStyle={gray} preview={preview}>
				Button
			</DemoButton>
			<DemoButton buttonStyle={gray} preview={preview}>
				<Icons.Plus />
				Create
			</DemoButton>
			<DemoButton
				buttonStyle={gray}
				preview={preview}
				aria-label="More actions"
			>
				<Icons.DotsHorizontal />
			</DemoButton>
			<DemoButton buttonStyle={colored("accent")} preview={preview}>
				Quiet accent
			</DemoButton>
			<DemoButton buttonStyle={colored("blue")} preview={preview}>
				Quiet blue
			</DemoButton>
			<DemoButton buttonStyle={colored("red")} preview={preview}>
				Quiet red
			</DemoButton>
			<DemoButton buttonStyle={colored("#6366f1")} preview={preview}>
				Quiet #6366f1
			</DemoButton>
		</Flex>
	)
}

function StateBlock({
	label,
	kind,
	preview,
}: {
	label: string
	kind: "current" | "proposed"
	preview?: Preview
}) {
	return (
		<Flex column gap={2}>
			<Text size="xs" color="lowContrast">
				{label}
			</Text>
			<SampleRow kind={kind} preview={preview} />
		</Flex>
	)
}

export function QuietWashDemo() {
	return (
		<>
			<H3>Quiet wash mockup</H3>
			<P>
				Gallery-only. Production <code>Button</code> is unchanged. Proposed
				quiet hover mixes <code>{"{color}Alpha[9]"}</code> into{" "}
				<code>background.element</code> at <strong>6% light / 9% dark</strong>{" "}
				(the percents that match today’s 3.5% <code>gray[12]</code> wash).
				Press is 2× (12% / 18%), same ratio as 3.5 → 7. Palette{" "}
				<code>variantColor</code> uses that color’s alpha 9 — no separate 7%
				opaque step-9 wash over transparent. Hex/rgb still mix the opaque
				fill at 6% / 9% (no alpha scale). Hover fills snap; no background
				transition.
			</P>
			<CodeBlock lang="typescript">{`// uncolored
color-mix(in oklch, grayAlpha[9] 6%, element) // light hover
color-mix(in oklch, grayAlpha[9] 9%, element) // dark hover

// variantColor="blue"
color-mix(in oklch, blueAlpha[9] 6%, element)`}</CodeBlock>

			<Flex column gap={6} style={{ marginTop: "16px" }}>
				<Flex column gap={4}>
					<Text size="sm" fontWeight={600}>
						Current
					</Text>
					<P>
						Gray: 3.5% / 7% <code>gray[12]</code> into element. Colored:
						7% opaque step 9 (or the hex) over transparent.
					</P>
					<StateBlock label="Rest (hover these)" kind="current" />
					<StateBlock label="Hover" kind="current" preview="hover" />
					<StateBlock label="Press" kind="current" preview="press" />
				</Flex>
				<Flex column gap={4}>
					<Text size="sm" fontWeight={600}>
						Proposed
					</Text>
					<P>
						Gray and palette colors share one recipe: alpha 9 at 6% / 9%
						into element. Press 12% / 18%.
					</P>
					<StateBlock label="Rest (hover these)" kind="proposed" />
					<StateBlock label="Hover" kind="proposed" preview="hover" />
					<StateBlock label="Press" kind="proposed" preview="press" />
				</Flex>
			</Flex>
		</>
	)
}
