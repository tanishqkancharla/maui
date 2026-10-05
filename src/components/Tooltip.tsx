import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import {
	mergeProps,
	useOverlayPosition,
	useTooltip,
	useTooltipTrigger,
} from "react-aria"
import { TooltipTriggerState, useTooltipTriggerState } from "react-stately"
import { useReducedMotion } from "motion/react"
import { style, useStyles } from "purse-styles"
import { background } from "../tokens/background"
import { border } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { overlayMotion } from "../tokens/motion"
import { radius } from "../tokens/radius"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

type TooltipPlacement = "top" | "bottom" | "left" | "right"

type TooltipProps = {
	/** The content shown inside the tooltip. */
	content: React.ReactNode
	/** The trigger element. Must contain something focusable (e.g. a button). */
	children: React.ReactNode
	placement?: TooltipPlacement
	/** Warmup delay in ms before the tooltip shows on hover. */
	delay?: number
	isDisabled?: boolean
}

export function Tooltip(props: TooltipProps) {
	const {
		content,
		children,
		placement = "top",
		delay = 400,
		isDisabled,
	} = props

	const state = useTooltipTriggerState({ delay, isDisabled })
	const triggerRef = useRef<HTMLSpanElement>(null)
	const { triggerProps, tooltipProps } = useTooltipTrigger(
		{ delay, isDisabled },
		state,
		triggerRef,
	)

	const triggerClassName = useStyles(triggerClass)
	const transition = useTooltipTransition(state.isOpen)

	return (
		<>
			<span ref={triggerRef} className={triggerClassName} {...triggerProps}>
				{children}
			</span>
			{transition.render && (
				<TooltipPopup
					state={state}
					triggerRef={triggerRef}
					placement={placement}
					animateIn={transition.animateIn}
					phase={transition.phase}
					onExited={transition.onExited}
					{...tooltipProps}
				>
					{content}
				</TooltipPopup>
			)}
		</>
	)
}

/**
 * Coordinates enter/exit transitions across every tooltip so the animation only
 * plays on the first tooltip to appear and the last one to disappear — not when
 * moving between adjacent triggers.
 *
 * This mirrors react-aria's global warmup/cooldown: the first tooltip in a group
 * warms the group up, siblings then open instantly ("changes"), and the group
 * only cools down once nothing is open. react-aria already keeps the final
 * tooltip visible during its cooldown, so a popup seeing `isOpen === false` is
 * either an instant close (a change) or the final close (the group went cold).
 */
let openCount = 0
let isWarm = false

function acquireEnter(): boolean {
	const animate = !isWarm
	isWarm = true
	openCount += 1
	return animate
}

function releaseExit(resolve: (animateExit: boolean) => void) {
	openCount = Math.max(0, openCount - 1)
	// Defer so a sibling opening in the same commit (a "change") is counted
	// before we decide whether the group actually went cold.
	queueMicrotask(() => {
		if (openCount === 0) {
			isWarm = false
			resolve(true)
		} else {
			resolve(false)
		}
	})
}

type TransitionPhase = "in" | "out"

function useTooltipTransition(isOpen: boolean) {
	const [render, setRender] = useState(isOpen)
	const [animateIn, setAnimateIn] = useState(true)
	const [phase, setPhase] = useState<TransitionPhase>("in")
	const prevOpen = useRef(isOpen)
	const isHeld = useRef(false)

	useEffect(() => {
		if (isOpen === prevOpen.current) return
		prevOpen.current = isOpen

		if (isOpen) {
			isHeld.current = true
			setAnimateIn(acquireEnter())
			setPhase("in")
			setRender(true)
		} else if (isHeld.current) {
			isHeld.current = false
			releaseExit((animateExit) => {
				if (animateExit) setPhase("out")
				else setRender(false)
			})
		}
	}, [isOpen])

	useEffect(() => {
		return () => {
			if (isHeld.current) {
				isHeld.current = false
				releaseExit(() => {})
			}
		}
	}, [])

	return {
		render,
		animateIn,
		phase,
		onExited: () => setRender(false),
	}
}

type TooltipPopupProps = {
	state: TooltipTriggerState
	triggerRef: React.RefObject<Element | null>
	placement: TooltipPlacement
	animateIn: boolean
	phase: TransitionPhase
	onExited: () => void
	children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

// The tooltip enters from the trigger's side: it starts nudged toward the
// trigger, then settles into its final position. The final exit only fades so
// dismissals feel faster than entrances.
const hiddenTransforms: Record<string, string> = {
	top: "translate(0px, 2px)",
	bottom: "translate(0px, -2px)",
	left: "translate(2px, 0px)",
	right: "translate(-2px, 0px)",
}

const shownTransform = "translate(0px, 0px)"

function TooltipPopup(props: TooltipPopupProps) {
	const {
		state,
		triggerRef,
		placement,
		animateIn,
		phase,
		onExited,
		children,
		...otherProps
	} = props

	const overlayRef = useRef<HTMLDivElement>(null)
	const { tooltipProps } = useTooltip(otherProps, state)
	const { overlayProps, placement: actualPlacement } = useOverlayPosition({
		targetRef: triggerRef,
		overlayRef,
		placement,
		offset: 6,
		// Keep positioning active while the popup animates out.
		isOpen: true,
	})

	const resolvedPlacement = actualPlacement ?? placement
	const hidden = hiddenTransforms[resolvedPlacement]

	// A transition end can arrive after the user re-enters mid-exit. Guard
	// against that stale event unmounting a tooltip that is visible again.
	const phaseRef = useRef(phase)
	phaseRef.current = phase
	const [visible, setVisible] = useState(!animateIn)
	const reduceMotion = Boolean(useReducedMotion())

	useEffect(() => {
		if (phase === "out") {
			setVisible(false)
			return
		}
		if (!animateIn) {
			setVisible(true)
			return
		}
		const frame = requestAnimationFrame(() => setVisible(true))
		return () => cancelAnimationFrame(frame)
	}, [animateIn, phase])

	const transition =
		reduceMotion
			? `opacity ${overlayMotion.reduced.durationMs}ms ${overlayMotion.reduced.easing}`
			: phase === "out"
			? `opacity ${overlayMotion.tooltipExit.durationMs}ms ${overlayMotion.tooltipExit.easing}`
			: ["opacity", "transform"]
					.map(
						(property) =>
							`${property} ${overlayMotion.tooltipEnter.durationMs}ms ${overlayMotion.tooltipEnter.easing}`,
					)
					.join(", ")

	const className = useStyles(tooltipClass)

	return ReactDOM.createPortal(
		<div
			ref={overlayRef}
			className={className}
			{...mergeProps(otherProps, tooltipProps)}
			style={{
				...overlayProps.style,
				opacity: visible ? 1 : 0,
				transform:
					reduceMotion || phase === "out" || visible ? shownTransform : hidden,
				transition: phase === "in" && !animateIn ? "none" : transition,
			}}
			onTransitionEnd={(event) => {
				if (event.propertyName === "opacity" && phaseRef.current === "out") {
					onExited()
				}
			}}
		>
			{children}
		</div>,
		document.body,
	)
}

// The wrapper makes the trigger hoverable/focusable as a unit without
// affecting layout of the child.
const triggerClass = style({
	display: "inline-block",
})

const tooltipClass = style(
	text({ size: "xs", fontWeight: 400, color: "highContrast" }),
	radius.sm,
	spacing.padding({ x: 3, y: 2 }),
	border([], "outline"),
	background.element,
	{
		zIndex: 1000,
		maxWidth: "240px",
	},
)
