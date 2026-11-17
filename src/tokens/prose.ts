import { defineVars, style } from "purse-styles"
import { LARGE_SCALE } from "../theme/dataScale"
import { memoize } from "../utils/memoize"
import { borderColor } from "./borders"
import { colors } from "./colors"
import { motionEasing, motionStreamDurationMs } from "./motion"
import { type Space, spacing } from "./spacing"
import { fontFamily, monoFontStyle } from "./text"

/**
 * Long-form/reading type scale. Distinct from the `text` token group (which
 * sizes application UI): prose runs larger, with line-heights and vertical
 * rhythm tuned for sustained reading. The `Prose` container picks a size and
 * typography components inside it opt into the matching prose treatment.
 *
 * Type sizes, line-heights, and vertical rhythm are ported from the Tailwind
 * Typography plugin (https://github.com/tailwindlabs/tailwindcss-typography):
 * `sm` -> 14px base, `md` -> Tailwind's `base` (16px), `lg` -> 18px. Type is
 * resolved to px; gaps snap to the `spacing` scale, so Tailwind's 20px or 28px
 * land on the nearest step.
 *
 * On the Large platform scale (coarse pointers) block font sizes and line
 * heights step up ~1.2x — the same idea as the `text` tokens — and the spacing
 * steps behind every gap step up with them, so reading content grows with the
 * rest of the UI on touch devices.
 */
export type ProseSize = "sm" | "md" | "lg"

type BlockMetric = {
	fontSize: string
	lineHeight: string
}

type HeadingMetric = BlockMetric & {
	// Vertical rhythm around the heading. `marginTop` is the break before a
	// heading; `marginBottom` is the (smaller) gap that hugs it to whatever
	// follows. Both feed the container's margin-top-only rhythm model.
	marginTop: string
	marginBottom: string
}

type ProseMetric = {
	paragraph: BlockMetric
	h1: HeadingMetric
	h2: HeadingMetric
	h3: HeadingMetric
	h4: HeadingMetric
	/** Default gap between blocks: paragraphs, lists, quotes. */
	blockGap: string
	/** Gap on both sides of code blocks and tables. */
	figureGap: string
	/** Gap on both sides of a horizontal rule. */
	ruleGap: string
	listPadding: number
	listItemGap: string
}

/** A block size that steps up with the platform data scale. */
const scaledPx = (normal: number, large: number) =>
	defineVars({
		px: { default: `${normal}px`, [LARGE_SCALE]: `${large}px` },
	}).px

// The spacing scale stops at 32px; larger section breaks sum two steps.
const space = (step: Space, ...more: Space[]) =>
	more.length === 0
		? spacing.value(step)
		: `calc(${[step, ...more].map((s) => spacing.value(s)).join(" + ")})`

const metrics: Record<ProseSize, ProseMetric> = {
	sm: {
		paragraph: { fontSize: scaledPx(14, 17), lineHeight: scaledPx(24, 29) },
		h1: {
			fontSize: scaledPx(30, 36),
			lineHeight: scaledPx(36, 43),
			marginTop: space(16),
			marginBottom: space(12),
		},
		h2: {
			fontSize: scaledPx(20, 24),
			lineHeight: scaledPx(28, 34),
			marginTop: space(16),
			marginBottom: space(8),
		},
		h3: {
			fontSize: scaledPx(18, 22),
			lineHeight: scaledPx(28, 34),
			marginTop: space(12),
			marginBottom: space(4),
		},
		h4: {
			fontSize: scaledPx(14, 17),
			lineHeight: scaledPx(20, 24),
			marginTop: space(8),
			marginBottom: space(4),
		},
		blockGap: space(6),
		figureGap: space(8),
		ruleGap: space(12, 8),
		listPadding: 20,
		listItemGap: space(2),
	},
	md: {
		paragraph: { fontSize: scaledPx(16, 19), lineHeight: scaledPx(28, 34) },
		h1: {
			fontSize: scaledPx(36, 43),
			lineHeight: scaledPx(40, 48),
			marginTop: space(16, 8),
			marginBottom: space(16),
		},
		h2: {
			fontSize: scaledPx(24, 29),
			lineHeight: scaledPx(32, 38),
			marginTop: space(16, 8),
			marginBottom: space(12),
		},
		h3: {
			fontSize: scaledPx(20, 24),
			lineHeight: scaledPx(32, 38),
			marginTop: space(16),
			marginBottom: space(6),
		},
		h4: {
			fontSize: scaledPx(16, 19),
			lineHeight: scaledPx(24, 29),
			marginTop: space(12),
			marginBottom: space(4),
		},
		blockGap: space(8),
		figureGap: space(12),
		ruleGap: space(16, 8),
		listPadding: 24,
		listItemGap: space(4),
	},
	lg: {
		paragraph: { fontSize: scaledPx(18, 22), lineHeight: scaledPx(32, 38) },
		h1: {
			fontSize: scaledPx(48, 58),
			lineHeight: scaledPx(48, 58),
			marginTop: space(16, 12),
			marginBottom: space(12, 8),
		},
		h2: {
			fontSize: scaledPx(30, 36),
			lineHeight: scaledPx(40, 48),
			marginTop: space(16, 12),
			marginBottom: space(16),
		},
		h3: {
			fontSize: scaledPx(24, 29),
			lineHeight: scaledPx(36, 43),
			marginTop: space(12, 8),
			marginBottom: space(8),
		},
		h4: {
			fontSize: scaledPx(18, 22),
			lineHeight: scaledPx(28, 34),
			marginTop: space(16),
			marginBottom: space(4),
		},
		blockGap: space(12),
		figureGap: space(16),
		ruleGap: space(16, 12),
		listPadding: 26,
		listItemGap: space(6),
	},
}

