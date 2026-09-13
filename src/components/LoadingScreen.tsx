import { useEffect, useState } from "react"
import {
	AnimatePresence,
	motion,
	useReducedMotion,
} from "motion/react"
import { style, useStyles } from "purse-styles"
import { motionDurationMs } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { cls } from "../utils/cls"
import { Crossfade } from "./Crossfade"
import { Text } from "./Text"
import { Thinking } from "./Thinking"

const INDICATOR_DELAY_MS = 2000

export type LoadingScreenProps = {
	progressLabel?: string
	className?: string
}

function resolvedLabel(progressLabel: string | undefined) {
	const trimmed = progressLabel?.trim()
	return trimmed ? trimmed : undefined
}

function progressText(label: string) {
	return label.endsWith("...") || label.endsWith("…") ? label : `${label}...`
}

/**
 * Full-size loading state. A `progressLabel` on the first render fades the
 * Thinking indicator and label in together. Without a label, the indicator
 * waits 2s before fading in; a label that arrives later animates in and
 * shifts the indicator so the pair stays centered.
 */
export function LoadingScreen({
	progressLabel,
	className,
}: LoadingScreenProps) {
	const label = resolvedLabel(progressLabel)
	const [hadLabelAtStart] = useState(() => label !== undefined)
	const [showIndicator, setShowIndicator] = useState(hadLabelAtStart)
	const [showLabel, setShowLabel] = useState(hadLabelAtStart)
	const reduceMotion = useReducedMotion()
	const rootClassName = useStyles(rootClass)
	const stackClassName = useStyles(stackClass)
	const labelSlotClassName = useStyles(labelSlotClass)
	const labelClassName = useStyles(labelClass)
	const duration = motionDurationMs / 1000
	const transition = {
		duration,
		ease: "easeInOut" as const,
	}

	useEffect(() => {
		if (hadLabelAtStart) {
			setShowLabel(label !== undefined)
			return
		}

		if (label !== undefined) {
			setShowIndicator(true)
			setShowLabel(true)
			return
		}

		if (showIndicator) return

		const timeoutId = window.setTimeout(() => {
			setShowIndicator(true)
		}, INDICATOR_DELAY_MS)

		return () => window.clearTimeout(timeoutId)
	}, [hadLabelAtStart, label, showIndicator])

	return (
		<div
			className={cls(rootClassName, className)}
			role="status"
			aria-live="polite"
			aria-busy="true"
		>
			<AnimatePresence>
				{showIndicator ? (
					<motion.div
						className={stackClassName}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={transition}
					>
						<Thinking
							variant="accent"
							size="0.8em"
							aria-label={label ?? "Loading"}
						/>
						<AnimatePresence initial={false}>
							{showLabel && label ? (
								<motion.div
									className={labelSlotClassName}
									initial={
										reduceMotion
											? { opacity: 0 }
											: { opacity: 0, height: 0 }
									}
									animate={
										reduceMotion
											? { opacity: 1 }
											: { opacity: 1, height: "auto" }
									}
									exit={
										reduceMotion
											? { opacity: 0 }
											: { opacity: 0, height: 0 }
									}
									transition={transition}
								>
									<div className={labelClassName}>
										<Crossfade
											direction="up"
											contentKey={label}
										>
											<Text size="sm" fontWeight={500} color="accent">
												{progressText(label)}
											</Text>
										</Crossfade>
									</div>
								</motion.div>
							) : null}
						</AnimatePresence>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

const rootClass = style(radius.lg, {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flex: 1,
	width: "100%",
	height: "100%",
	minWidth: 0,
	minHeight: 0,
	overflow: "hidden",
})

const stackClass = style(
	text({ size: "md", fontWeight: 400, color: "highContrast" }),
	{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		minWidth: 0,
	},
)

const labelSlotClass = style({
	overflow: "hidden",
	width: "100%",
})

const labelClass = style({
	paddingTop: spacing.value(8),
	textAlign: "center",
	maxWidth: "36ch",
})
