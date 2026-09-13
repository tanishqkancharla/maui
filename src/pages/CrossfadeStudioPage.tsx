import { useState } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { Crossfade } from "../components/Crossfade"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, Link, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { spacing } from "../tokens/spacing"

/*
  Dialkit studio (dormant). Uncomment the imports and CrossfadeStudioDials,
  then restore the nav item in Maui.tsx, to tune Crossfade live again.

  npm install dialkit  (already in devDependencies)

  import {
    DialRoot,
    DialStore,
    useDialKitController,
    type EasingConfig,
    type SpringConfig,
    type TransitionConfig,
  } from "dialkit"
  import "dialkit/styles.css"
  import type { Transition } from "motion/react"
  import { useTheme } from "../theme/ThemeContext"
  import { motionDurationMs } from "../tokens/motion"
  import { type CrossfadeDirection } from "../components/Crossfade"

  Motion is internal to Crossfade now:
  enter spring visualDuration 0.3 / bounce 0.2, exit 80ms ease-in-out,
  mode sync, offset spacing 6, clip.
*/

const slides = [
	{
		id: "inbox",
		title: "Inbox",
		body: "Unread mail waits in a single stream, newest first.",
	},
	{
		id: "calendar",
		title: "Calendar",
		body: "The week view keeps today pinned to the first column.",
	},
	{
		id: "notes",
		title: "Notes",
		body: "A quiet page for drafting, without extra chrome.",
	},
	{
		id: "search",
		title: "Search",
		body: "Jump to a person, file, or a recent thread.",
	},
] as const

const progressLabels = [
	"Connecting",
	"Fetching mail",
	"Decrypting",
	"Indexing",
] as const

export function CrossfadeStudioPage() {
	const pageClassName = useStyles(pageClass)
	const introClassName = useStyles(introClass)

	return (
		<div className={pageClassName}>
			<Prose className={introClassName}>
				<H2>Crossfade studio</H2>
				<P>
					Dialkit is commented out. The timing that landed here is now
					the Crossfade component default — play with it on{" "}
					<Link href="/components/crossfade">the Crossfade page</Link>.
				</P>
			</Prose>
			<CrossfadeStudioPreview />
		</div>
	)
}

function CrossfadeStudioPreview() {
	const previewColumnClassName = useStyles(previewColumnClass)
	const [index, setIndex] = useState(0)
	const [labelIndex, setLabelIndex] = useState(0)
	const slide = slides[index] ?? slides[0]
	const progressLabel = progressLabels[labelIndex] ?? progressLabels[0]

	return (
		<div className={previewColumnClassName}>
			<H3>Preview</H3>
			<Panel>
				<Flex column gap={6}>
					<Flex row gap={4} alignItems="center">
						<Button
							onClick={() =>
								setIndex((current) => (current + 1) % slides.length)
							}
						>
							Next view
						</Button>
						<Text size="sm" color="lowContrast">
							{slide.title}
						</Text>
					</Flex>
					<Flex
						column
						p={6}
						shadow="subtle"
						radius="sm"
						style={{ minHeight: "108px" }}
					>
						<Crossfade direction="left" contentKey={slide.id}>
							<Flex column gap={3}>
								<Text size="lg" fontWeight={600}>
									{slide.title}
								</Text>
								<Text color="lowContrast">{slide.body}</Text>
							</Flex>
						</Crossfade>
					</Flex>
				</Flex>
			</Panel>

			<H3>Progress labels</H3>
			<P>
				LoadingScreen uses Crossfade this way for status text. Empty
				until you start a load — here the first label is already on
				screen so you can feel the swap.
			</P>
			<Panel>
				<Flex column gap={6} alignItems="center">
					<Button
						onClick={() =>
							setLabelIndex(
								(current) => (current + 1) % progressLabels.length,
							)
						}
					>
						Next label
					</Button>
					<Flex
						column
						style={{
							minHeight: "40px",
							textAlign: "center",
							maxWidth: "36ch",
						}}
					>
						<Crossfade direction="left" contentKey={progressLabel}>
							<Text size="sm" color="lowContrast">
								{progressLabel}...
							</Text>
						</Crossfade>
					</Flex>
				</Flex>
			</Panel>
		</div>
	)
}

const pageClass = style(spacing.padding({ bottom: 16 }), {
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(8),
	width: "100%",
	maxWidth: "100%",
	minWidth: 0,
})

const introClass = style({
	maxWidth: "72ch",
})

const previewColumnClass = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(8),
	minWidth: 0,
})
