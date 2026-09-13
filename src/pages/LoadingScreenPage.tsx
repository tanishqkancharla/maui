import { useEffect, useState, type ReactNode } from "react"
import { style, useStyles } from "purse-styles"
import { Button } from "../components/Button"
import { CodeBlock } from "../components/CodeBlock"
import { LoadingScreen } from "../components/LoadingScreen"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import { border } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"

const EARLY_LABEL_MS = 800
const LATE_LABEL_MS = 2500

const statusLabels = [
	"Reading the workspace",
	"Indexing files",
	"Preparing a reply",
] as const

function DemoFrame(props: { children: ReactNode; label: string }) {
	const frameClassName = useStyles(demoFrameClass)

	return (
		<div className={frameClassName} aria-label={props.label}>
			{props.children}
		</div>
	)
}

function Elapsed(props: {
	running: boolean
	resetKey: number
	capMs?: number
}) {
	const [ms, setMs] = useState(0)

	useEffect(() => {
		if (!props.running) {
			return
		}

		setMs(0)
		const started = Date.now()
		const id = window.setInterval(() => {
			const elapsed = Date.now() - started
			const next =
				props.capMs === undefined ? elapsed : Math.min(elapsed, props.capMs)
			setMs(next)
			if (props.capMs !== undefined && elapsed >= props.capMs) {
				window.clearInterval(id)
			}
		}, 100)
		return () => window.clearInterval(id)
	}, [props.running, props.resetKey, props.capMs])

	const seconds = (ms / 1000).toFixed(1)

	return (
		<Text size="xs" color="lowContrast" monospace>
			{seconds}s
		</Text>
	)
}

export function LoadingScreenPage() {
	const [initialKey, setInitialKey] = useState(0)
	const [initialIndex, setInitialIndex] = useState(0)
	const [delayedKey, setDelayedKey] = useState(0)
	const [earlyKey, setEarlyKey] = useState(0)
	const [earlyLabel, setEarlyLabel] = useState<string | undefined>(undefined)
	const [lateKey, setLateKey] = useState(0)
	const [lateLabel, setLateLabel] = useState<string | undefined>(undefined)

	const initialLabel = statusLabels[initialIndex] ?? statusLabels[0]

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setEarlyLabel("Connecting")
		}, EARLY_LABEL_MS)
		return () => window.clearTimeout(timeoutId)
	}, [earlyKey])

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setLateLabel("Still working")
		}, LATE_LABEL_MS)
		return () => window.clearTimeout(timeoutId)
	}, [lateKey])

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Loading screen</H2>
			<P>
				Fills whatever width and height it is given, with{" "}
				<code>radius.lg</code> on the surface. Pass{" "}
				<code>progressLabel</code> to show a status under a small, accent
				Thinking indicator, with trailing <code>...</code>. Label changes
				Crossfade up. With no label at mount, the indicator waits 2s before
				fading in.
			</P>

			<H3>Label from the start</H3>
			<P>
				Indicator and label fade in together, centered. Use Next label to
				Crossfade the copy upward.
			</P>
			<Flex column gap={4}>
				<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
					<Button
						onClick={() => {
							setInitialKey((value) => value + 1)
							setInitialIndex(0)
						}}
					>
						Replay fade-in
					</Button>
					<Button
						onClick={() =>
							setInitialIndex((value) => (value + 1) % statusLabels.length)
						}
					>
						Next label
					</Button>
				</Flex>
				<DemoFrame label="Loading screen with a progress label from the start">
					<LoadingScreen
						key={initialKey}
						progressLabel={initialLabel}
					/>
				</DemoFrame>
			</Flex>

			<H3>No label — wait 2 seconds</H3>
			<P>
				Mounts empty. After 2 seconds the Thinking indicator fades in,
				centered, with no label.
			</P>
			<Flex column gap={4}>
				<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
					<Button onClick={() => setDelayedKey((value) => value + 1)}>
						Replay wait
					</Button>
					<Elapsed running resetKey={delayedKey} capMs={2000} />
				</Flex>
				<DemoFrame label="Loading screen with no progress label">
					<LoadingScreen key={delayedKey} />
				</DemoFrame>
			</Flex>

			<H3>Label before 2 seconds</H3>
			<P>
				Starts empty. Setting a label before the delay fades the indicator
				and label in together immediately.
			</P>
			<Flex column gap={4}>
				<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
					<Button
						onClick={() => {
							setEarlyKey((value) => value + 1)
							setEarlyLabel(undefined)
						}}
					>
						Reset
					</Button>
					<Button
						onClick={() => setEarlyLabel("Connecting")}
						disabled={earlyLabel !== undefined}
					>
						Set label now
					</Button>
					<Elapsed running={earlyLabel === undefined} resetKey={earlyKey} />
				</Flex>
				<DemoFrame label="Loading screen that receives a label before two seconds">
					<LoadingScreen
						key={earlyKey}
						progressLabel={earlyLabel}
					/>
				</DemoFrame>
			</Flex>

			<H3>Label after 2 seconds</H3>
			<P>
				Starts empty. After the indicator is showing, a label animates in
				and the indicator moves up so the pair stays centered.
			</P>
			<Flex column gap={4}>
				<Flex row alignItems="center" gap={4} style={{ flexWrap: "wrap" }}>
					<Button
						onClick={() => {
							setLateKey((value) => value + 1)
							setLateLabel(undefined)
						}}
					>
						Reset
					</Button>
					<Button
						onClick={() => setLateLabel("Still working")}
						disabled={lateLabel !== undefined}
					>
						Set label after wait
					</Button>
					<Elapsed running={lateLabel === undefined} resetKey={lateKey} />
				</Flex>
				<DemoFrame label="Loading screen that receives a label after two seconds">
					<LoadingScreen key={lateKey} progressLabel={lateLabel} />
				</DemoFrame>
			</Flex>

			<H3>Usage</H3>
			<CodeBlock lang="tsx">{`<LoadingScreen progressLabel="Reading the workspace" />

<LoadingScreen />`}</CodeBlock>
		</Prose>
	)
}

const demoFrameClass = style(
	border([], "outline"),
	radius.lg,
	{
		backgroundColor: colors.gray[1],
		backgroundImage: `radial-gradient(${colors.grayAlpha[3]} 1px, transparent 1px)`,
		backgroundSize: "12px 12px",
		boxSizing: "border-box",
		height: "220px",
		overflow: "hidden",
		display: "flex",
		flexDirection: "column",
	},
)
