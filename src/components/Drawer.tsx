import {
	useCallback,
	useRef,
	useState,
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
} from "react"
import {
	Dialog as AriaDialog,
	Heading,
	Modal,
	ModalOverlay,
} from "react-aria-components"
import { useLocale } from "react-aria"
import { style, useStyles } from "purse-styles"
import {
	AnimatePresence,
	animate,
	cubicBezier,
	motion,
	useDragControls,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useTransform,
	type PanInfo,
} from "motion/react"
import { background } from "../tokens/background"
import { colors } from "../tokens/colors"
import { radius } from "../tokens/radius"
import { shadow } from "../tokens/shadow"
import { visuallyHidden } from "../tokens/visuallyHidden"
import { motionDurationMs } from "../tokens/motion"
import { cls } from "../utils/cls"

export type DrawerSide = "start" | "end"

export type DrawerProps = {
	children: ReactNode
	isOpen?: boolean
	defaultOpen?: boolean
	onOpenChange?: (isOpen: boolean) => void
	/** Logical edge. `useLocale` maps start/end to a physical side. */
	side?: DrawerSide
	/** Tap scrim, swipe toward the edge, and RAC outside-dismiss. Default true. */
	isDismissable?: boolean
	"aria-label"?: string
	"aria-labelledby"?: string
	className?: string
}

const PANEL_WIDTH_PX = 240
const PANEL_MAX_VW = 85
const SCRIM_ALPHA = 0.32
const DISMISS_OFFSET_RATIO = 0.35
const DISMISS_VELOCITY = 500
const AXIS_INTENT_PX = 10

const MotionModal = motion.create(Modal)
const MotionModalOverlay = motion.create(ModalOverlay)

const panelEnterExit = {
	duration: 0.4,
	ease: cubicBezier(0.32, 0.72, 0, 1),
}

const reducedMotionTransition = {
	duration: motionDurationMs / 1000,
	ease: [0.42, 0, 0.58, 1] as const,
}

const snapBackTransition = {
	type: "inertia" as const,
	bounceStiffness: 300,
	bounceDamping: 40,
	timeConstant: 300,
}

function measurePanelWidth() {
	if (typeof window === "undefined") {
		return PANEL_WIDTH_PX
	}
	return Math.min(PANEL_WIDTH_PX, (window.innerWidth * PANEL_MAX_VW) / 100)
}

export function Drawer({
	children,
	isOpen: isOpenProp,
	defaultOpen = false,
	onOpenChange,
	side = "start",
	isDismissable = true,
	"aria-label": ariaLabel,
	"aria-labelledby": ariaLabelledby,
	className,
}: DrawerProps) {
	const isControlled = isOpenProp !== undefined
	const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
	const isOpen = isControlled ? isOpenProp : uncontrolledOpen

	const setOpen = useCallback(
		(next: boolean) => {
			if (!isControlled) {
				setUncontrolledOpen(next)
			}
			onOpenChange?.(next)
		},
		[isControlled, onOpenChange],
	)

	return (
		<AnimatePresence>
			{isOpen ? (
				<DrawerLayer
					side={side}
					isDismissable={isDismissable}
					ariaLabel={ariaLabel}
					ariaLabelledby={ariaLabelledby}
					className={className}
					onOpenChange={setOpen}
				>
					{children}
				</DrawerLayer>
			) : null}
		</AnimatePresence>
	)
}

