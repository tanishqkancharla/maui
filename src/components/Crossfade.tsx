import {
	useMemo,
	type CSSProperties,
	type Key,
	type ReactNode,
} from "react"
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Transition,
	type Variants,
} from "motion/react"
import { style, useStyles } from "purse-styles"
import { motionDurationMs } from "../tokens/motion"
import { spacing } from "../tokens/spacing"
import { cls } from "../utils/cls"

export type CrossfadeDirection = "up" | "down" | "left" | "right"

/** AnimatePresence sequencing. `sync` overlaps exit and enter. */
export type CrossfadeMode = "sync" | "wait" | "popLayout"

/** Travel distance used when `offset` is omitted — spacing step 6. */
export const crossfadeOffsetPx = Number.parseFloat(spacing.value(6))

/** Incoming view. Tuned in the gallery studio; exit still uses the 80ms token. */
export const crossfadeEnterTransition: Transition = {
	type: "spring",
	visualDuration: 0.3,
	bounce: 0.2,
}

/** Outgoing view. `motionDurationMs` + CSS ease-in-out (`motionEasing`). */
export const crossfadeExitTransition: Transition = {
	duration: motionDurationMs / 1000,
	ease: [0.42, 0, 0.58, 1],
}

export type CrossfadeProps = {
	children: ReactNode
	/** Axis the outgoing view travels along as it fades out. Incoming view enters from the opposite side. Defaults to `"left"`. */
	direction?: CrossfadeDirection
	/**
	 * Identity of the current view. When this changes, the previous children
	 * fade out, then the new children fade in. Do not put `key` on
	 * `Crossfade` itself, which remounts the wrapper and skips the exit.
	 */
	contentKey: Key
	className?: string
	style?: CSSProperties
	/** Motion transition for the incoming view. Defaults to `crossfadeEnterTransition`. */
	enterTransition?: Transition
	/**
	 * Motion transition for the outgoing view. Defaults to
	 * `crossfadeExitTransition` (`motionDurationMs` / `motionEasing`).
	 */
	exitTransition?: Transition
	/** AnimatePresence mode. Defaults to `"sync"`. */
	mode?: CrossfadeMode
	/** Travel distance in pixels. Defaults to `crossfadeOffsetPx`. */
	offset?: number
	/** Clip traveling views to the Crossfade box. Defaults to true. */
	clip?: boolean
	/**
	 * When set, overrides `prefers-reduced-motion`. Omit to follow the user
	 * preference (travel becomes a fade).
	 */
	reduceMotion?: boolean
	/** Run the enter animation on the first view. Defaults to false. */
	playInitial?: boolean
}

function shift(
	direction: CrossfadeDirection,
	sign: 1 | -1,
	offset: number,
): { x: number; y: number } {
	const distance = offset * sign
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

function travelVariants(
	offset: number,
	exitTransition: Transition,
): Variants {
	return {
		initial: (direction: CrossfadeDirection) => ({
			opacity: 0,
			...shift(direction, -1, offset),
		}),
		animate: {
			opacity: 1,
			x: 0,
			y: 0,
		},
		exit: (direction: CrossfadeDirection) => ({
			opacity: 0,
			...shift(direction, 1, offset),
			transition: exitTransition,
		}),
	}
}

function fadeVariants(exitTransition: Transition): Variants {
	return {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0, transition: exitTransition },
	}
}

/**
 * When `contentKey` changes, fade the previous view out in `direction`,
 * then fade the replacement in from the opposite side.
 */
export function Crossfade({
	children,
	direction = "left",
	contentKey,
	className,
	style: styleProp,
	enterTransition = crossfadeEnterTransition,
	exitTransition = crossfadeExitTransition,
	mode = "sync",
	offset = crossfadeOffsetPx,
	clip = true,
	reduceMotion: reduceMotionProp,
	playInitial = false,
}: CrossfadeProps) {
	const prefersReducedMotion = useReducedMotion()
	const reduceMotion = reduceMotionProp ?? prefersReducedMotion
	const rootClassName = useStyles(rootClass)
	const layerClassName = useStyles(layerClass)
	const variants = useMemo(
		() =>
			reduceMotion
				? fadeVariants(exitTransition)
				: travelVariants(offset, exitTransition),
		[exitTransition, offset, reduceMotion],
	)

	return (
		<div
			className={cls(rootClassName, className)}
			style={{
				...styleProp,
				overflow: clip ? "hidden" : "visible",
			}}
			data-direction={direction}
		>
			<AnimatePresence
				mode={mode}
				initial={playInitial}
				custom={direction}
			>
				<motion.div
					key={contentKey}
					className={layerClassName}
					custom={direction}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={enterTransition}
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
