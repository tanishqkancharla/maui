import {
	isValidElement,
	type CSSProperties,
	type Key,
	type ReactNode,
} from "react"
import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Variants,
} from "motion/react"
import { style, useStyles } from "purse-styles"
import { spacing } from "../tokens/spacing"
import { cls } from "../utils/cls"

export type CrossfadeDirection = "up" | "down" | "left" | "right"

export type CrossfadeProps = {
	children: ReactNode
	/** Axis the outgoing view travels along as it fades out. Incoming view enters from the opposite side. */
	direction: CrossfadeDirection
	/**
	 * Identity of the current view. When this changes, the previous children
	 * fade out, then the new children fade in. Prefer this over putting `key`
	 * on `Crossfade` itself, which remounts the wrapper and skips the exit.
	 */
	contentKey?: Key
	className?: string
	style?: CSSProperties
}

const OFFSET_PX = Number.parseFloat(spacing.value(6))
const DURATION_S = 0.2

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

function resolveContentKey(contentKey: Key | undefined, children: ReactNode): Key {
	if (contentKey !== undefined) {
		return contentKey
	}
	if (isValidElement(children) && children.key != null) {
		return children.key
	}
	if (typeof children === "string" || typeof children === "number") {
		return children
	}
	return "crossfade"
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
 * When the identified content changes, fade the previous view out in
 * `direction`, then fade the replacement in from the opposite side.
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
	const key = resolveContentKey(contentKey, children)
	const variants = reduceMotion ? fadeVariants : travelVariants

	return (
		<div
			className={cls(rootClassName, className)}
			style={styleProp}
			data-direction={direction}
		>
			<AnimatePresence mode="wait" initial={false} custom={direction}>
				<motion.div
					key={key}
					className={layerClassName}
					custom={direction}
					variants={variants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: DURATION_S, ease: "easeInOut" }}
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