// Heading weights follow Tailwind's descending scale, capped at Maui's
// heaviest weight (700).
const headingColor = colors.gray[12]
const bodyColor = colors.gray[12]
const quoteColor = colors.gray[11]

const px = (value: number) => `${value}px`

const block = (metric: BlockMetric) => ({
	fontSize: metric.fontSize,
	lineHeight: metric.lineHeight,
	fontFamily,
})

export const prose = memoize((size: ProseSize) => {
	const m = metrics[size]

	return {
		paragraph: style(block(m.paragraph), {
			fontWeight: 400,
			color: bodyColor,
		}),
		h1: style(block(m.h1), { fontWeight: 700, color: headingColor }),
		h2: style(block(m.h2), { fontWeight: 700, color: headingColor }),
		h3: style(block(m.h3), { fontWeight: 600, color: headingColor }),
		h4: style(block(m.h4), { fontWeight: 600, color: headingColor }),
		// Links inherit typography from their immediate parent, even inside prose.
		link: style({
			font: "inherit",
			color: headingColor,
			textDecoration: "underline",
		}),
		blockquote: style(block(m.paragraph), {
			fontWeight: 500,
			fontStyle: "italic",
			color: quoteColor,
		}),
		list: style(block(m.paragraph), {
			fontWeight: 400,
			color: bodyColor,
			paddingInlineStart: px(m.listPadding),
			// One gap between items at any depth, including through wrappers.
			"& li + li, & li ul, & li ol": {
				marginTop: m.listItemGap,
			},
		}),
	}
})

// Blocks that get extra room on both sides, like Tailwind's `pre` and `table`.
// `:where` keeps specificity at zero so heading rules still win.
const figure =
	':where(pre, table, .maui-code-block, [data-streamdown="table-wrapper"], .tableWrapper)'

// Matches a preceding sibling only if it's NOT itself a heading, so stacked
// headings (H2 immediately followed by H3) hug together instead of both
// getting a big "new section" break.
const notHeading = ":not(h1):not(h2):not(h3):not(h4)"

/**
 * Vertical rhythm for the `Prose` container at a given size. Uses a
 * margin-top-only model (the gap between two blocks is the second block's
 * top margin), so there are no collapsing margins to reason about. Heading
 * `marginBottom` becomes the "hug" gap after a heading; heading `marginTop`
 * becomes the larger break before it. The first child never gets a margin,
 * matching Tailwind's `> :first-child { margin-top: 0 }`.
 */
export const proseRhythm = memoize((size: ProseSize, selector = "&") => {
	const m = metrics[size]

	return style({
		[`${selector} > * + *`]: {
			marginTop: m.blockGap,
		},
		[`${selector} > * + ${figure}, ${selector} > ${figure} + *`]: {
			marginTop: m.figureGap,
		},
		[`${selector} > * + hr, ${selector} > hr + *`]: {
			marginTop: m.ruleGap,
		},
		// Gap after a heading: hug it to the content that follows.
		[`${selector} > h1 + *`]: { marginTop: m.h1.marginBottom },
		[`${selector} > h2 + *`]: { marginTop: m.h2.marginBottom },
		[`${selector} > h3 + *`]: { marginTop: m.h3.marginBottom },
		[`${selector} > h4 + *`]: { marginTop: m.h4.marginBottom },
		// Break before a heading (only when it opens a new section, i.e. it
		// isn't already hugging a preceding heading).
		[`${selector} > ${notHeading} + h1`]: { marginTop: m.h1.marginTop },
		[`${selector} > ${notHeading} + h2`]: { marginTop: m.h2.marginTop },
		[`${selector} > ${notHeading} + h3`]: { marginTop: m.h3.marginTop },
		[`${selector} > ${notHeading} + h4`]: { marginTop: m.h4.marginTop },
	})
})

