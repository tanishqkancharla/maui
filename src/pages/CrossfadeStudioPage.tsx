import { useEffect, useState } from "react"
import {
	DialRoot,
	DialStore,
	useDialKitController,
	type EasingConfig,
	type TransitionConfig,
} from "dialkit"
import "dialkit/styles.css"
import type { Transition } from "motion/react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { CodeBlock } from "../components/CodeBlock"
import {
	Crossfade,
	crossfadeOffsetPx,
	type CrossfadeDirection,
	type CrossfadeMode,
} from "../components/Crossfade"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { useTheme } from "../theme/ThemeContext"
import { motionDurationMs, motionEasing } from "../tokens/motion"
import { spacing } from "../tokens/spacing"

const directions: CrossfadeDirection[] = ["up", "down", "left", "right"]
const modes: CrossfadeMode[] = ["wait", "sync", "popLayout"]
const motionModes = ["auto", "travel", "fade"] as const

const mauiEase = [0.42, 0, 0.58, 1] as [number, number, number, number]
const mauiDuration = motionDurationMs / 1000

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

const mauiEasing: EasingConfig = {
	type: "easing",
	duration: mauiDuration,
	ease: mauiEase,
}

function isDirection(value: string): value is CrossfadeDirection {
	return (directions as readonly string[]).includes(value)
}

function isMode(value: string): value is CrossfadeMode {
	return (modes as readonly string[]).includes(value)
}

function isMotionMode(
	value: string,
): value is (typeof motionModes)[number] {
	return (motionModes as readonly string[]).includes(value)
}

/** Map Dialkit's easing/spring editor onto Motion's `transition` prop. */
function toMotionTransition(config: TransitionConfig): Transition {
	if (config.type === "easing") {
		return {
			duration: config.duration,
			ease: config.ease,
		}
	}
	return config
}

function reduceMotionOverride(
	motionMode: string,
): boolean | undefined {
	if (motionMode === "travel") return false
	if (motionMode === "fade") return true
	return undefined
}

function formatTransition(config: TransitionConfig): string {
	return JSON.stringify(toMotionTransition(config), null, 2)
}

export function CrossfadeStudioPage() {
	const pageClassName = useStyles(pageClass)
	const introClassName = useStyles(introClass)

	return (
		<div className={pageClassName}>
			<Prose className={introClassName}>
				<H2>Crossfade studio</H2>
				<P>
					Dialkit controls bind to the real Crossfade component. Defaults
					match Maui motion tokens (
					<code>
						{motionDurationMs}ms {motionEasing}
					</code>
					, offset {crossfadeOffsetPx}px from spacing 6). LoadingScreen
					progress labels use these same Crossfade defaults, so timing you
					like here is what those labels will feel like.
				</P>
			</Prose>
			<CrossfadeStudio />
		</div>
	)
}

