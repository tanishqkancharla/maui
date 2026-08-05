import { style } from "purse-styles"
import { memoize } from "../utils/memoize"
import { colors } from "./colors"
import { motionEasing, motionStreamDurationMs } from "./motion"
import { fontFamily } from "./text"

/**
 * Long-form/reading type scale. Distinct from the `text` token group (which
 * sizes application UI): prose runs larger, with line-heights and vertical
 * rhythm tuned for sustained reading. The `Prose` container picks a size and
 * typography components inside it opt into the matching prose treatment.
 *
 * Sizes and spacing are ported from the Tailwind Typography plugin
 * (https://github.com/tailwindlabs/tailwindcss-typography): `sm` -> 14px base,
 * `md` -> Tailwind's `base` (16px), `lg` -> 18px. Tailwind's em-relative values
 * are resolved to px here so they compose with Maui's px-based tokens.
 */
export type ProseSize = "sm" | "md" | "lg"

type BlockMetric = {
	fontSize: number
	lineHeight: number
}

type HeadingMetric = BlockMetric & {
	// Vertical rhythm around the heading. `marginTop` is the break before a
	// heading; `marginBottom` is the (smaller) gap that hugs it to whatever
	// follows. Both feed the container's margin-top-only rhythm model.
	marginTop: number
	marginBottom: number
}

type ProseMetric = {
	blockGap: number
	paragraph: BlockMetric
	h1: HeadingMetric
	h2: HeadingMetric
	h3: HeadingMetric
	h4: HeadingMetric
	listPadding: number
	listItemGap: number
	listNestedGap: number
}

const metrics: Record<ProseSize, ProseMetric> = {
	sm: {
		blockGap: 16,
		paragraph: { fontSize: 14, lineHeight: 24 },
		h1: { fontSize: 30, lineHeight: 36, marginTop: 32, marginBottom: 24 },
		h2: { fontSize: 20, lineHeight: 28, marginTop: 32, marginBottom: 16 },
		h3: { fontSize: 18, lineHeight: 28, marginTop: 28, marginBottom: 8 },
		h4: { fontSize: 14, lineHeight: 20, marginTop: 20, marginBottom: 8 },
		listPadding: 22,
		listItemGap: 4,
		listNestedGap: 8,
	},
	md: {
		blockGap: 20,
		paragraph: { fontSize: 16, lineHeight: 28 },
		h1: { fontSize: 36, lineHeight: 40, marginTop: 48, marginBottom: 32 },
		h2: { fontSize: 24, lineHeight: 32, marginTop: 48, marginBottom: 24 },
		h3: { fontSize: 20, lineHeight: 32, marginTop: 32, marginBottom: 12 },
		h4: { fontSize: 16, lineHeight: 24, marginTop: 24, marginBottom: 8 },
		listPadding: 26,
		listItemGap: 8,
		listNestedGap: 12,
	},
	lg: {
		blockGap: 24,
		paragraph: { fontSize: 18, lineHeight: 32 },
		h1: { fontSize: 48, lineHeight: 48, marginTop: 56, marginBottom: 40 },
		h2: { fontSize: 30, lineHeight: 40, marginTop: 56, marginBottom: 32 },
		h3: { fontSize: 24, lineHeight: 36, marginTop: 40, marginBottom: 16 },
		h4: { fontSize: 18, lineHeight: 28, marginTop: 32, marginBottom: 8 },
		listPadding: 28,
		listItemGap: 12,
		listNestedGap: 16,
	},
}

// Heading weights follow Tailwind's descending scale, capped at Maui's
// heaviest weight (700).
const headingColor = colors.gray[12]
const bodyColor = colors.gray[12]
const quoteColor = colors.gray[11]

const px = (value: number) => `${value}px`

const block = (metric: BlockMetric) => ({
	fontSize: px(metric.fontSize),
	lineHeight: px(metric.lineHeight),
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
		// Inline elements inherit their size from the surrounding block; these
		// values only matter when a link or list sits on its own. Links pick up
		// Tailwind's medium weight + underline treatment.
		link: style(block(m.paragraph), {
			fontWeight: 500,
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
			"& > li + li": {
				marginTop: px(m.listItemGap),
			},
			"& li > ul, & li > ol": {
				marginTop: px(m.listNestedGap),
			},
		}),
	}
})

