import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
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
	cubicBezier,
	motion,
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

	useLayoutEffect(() => {
		if (reduceMotion) {
			overlayOpacity.set(0)
			void animate(overlayOpacity, 1, reducedMotionTransition)
			return
		}
		x.set(closedX)
		void animate(x, 0, panelEnterExit)
	}, [closedX, overlayOpacity, reduceMotion, x])

	useLayoutEffect(() => {
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

	const onDragEnd = useCallback(
		(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
			if (!isDismissable) {
				void animate(x, 0, { ...snapBackTransition, min: 0, max: 0 })
				return
			}
			const shouldClose = closesToNegativeX
				? info.offset.x < -dismissOffset || info.velocity.x < -DISMISS_VELOCITY
				: info.offset.x > dismissOffset || info.velocity.x > DISMISS_VELOCITY
			if (shouldClose) {
				requestOpenChange(false)
			} else {
				void animate(x, 0, { ...snapBackTransition, min: 0, max: 0 })
			}
		},
		[
			closesToNegativeX,
			dismissOffset,
			isDismissable,
			requestOpenChange,
			x,
		],
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
					drag={canDrag ? "x" : false}
					dragMomentum={false}
					dragElastic={0}
					onPointerDownCapture={(event) => {
						suppressClick.current = false
						const target = event.target
						if (!(target instanceof Element)) {
							return
						}
						const link = target.closest("a")
						if (link instanceof HTMLElement) {
							link.draggable = false
						}
					}}
					onDrag={(_event, info) => {
						if (Math.abs(info.offset.x) > 8) {
							suppressClick.current = true
						}
					}}
					onClickCapture={(event) => {
						if (!suppressClick.current) {
							return
						}
						event.preventDefault()
						event.stopPropagation()
						suppressClick.current = false
					}}
					dragConstraints={
						closesToNegativeX
							? { left: -panelWidth, right: 0 }
							: { left: 0, right: panelWidth }
					}
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
	touchAction: "none",
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

const panelClass = style(
	background.element,
	shadow.subtle,
	radius.lg,
	{
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		willChange: "transform",
		touchAction: "pan-y",
		userSelect: "none",
		"&[data-side='start']": {
			borderStartStartRadius: 0,
			borderEndStartRadius: 0,
		},
		"&[data-side='end']": {
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