function DrawerLayer({
	children,
	side,
	isDismissable,
	ariaLabel,
	ariaLabelledby,
	className,
	onOpenChange,
}: {
	children: ReactNode
	side: DrawerSide
	isDismissable: boolean
	ariaLabel?: string
	ariaLabelledby?: string
	className?: string
	onOpenChange: (isOpen: boolean) => void
}) {
	const { direction } = useLocale()
	const reduceMotion = Boolean(useReducedMotion())
	const overlayClassName = useStyles(
		overlayClass,
		...(reduceMotion ? [overlayReducedScrimClass] : []),
	)
	const panelClassName = useStyles(panelClass)
	const dialogClassName = useStyles(dialogClass)
	const titleClassName = useStyles(visuallyHidden)
	const dragControls = useDragControls()
	const axisLock = useRef<"pending" | "x" | "y" | null>(null)
	const pointerOrigin = useRef({ x: 0, y: 0 })

	const panelWidth = measurePanelWidth()
	const closesToNegativeX =
		(side === "start" && direction !== "rtl") ||
		(side === "end" && direction === "rtl")
	const closedX = closesToNegativeX ? -panelWidth : panelWidth
	const x = useMotionValue(reduceMotion ? 0 : closedX)
	const progress = useTransform(x, [closedX, 0], [0, 1])
	const scrimBackground = useMotionTemplate`oklch(from ${colors.gray[12]} l c h / calc(${SCRIM_ALPHA} * ${progress}))`
	const canDrag = isDismissable && !reduceMotion
	const dismissOffset = panelWidth * DISMISS_OFFSET_RATIO

	const releaseAxisLock = useCallback(() => {
		axisLock.current = null
	}, [])

	const onPointerDown = useCallback(
		(event: ReactPointerEvent) => {
			if (!canDrag || event.button !== 0) {
				return
			}
			axisLock.current = "pending"
			pointerOrigin.current = { x: event.clientX, y: event.clientY }
		},
		[canDrag],
	)

	const onPointerMove = useCallback(
		(event: ReactPointerEvent) => {
			if (!canDrag || axisLock.current !== "pending") {
				return
			}
			const dx = event.clientX - pointerOrigin.current.x
			const dy = event.clientY - pointerOrigin.current.y
			if (Math.abs(dx) < AXIS_INTENT_PX && Math.abs(dy) < AXIS_INTENT_PX) {
				return
			}
			if (Math.abs(dx) > Math.abs(dy)) {
				axisLock.current = "x"
				dragControls.start(event)
			} else {
				axisLock.current = "y"
			}
		},
		[canDrag, dragControls],
	)

	const onDragEnd = useCallback(
		(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			releaseAxisLock()
			if (!isDismissable) {
				animate(x, 0, { ...snapBackTransition, min: 0, max: 0 })
				return
			}
			const shouldClose = closesToNegativeX
				? info.offset.x < -dismissOffset || info.velocity.x < -DISMISS_VELOCITY
				: info.offset.x > dismissOffset || info.velocity.x > DISMISS_VELOCITY
			if (shouldClose) {
				onOpenChange(false)
			} else {
				animate(x, 0, { ...snapBackTransition, min: 0, max: 0 })
			}
		},
		[
			closesToNegativeX,
			dismissOffset,
			isDismissable,
			onOpenChange,
			releaseAxisLock,
			x,
		],
	)

	return (
		<MotionModalOverlay
			isOpen
			onOpenChange={onOpenChange}
			isDismissable={isDismissable}
			className={overlayClassName}
			initial={reduceMotion ? { opacity: 0 } : false}
			animate={reduceMotion ? { opacity: 1 } : undefined}
			exit={reduceMotion ? { opacity: 0 } : undefined}
			transition={reduceMotion ? reducedMotionTransition : undefined}
			style={reduceMotion ? undefined : { backgroundColor: scrimBackground }}
		>
			<MotionModal
				className={cls(panelClassName, className)}
				data-side={side}
				initial={reduceMotion ? { opacity: 0 } : { x: closedX }}
				animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
				exit={reduceMotion ? { opacity: 0 } : { x: closedX }}
				transition={reduceMotion ? reducedMotionTransition : panelEnterExit}
				style={reduceMotion ? undefined : { x }}
				drag={canDrag ? "x" : false}
				dragControls={dragControls}
				dragListener={false}
				dragMomentum={false}
				dragConstraints={
					closesToNegativeX
						? { left: -panelWidth, right: 0 }
						: { left: 0, right: panelWidth }
				}
				dragElastic={
					closesToNegativeX
						? { left: 0.2, right: 0 }
						: { left: 0, right: 0.2 }
				}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={releaseAxisLock}
				onPointerCancel={releaseAxisLock}
				onDragEnd={onDragEnd}
			>
				<AriaDialog
					className={dialogClassName}
					aria-label={ariaLabel}
					aria-labelledby={ariaLabelledby}
				>
					{ariaLabel && !ariaLabelledby ? (
						<Heading slot="title" className={titleClassName}>
							{ariaLabel}
						</Heading>
					) : null}
					{children}
				</AriaDialog>
			</MotionModal>
		</MotionModalOverlay>
	)
}

const overlayClass = style({
	position: "fixed",
	inset: 0,
	zIndex: 1100,
	overflow: "hidden",
})

const overlayReducedScrimClass = style({
	backgroundColor: `oklch(from ${colors.gray[12]} l c h / ${SCRIM_ALPHA})`,
})

const panelClass = style(
	background.element,
	shadow.subtle,
	radius.lg,
	{
		position: "absolute",
		top: 0,
		bottom: 0,
		width: `min(${PANEL_WIDTH_PX}px, ${PANEL_MAX_VW}vw)`,
		maxWidth: `${PANEL_MAX_VW}vw`,
		height: "100%",
		margin: 0,
		outline: "none",
		willChange: "transform",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		"&[data-side='start']": {
			insetInlineStart: 0,
			borderStartStartRadius: 0,
			borderEndStartRadius: 0,
		},
		"&[data-side='end']": {
			insetInlineEnd: 0,
			borderStartEndRadius: 0,
			borderEndEndRadius: 0,
		},
		"& [role='dialog'] > nav": {
			width: "100%",
			minWidth: 0,
			height: "100%",
			boxShadow: "none",
			borderRadius: 0,
			backgroundColor: "transparent",
		},
	},
)

const dialogClass = style({
	height: "100%",
	minHeight: 0,
	overflowY: "auto",
	overscrollBehavior: "contain",
	touchAction: "pan-y",
	outline: "none",
	display: "flex",
	flexDirection: "column",
})