// Matches a preceding sibling only if it's NOT itself a heading, so stacked
// headings (H2 immediately followed by H3) hug together instead of both
// getting a big "new section" break.
const notHeading = ":not(h1):not(h2):not(h3):not(h4)"

/**
 * Vertical rhythm for the `Prose` container at a given size. Uses a
 * margin-top-only model (the gap between two blocks is the second block's
 * top margin), so there are no collapsing margins to reason about. Heading
 * `marginBottom` becomes the "hug" gap after a heading; heading `marginTop`
 * becomes the larger break before it.
 */
export const proseRhythm = memoize((size: ProseSize) => {
	const m = metrics[size]

	return style({
		"& > * + *": {
			marginTop: px(m.blockGap),
		},
		// Gap after a heading: hug it to the content that follows.
		"& > h1 + *": { marginTop: px(m.h1.marginBottom) },
		"& > h2 + *": { marginTop: px(m.h2.marginBottom) },
		"& > h3 + *": { marginTop: px(m.h3.marginBottom) },
		"& > h4 + *": { marginTop: px(m.h4.marginBottom) },
		// Break before a heading (only when it opens a new section, i.e. it
		// isn't already hugging a preceding heading).
		[`& > ${notHeading} + h1`]: { marginTop: px(m.h1.marginTop) },
		[`& > ${notHeading} + h2`]: { marginTop: px(m.h2.marginTop) },
		[`& > ${notHeading} + h3`]: { marginTop: px(m.h3.marginTop) },
		[`& > ${notHeading} + h4`]: { marginTop: px(m.h4.marginTop) },
	})
})

/**
 * Element styles + vertical rhythm for HTML rendered outside React typography
 * components (TipTap's ProseMirror tree, Streamdown markdown output).
 *
 * Uses a flex column + `gap` stack so spacing doesn't depend on fragile
 * adjacent-sibling matching across Streamdown's memoized blocks.
 */
export const proseHtml = memoize((size: ProseSize) => {
	const m = metrics[size]

	return style({
		display: "flex",
		flexDirection: "column",
		gap: px(m.blockGap),
		"& p": {
			...block(m.paragraph),
			fontWeight: 400,
			color: bodyColor,
			margin: 0,
		},
		"& h1": {
			...block(m.h1),
			fontWeight: 700,
			color: headingColor,
			margin: 0,
		},
		"& h2": {
			...block(m.h2),
			fontWeight: 700,
			color: headingColor,
			margin: 0,
		},
		"& h3": {
			...block(m.h3),
			fontWeight: 600,
			color: headingColor,
			margin: 0,
		},
		"& h4": {
			...block(m.h4),
			fontWeight: 600,
			color: headingColor,
			margin: 0,
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
			margin: 0,
		},
		"& ul, & ol": {
			...block(m.paragraph),
			fontWeight: 400,
			color: bodyColor,
			paddingInlineStart: px(m.listPadding),
			margin: 0,
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
		"& ul > li + li, & ol > li + li": {
			marginTop: px(m.listItemGap),
		},
		"& li > ul, & li > ol": {
			marginTop: px(m.listNestedGap),
		},
		"& strong": { fontWeight: 600 },
		"& em": { fontStyle: "italic" },
		"& code": {
			fontFamily:
				'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
			fontSize: "0.875em",
		},
		"& pre, & .maui-code-block": {
			margin: 0,
			overflowX: "auto",
			minWidth: 0,
		},
		"& hr": {
			border: "none",
			borderTop: `1px solid ${colors.gray[6]}`,
			margin: 0,
		},
		"& table": {
			margin: 0,
		},
	})
})

/** Fade list markers in with Streamdown word animation while streaming. */
export const proseStreamingMarkers = style({
	"& li::before": {
		animation: `sd-fadeIn ${motionStreamDurationMs}ms ${motionEasing} both`,
	},
})
