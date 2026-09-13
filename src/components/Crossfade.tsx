import { type CSSProperties, type Key, type ReactNode } from "react"
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Variants,
} from "motion/react"
import { style, useStyles } from "purse-styles"
import { motionDurationMs } from "../tokens/motion"
import { spacing } from "../tokens/spacing"
import { cls } from "../utils/cls"

export type CrossfadeDirection = "up" | "down" | "left" | "right"

export type CrossfadeProps = {
	children: ReactNode
	/** Axis the outgoing view travels along as it fades out. Incoming view enters from the opposite side. */
	direction: CrossfadeDirection
	/**
	 * Identity of the current view. When this changes, the previous children
	 * fade out, then the new children fade in. Do not put `key` on
	 * `Crossfade` itself, which remounts the wrapper and skips the exit.
	 */
	contentKey: Key
	className?: string
	style?: CSSProperties
}

const OFFSET_PX = Number.parseFloat(spacing.value(6))

function shift(
	direction: CrossfadeDirection,
	sign: 1 | -1,
): { x: number; y: number } {
	const distance = OFFSET_PX * sign
	switch (direction) {
		case "up":
			return { x: 0, y: -distance }
		case "down":
			return { x: 0, y: distance }
		case "left":
			return { x: -distance, y: 0 }
		case "right":
			return { x: distance, y: 0 }
	}
}

const travelVariants: Variants = {
	initial: (direction: CrossfadeDirection) => ({
		opacity: 0,
		...shift(direction, -1),
	}),
	animate: {
		opacity: 1,
		x: 0,
		y: 0,
	},
	exit: (direction: CrossfadeDirection) => ({
		opacity: 0,
		...shift(direction, 1),
	}),
}

const fadeVariants: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
}

/**
 * When `contentKey` changes, fade the previous view out in `direction`,
 * then fade the replacement in from the opposite side.
 */
export function Crossfade({
	children,
	direction,
	contentKey,
	className,
	style: styleProp,
}: CrossfadeProps) {
	const reduceMotion = useReducedMotion()
	const rootClassName = useStyles(rootClass)
	const layerClassName = useStyles(layerClass)
	const variants = reduceMotion ? fadeVariants : travelVariants

	return (
		<div
			className={cls(rootClassName, className)}
			style={styleProp}
			data-direction={direction}
		>
			<AnimatePresence mode="wait" initial={false} custom={direction}>
				<motion.div
					key={contentKey}
					className={layerClassName}
					custom={direction}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{
						duration: motionDurationMs / 1000,
						ease: "easeInOut",
					}}
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}

const rootClass = style({
	position: "relative",
	display: "grid",
	overflow: "hidden",
})

const layerClass = style({
	gridArea: "1 / 1",
	minWidth: 0,
})
