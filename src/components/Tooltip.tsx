import { animated, useSpring } from "@react-spring/web"
import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import {
	mergeProps,
	useOverlayPosition,
	useTooltip,
	useTooltipTrigger,
} from "react-aria"
import { TooltipTriggerState, useTooltipTriggerState } from "react-stately"
import { style, useStyles } from "purse-styles"
import { borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
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
	const { content, children, placement = "top", delay = 500, isDisabled } = props

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
// trigger and scaled down, then settles into its final position. The exit
// reverses this, collapsing back toward the trigger.
//
// Both states MUST use the identical transform function structure
// (`translate(x, y) scale(s)`). react-spring interpolates transforms by
// matching numbers positionally between strings, so mismatched structures
// (e.g. `translateY(...)` vs `translate(...)`) interpolate into garbage.
const hiddenTransforms: Record<string, string> = {
	top: "translate(0px, 3px) scale(0.94)",
	bottom: "translate(0px, -3px) scale(0.94)",
	left: "translate(3px, 0px) scale(0.94)",
	right: "translate(-3px, 0px) scale(0.94)",
}

const shownTransform = "translate(0px, 0px) scale(1)"

const transformOrigins: Record<string, string> = {
	top: "center bottom",
	bottom: "center top",
	left: "right center",
	right: "left center",
}

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

	// The spring's onRest closes over props from the render that scheduled the
	// animation. If the user re-enters mid-exit, react-spring interrupts the
	// exit and fires onRest — guard against that stale callback unmounting a
	// tooltip that is now animating back in.
	const phaseRef = useRef(phase)
	phaseRef.current = phase

	const springStyle = useSpring({
		config: { tension: 1200, friction: 60 },
		from: { opacity: 0, transform: hidden },
		to:
			phase === "out"
				? { opacity: 0, transform: hidden }
				: { opacity: 1, transform: shownTransform },
		// A tooltip opened via a "change" appears instantly (no enter animation).
		immediate: phase === "in" && !animateIn,
		onRest: (result) => {
			if (result.finished && phaseRef.current === "out") onExited()
		},
	})

	const className = useStyles(tooltipClass)

	return ReactDOM.createPortal(
		<animated.div
			ref={overlayRef}
			className={className}
			{...mergeProps(otherProps, tooltipProps)}
			style={{
				...overlayProps.style,
				transformOrigin: transformOrigins[resolvedPlacement],
				...springStyle,
			}}
		>
			{children}
		</animated.div>,
		document.body,
	)
}

// The wrapper makes the trigger hoverable/focusable as a unit without
// affecting layout of the child.
const triggerClass = style({
	display: "inline-block",
})

const tooltipClass = style(
	text("xs", 400, "highContrast"),
	radius.sm,
	spacing.padding({ x: 3, y: 2 }),
	{
		zIndex: 1000,
		maxWidth: "240px",
		background: colors.gray[3],
		boxShadow: `var(--shadow-middle), 0 0 0 1px ${borderColor.outline}`,
	},
)