function CrossfadeStudio() {
	const { resolvedTheme } = useTheme()
	const studioClassName = useStyles(studioClass)
	const previewColumnClassName = useStyles(previewColumnClass)
	const dialColumnClassName = useStyles(dialColumnClass)
	const [index, setIndex] = useState(0)
	const [labelIndex, setLabelIndex] = useState(0)

	const advanceView = () =>
		setIndex((current) => (current + 1) % slides.length)
	const advanceLabel = () =>
		setLabelIndex((current) => (current + 1) % progressLabels.length)

	const dial = useDialKitController(
		"Crossfade",
		{
			direction: {
				type: "select",
				options: [
					{ value: "up", label: "Up" },
					{ value: "down", label: "Down" },
					{ value: "left", label: "Left" },
					{ value: "right", label: "Right" },
				],
				default: "up",
			},
			mode: {
				type: "select",
				options: [
					{ value: "wait", label: "Wait (exit, then enter)" },
					{ value: "sync", label: "Sync (overlap)" },
					{ value: "popLayout", label: "Pop layout" },
				],
				default: "wait",
			},
			offset: [crossfadeOffsetPx, 0, 64, 1],
			clip: true,
			travel: {
				type: "select",
				options: [
					{ value: "auto", label: "System" },
					{ value: "travel", label: "Travel" },
					{ value: "fade", label: "Fade only" },
				],
				default: "auto",
			},
			enter: mauiEasing,
			exit: mauiEasing,
			playback: {
				autoplay: false,
				interval: [1.2, 0.4, 4, 0.1],
				playInitial: false,
				next: { type: "action", label: "Next view" },
				nextLabel: { type: "action", label: "Next progress label" },
				reset: { type: "action", label: "Reset to Maui tokens" },
			},
		},
		{
			id: "crossfade-studio",
			onAction: (path) => {
				if (path === "playback.next") advanceView()
				if (path === "playback.nextLabel") advanceLabel()
				if (path === "playback.reset") {
					DialStore.resetValues("crossfade-studio")
				}
			},
		},
	)

	const values = dial.values
	const direction = isDirection(values.direction) ? values.direction : "up"
	const mode = isMode(values.mode) ? values.mode : "wait"
	const motionMode = isMotionMode(values.travel) ? values.travel : "auto"
	const enterTransition = toMotionTransition(values.enter)
	const exitTransition = toMotionTransition(values.exit)
	const slide = slides[index] ?? slides[0]
	const progressLabel = progressLabels[labelIndex] ?? progressLabels[0]

	useEffect(() => {
		if (!values.playback.autoplay) return
		const timeoutMs = values.playback.interval * 1000
		const timeoutId = window.setInterval(() => {
			advanceView()
			advanceLabel()
		}, timeoutMs)
		return () => window.clearInterval(timeoutId)
	}, [values.playback.autoplay, values.playback.interval])

	return (
		<div className={studioClassName}>
			<div className={previewColumnClassName}>
				<H3>Preview</H3>
				<Panel>
					<Flex column gap={6}>
						<Flex row gap={4} alignItems="center">
							<Button onClick={advanceView}>Next view</Button>
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
							<Crossfade
								direction={direction}
								contentKey={slide.id}
								mode={mode}
								offset={values.offset}
								clip={values.clip}
								playInitial={values.playback.playInitial}
								reduceMotion={reduceMotionOverride(motionMode)}
								enterTransition={enterTransition}
								exitTransition={exitTransition}
							>
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
						<Button onClick={advanceLabel}>Next label</Button>
						<Flex
							column
							style={{
								minHeight: "40px",
								textAlign: "center",
								maxWidth: "36ch",
							}}
						>
							<Crossfade
								direction={direction}
								contentKey={progressLabel}
								mode={mode}
								offset={values.offset}
								clip={values.clip}
								playInitial={values.playback.playInitial}
								reduceMotion={reduceMotionOverride(motionMode)}
								enterTransition={enterTransition}
								exitTransition={exitTransition}
							>
								<Text size="sm" color="lowContrast">
									{progressLabel}...
								</Text>
							</Crossfade>
						</Flex>
					</Flex>
				</Panel>

				<H3>Copy into Crossfade</H3>
				<CodeBlock lang="tsx">{`<Crossfade
	direction="${direction}"
	contentKey={slide.id}
	mode="${mode}"
	offset={${values.offset}}
	clip={${values.clip}}
	enterTransition={${formatTransition(values.enter)}}
	exitTransition={${formatTransition(values.exit)}}
>
	{slide.title}
</Crossfade>`}</CodeBlock>
			</div>

			<aside className={dialColumnClassName} aria-label="Dialkit studio">
				<DialRoot
					mode="inline"
					productionEnabled
					theme={resolvedTheme}
					defaultOpen
				/>
			</aside>
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

const studioClass = style({
	display: "grid",
	gridTemplateColumns: "minmax(0, 1fr) 280px",
	gap: spacing.value(8),
	alignItems: "start",
	minWidth: 0,
})

const previewColumnClass = style({
	display: "flex",
	flexDirection: "column",
	gap: spacing.value(8),
	minWidth: 0,
})

const dialColumnClass = style({
	width: "280px",
	height: "min(720px, calc(100vh - 96px))",
	minHeight: "480px",
	overflow: "hidden",
	position: "sticky",
	top: spacing.value(4),
})