const blockMarginReset: string =
	":where(&) :where(p, h1, h2, h3, h4, blockquote, ul, ol, pre, .maui-code-block, hr, table)"

/**
 * Element styles + vertical rhythm for HTML rendered outside React typography
 * components (TipTap's ProseMirror tree, Streamdown markdown output).
 *
 * Direct children follow the same `proseRhythm` as the `Prose` container, so
 * Markdown headings open sections the way React typography does. The flex
 * column keeps margins from collapsing.
 */
export const proseHtml = memoize((size: ProseSize) => {
	const m = metrics[size]

	return style(proseRhythm(size), {
		display: "flex",
		flexDirection: "column",
		// Zero specificity so `proseRhythm` margins always win.
		[blockMarginReset]: { margin: 0 },
		"& p": {
			...block(m.paragraph),
			fontWeight: 400,
			color: bodyColor,
			// Let paragraphs (and images inside them) shrink to the column
			// instead of forcing it wider than a flex item's min-content.
			minWidth: 0,
		},
		"& h1": {
			...block(m.h1),
			fontWeight: 700,
			color: headingColor,
		},
		"& h2": {
			...block(m.h2),
			fontWeight: 700,
			color: headingColor,
		},
		"& h3": {
			...block(m.h3),
			fontWeight: 600,
			color: headingColor,
		},
		"& h4": {
			...block(m.h4),
			fontWeight: 600,
			color: headingColor,
		},
		"& a": {
			fontWeight: 500,
			color: headingColor,
			textDecoration: "underline",
		},
		"& blockquote": {
			...block(m.paragraph),
			fontWeight: 500,
			fontStyle: "italic",
			color: quoteColor,
			borderLeft: `2px solid ${colors.accent[10]}`,
			paddingLeft: "12px",
		},
		"& ul, & ol": {
			...block(m.paragraph),
			fontWeight: 400,
			color: bodyColor,
			paddingInlineStart: px(m.listPadding),
			minWidth: 0,
			listStyleType: "none",
		},
		"& ol": {
			counterReset: "maui-ol",
		},
		"& ul > li, & ol > li": {
			position: "relative",
		},
		"& ul > li::before": {
			content: '"•"',
			position: "absolute",
			left: px(-m.listPadding),
			width: px(m.listPadding),
			color: colors.gray[11],
			textAlign: "center",
		},
		"& ol > li": {
			counterIncrement: "maui-ol",
		},
		"& ol > li::before": {
			content: 'counter(maui-ol) "."',
			position: "absolute",
			left: px(-m.listPadding),
			width: px(m.listPadding),
			color: colors.gray[11],
			textAlign: "right",
			paddingRight: "0.4em",
			boxSizing: "border-box",
		},
		// One gap between items at any depth, including through editor node views.
		"& li + li, & li ul, & li ol": {
			marginTop: m.listItemGap,
		},
		"& strong": { fontWeight: 600 },
		"& em": { fontStyle: "italic" },
		"& code": {
			...monoFontStyle,
			fontSize: "0.875em",
		},
		"& pre, & .maui-code-block": {
			overflowX: "auto",
			minWidth: 0,
		},
		"& hr": {
			border: "none",
			borderTop: `1px solid ${colors.gray[6]}`,
		},
		"& table": {
			width: "100%",
			borderCollapse: "collapse",
			borderSpacing: 0,
		},
		"& th, & td": {
			...block(m.paragraph),
			padding: "6px 9px",
			borderBottom: `1px solid ${borderColor.border}`,
			fontVariantNumeric: "tabular-nums",
			textAlign: "left",
			verticalAlign: "middle",
		},
		"& th": {
			fontWeight: 500,
			color: colors.gray[11],
		},
		"& tr:last-child td": {
			borderBottom: "none",
		},
		"& img": {
			maxWidth: "100%",
			height: "auto",
			borderRadius: "6px",
		},
	})
})

/** Fade list markers in with Streamdown word animation while streaming. */
export const proseStreamingMarkers = style({
	"& li::before": {
		animation: `sd-fadeIn ${motionStreamDurationMs}ms ${motionEasing} both`,
	},
})
