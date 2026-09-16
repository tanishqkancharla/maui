import {
	useCallback,
	useEffect,
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
	animate,
	motion,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react"
import { background } from "../tokens/background"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
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

const MotionModalOverlay = motion.create(ModalOverlay)

const panelEnterExit = {
	type: "tween" as const,
	duration: 0.4,
	ease: [0.32, 0, 0.2, 1] as const,
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

	if (!isOpen) {
		return null
	}

	return (
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
	const shellClassName = useStyles(shellClass)
	const panelClassName = useStyles(panelClass)
	const dialogClassName = useStyles(dialogClass)
	const titleClassName = useStyles(visuallyHidden)
	const closing = useRef(false)
	const panelRef = useRef<HTMLDivElement | null>(null)
	const suppressClick = useRef(false)
	const axisLock = useRef<"pending" | "x" | "y" | null>(null)
	const pointerOrigin = useRef({ x: 0, y: 0, startX: 0 })
	const lastMove = useRef({ x: 0, t: 0, v: 0 })
	const enterAnimation = useRef<ReturnType<typeof animate> | null>(null)

	const panelWidth = measurePanelWidth()
	const closesToNegativeX =
		(side === "start" && direction !== "rtl") ||
		(side === "end" && direction === "rtl")
	const closedX = closesToNegativeX ? -panelWidth : panelWidth
	const x = useMotionValue(reduceMotion ? 0 : closedX)
	const overlayOpacity = useMotionValue(reduceMotion ? 0 : 1)
	const progress = useTransform(x, [closedX, 0], [0, 1])
	const scrimBackground = useMotionTemplate`oklch(from ${colors.gray[12]} l c h / calc(${SCRIM_ALPHA} * ${progress}))`
	const canDrag = isDismissable && !reduceMotion
	const dismissOffset = panelWidth * DISMISS_OFFSET_RATIO

	useEffect(() => {
		if (reduceMotion) {
			overlayOpacity.set(0)
			void animate(overlayOpacity, 1, reducedMotionTransition)
			return
		}
		x.set(closedX)
		enterAnimation.current = animate(x, 0, panelEnterExit)
		return () => {
			enterAnimation.current?.stop()
			enterAnimation.current = null
		}
	}, [closedX, overlayOpacity, reduceMotion, x])

	useEffect(() => {
		const node = panelRef.current
		if (!node) {
			return
		}
		const preventNativeDrag = (event: DragEvent) => {
			event.preventDefault()
		}
		node.addEventListener("dragstart", preventNativeDrag)
		return () => node.removeEventListener("dragstart", preventNativeDrag)
	}, [])

	const requestOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				onOpenChange(true)
				return
			}
			if (closing.current) {
				return
			}
			closing.current = true
			enterAnimation.current?.stop()
			if (reduceMotion) {
				void animate(overlayOpacity, 0, reducedMotionTransition).then(() => {
					onOpenChange(false)
				})
				return
			}
			void animate(x, closedX, panelEnterExit).then(() => {
				onOpenChange(false)
			})
		},
		[closedX, onOpenChange, overlayOpacity, reduceMotion, x],
	)

	const clampDragX = useCallback(
		(next: number) => {
			return closesToNegativeX
				? Math.min(0, Math.max(closedX, next))
				: Math.max(0, Math.min(closedX, next))
		},
		[closedX, closesToNegativeX],
	)

	const finishDrag = useCallback(() => {
		const offset = x.get()
		const velocity = lastMove.current.v
		const shouldClose =
			isDismissable &&
			(closesToNegativeX
				? offset < -dismissOffset || velocity < -DISMISS_VELOCITY
				: offset > dismissOffset || velocity > DISMISS_VELOCITY)
		if (shouldClose) {
			suppressClick.current = true
			requestOpenChange(false)
			return
		}
		void animate(x, 0, { ...snapBackTransition, min: 0, max: 0 })
	}, [
		closesToNegativeX,
		dismissOffset,
		isDismissable,
		requestOpenChange,
		x,
	])

	const onPointerDown = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			suppressClick.current = false
			const target = event.target
			if (target instanceof Element) {
				const link = target.closest("a")
				if (link instanceof HTMLElement) {
					link.draggable = false
				}
			}
			if (!canDrag || event.button !== 0) {
				return
			}
			axisLock.current = "pending"
			pointerOrigin.current = {
				x: event.clientX,
				y: event.clientY,
				startX: x.get(),
			}
			lastMove.current = { x: event.clientX, t: event.timeStamp, v: 0 }
		},
		[canDrag, x],
	)

	const onPointerMove = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (!canDrag || axisLock.current == null) {
				return
			}
			const dx = event.clientX - pointerOrigin.current.x
			const dy = event.clientY - pointerOrigin.current.y
			if (axisLock.current === "pending") {
				if (Math.abs(dx) < AXIS_INTENT_PX && Math.abs(dy) < AXIS_INTENT_PX) {
					return
				}
				if (Math.abs(dx) > Math.abs(dy)) {
					axisLock.current = "x"
					enterAnimation.current?.stop()
					try {
						event.currentTarget.setPointerCapture(event.pointerId)
					} catch {
						// iOS can reject capture on some targets; window-level moves still arrive.
					}
				} else {
					axisLock.current = "y"
					return
				}
			}
			if (axisLock.current !== "x") {
				return
			}
			event.preventDefault()
			const dt = event.timeStamp - lastMove.current.t
			if (dt > 0) {
				lastMove.current.v = ((event.clientX - lastMove.current.x) / dt) * 1000
			}
			lastMove.current = { x: event.clientX, t: event.timeStamp, v: lastMove.current.v }
			const next = clampDragX(pointerOrigin.current.startX + dx)
			if (Math.abs(next) > 8) {
				suppressClick.current = true
			}
			x.set(next)
		},
		[canDrag, clampDragX, x],
	)

	const onPointerUp = useCallback(
		(event: ReactPointerEvent<HTMLDivElement>) => {
			if (axisLock.current === "x") {
				if (event.currentTarget.hasPointerCapture(event.pointerId)) {
					event.currentTarget.releasePointerCapture(event.pointerId)
				}
				finishDrag()
			}
			axisLock.current = null
		},
		[finishDrag],
	)

	return (
		<MotionModalOverlay
			isOpen
			onOpenChange={requestOpenChange}
			isDismissable={isDismissable}
			className={overlayClassName}
			style={
				reduceMotion
					? { opacity: overlayOpacity }
					: { backgroundColor: scrimBackground }
			}
		>
			<Modal className={shellClassName} data-side={side}>
				<motion.div
					ref={panelRef}
					className={cls(panelClassName, className)}
					data-side={side}
					style={
						reduceMotion
							? undefined
							: { x, touchAction: canDrag ? "pan-y" : "auto" }
					}
					initial={reduceMotion ? false : { x: closedX }}
					onPointerDownCapture={onPointerDown}
					onPointerMoveCapture={onPointerMove}
					onPointerUpCapture={onPointerUp}
					onPointerCancelCapture={onPointerUp}
					onClickCapture={(event) => {
						if (!suppressClick.current) {
							return
						}
						event.preventDefault()
						event.stopPropagation()
						suppressClick.current = false
					}}
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
				</motion.div>
			</Modal>
		</MotionModalOverlay>
	)
}

