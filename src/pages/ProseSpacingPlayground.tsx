/** Gallery-only spacing playground. Not a `"maui"` package component. */
import { useLayoutEffect, useRef, useState } from "react"
import { style, useStyles } from "purse-styles"
import { RadioOption, RadioOptionGroup } from "../components/Radio"
import { AssistantMessage } from "../patterns/AssistantMessage"
import { useScale, type ResolvedScale } from "../theme/ScaleContext"
import { colors } from "../tokens/colors"
import { flex } from "../tokens/layout"
import type { ProseSize } from "../tokens/prose"
import { monoFontStyle } from "../tokens/text"

export const proseSpacingSample = `# Migrating the inbox

The inbox now reads from the shared store instead of its own cache. This note covers what moved, what to check, and what is left.

## What changed

Threads, labels, and drafts load through one subscription. Opening a thread no longer refetches it, and switching folders keeps scroll position.

- Thread list reads from \`store.threads\`
- Label counts update without a refresh
- Drafts save on every keystroke

### Reading a thread

A thread view subscribes to its messages by id:

\`\`\`ts
const messages = useQuery(store, (tx) => tx.scan({ prefix: ["thread", id] }))
\`\`\`

#### Edge cases

Deleted messages stay in the tuple store until the next sync, so filter them out before rendering.

1. Filter tombstoned rows
2. Sort by \`sentAt\`
3. Group consecutive messages from one sender

## Rollout

| Stage | Audience | Status |
| --- | --- | --- |
| Internal | Maui team | Done |
| Beta | Opt-in users | In progress |
| General | Everyone | Planned |

Ship behind the \`sharedStore\` flag and remove the old cache once the beta is clean.
`

type Gap = { top: number; height: number; kind: "break" | "hug" | "gap" }

const isHeading = (element: Element) => /^H[1-4]$/.test(element.tagName)

function measureGaps(blocks: Element, frame: Element): Gap[] {
	const frameTop = frame.getBoundingClientRect().top
	const visible = [...blocks.children].filter(
		(child) => getComputedStyle(child).display !== "none",
	)
	return visible.slice(1).map((block, index) => {
		const previous = visible[index]!
		const bottom = previous.getBoundingClientRect().bottom
		const top = block.getBoundingClientRect().top
		const kind = isHeading(block) ? "break" : isHeading(previous) ? "hug" : "gap"
		return { top: bottom - frameTop, height: top - bottom, kind }
	})
}

/**
 * The long-form Markdown specimen at a chosen prose size and platform scale,
 * with every gap between blocks measured and labeled in the right gutter.
 */
export function ProseSpacingPlayground() {
	const [size, setSize] = useState<ProseSize>("md")
	const [scale, setScale] = useState<ResolvedScale>("medium")
	const [gaps, setGaps] = useState<Gap[]>([])
	const frameRef = useRef<HTMLDivElement>(null)
	const { resolvedScale } = useScale()

	// Set the attribute directly so the playground never saves a preference.
	useLayoutEffect(() => {
		const root = document.documentElement
		root.dataset.scale = scale
		return () => {
			root.dataset.scale = resolvedScale
		}
	}, [scale, resolvedScale])

	useLayoutEffect(() => {
		const frame = frameRef.current
		const blocks = frame?.querySelector("h1")?.parentElement
		if (!frame || !blocks) return
		const update = () => setGaps(measureGaps(blocks, frame))
		update()
		const observer = new ResizeObserver(update)
		observer.observe(blocks)
		document.fonts?.ready.then(update)
		return () => observer.disconnect()
	}, [size, scale])

	const rootClassName = useStyles(rootClass)
	const controlsClassName = useStyles(controlsClass)
	const frameClassName = useStyles(frameClass)
	const gapClassName = useStyles(gapClass)

	return (
		<div className={rootClassName}>
			<div className={controlsClassName}>
				<RadioOptionGroup
					label="Size"
					value={size}
					onChange={(value) => setSize(value as ProseSize)}
				>
					<RadioOption value="sm">Small</RadioOption>
					<RadioOption value="md">Default</RadioOption>
					<RadioOption value="lg">Large</RadioOption>
				</RadioOptionGroup>
				<RadioOptionGroup
					label="Scale"
					value={scale}
					onChange={(value) => setScale(value as ResolvedScale)}
				>
					<RadioOption value="medium">Desktop</RadioOption>
					<RadioOption value="large">Touch</RadioOption>
				</RadioOptionGroup>
			</div>
			<div ref={frameRef} className={frameClassName}>
				<AssistantMessage size={size}>{proseSpacingSample}</AssistantMessage>
				{gaps.map((gap, index) => (
					<div
						key={index}
						className={gapClassName}
						data-kind={gap.kind}
						style={{ top: gap.top, height: gap.height }}
					>
						<span>{Math.round(gap.height)}px</span>
					</div>
				))}
			</div>
		</div>
	)
}

const gutter = "72px"

const rootClass = style(flex({ direction: "column", gap: 8 }), {
	padding: "16px",
})

const controlsClass = style(flex({ alignItems: "start", gap: 16 }))

const frameClass = style({
	position: "relative",
	maxWidth: `calc(640px + ${gutter})`,
	paddingRight: gutter,
})

const gapClass = style(monoFontStyle, {
	position: "absolute",
	right: 0,
	width: gutter,
	display: "flex",
	alignItems: "center",
	gap: "6px",
	paddingLeft: "8px",
	fontSize: "11px",
	lineHeight: 1,
	color: colors.gray[11],
	borderLeft: `2px solid ${colors.gray[6]}`,
	backgroundColor: colors.grayAlpha[2],
	"&[data-kind='break']": {
		color: colors.accent[11],
		borderLeftColor: colors.accent[9],
		backgroundColor: colors.accentAlpha[3],
	},
	"&[data-kind='hug']": {
		color: colors.accent[11],
		borderLeftColor: colors.accent[7],
	},
})