const overlayClass = style({
	position: "fixed",
	inset: 0,
	zIndex: 1100,
	overflow: "hidden",
	overscrollBehavior: "none",
})

const overlayReducedScrimClass = style({
	backgroundColor: `oklch(from ${colors.gray[12]} l c h / ${SCRIM_ALPHA})`,
})

const shellClass = style({
	position: "absolute",
	top: 0,
	bottom: 0,
	width: `min(${PANEL_WIDTH_PX}px, ${PANEL_MAX_VW}vw)`,
	maxWidth: `${PANEL_MAX_VW}vw`,
	height: "100%",
	margin: 0,
	outline: "none",
	overflow: "visible",
	background: "transparent",
	boxShadow: "none",
	"&[data-side='start']": {
		insetInlineStart: 0,
	},
	"&[data-side='end']": {
		insetInlineEnd: 0,
	},
})

const panelClass = style(background.element, {
	width: "100%",
	height: "100%",
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	borderRadius: 0,
	willChange: "transform",
	touchAction: "pan-y",
	userSelect: "none",
	boxShadow: `0 0 0 1px ${borderColor.outline}`,
	"& [role='dialog'] > nav": {
		width: "100%",
		minWidth: 0,
		height: "auto",
		minHeight: "100%",
		overflow: "visible",
		boxShadow: "none",
		borderRadius: 0,
		backgroundColor: "transparent",
	},
})

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
