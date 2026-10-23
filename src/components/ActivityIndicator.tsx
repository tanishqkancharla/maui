import { useEffect, useRef } from "react"
import { style, useStyles } from "purse-styles"
import { colors } from "../tokens/colors"
import { cls } from "../utils/cls"

// Geometry is in a 24×24 viewBox. Spokes end this far from the center.
const VIEWBOX_CENTER = 12
const SPOKE_OUTER_RADIUS = 9.5
const SPOKE_COUNT = 8
const SPOKE_LENGTH = 2.75
const SPOKE_WIDTH = 2.5
const MIN_SPOKE_OPACITY = 0.15
const ROTATION_MS = 800

const SPOKE_TOP = VIEWBOX_CENTER - SPOKE_OUTER_RADIUS

// The top spoke leads; spokes counterclockwise from it fade toward the tail.
const spokes = Array.from({ length: SPOKE_COUNT }, (_, index) => {
	const distanceBehindHead = (SPOKE_COUNT - index) % SPOKE_COUNT
	return {
		angle: (index * 360) / SPOKE_COUNT,
		opacity:
			1 - (distanceBehindHead * (1 - MIN_SPOKE_OPACITY)) / (SPOKE_COUNT - 1),
	}
})

export type ActivityIndicatorVariant = "primary" | "accent" | "muted"

export type ActivityIndicatorProps = {
	size?: string
	variant?: ActivityIndicatorVariant
	className?: string
	"aria-label"?: string
}

/**
 * iOS-style spinner: eight rounded spokes with a fading tail. The wheel
 * rotates in discrete 45° steps, like UIActivityIndicatorView, so the bright
 * spoke appears to hop clockwise.
 */
export function ActivityIndicator({
	size = "1em",
	variant = "accent",
	className,
	"aria-label": ariaLabel = "Loading",
}: ActivityIndicatorProps) {
	const svgRef = useRef<SVGSVGElement>(null)
	const rootClassName = useStyles(rootClass, variantStyles[variant])

	useEffect(() => {
		const animation = svgRef.current?.animate(
			[{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
			{
				duration: ROTATION_MS,
				iterations: Infinity,
				easing: `steps(${SPOKE_COUNT})`,
			},
		)
		return () => animation?.cancel()
	}, [])

	return (
		<span
			role="status"
			aria-label={ariaLabel}
			className={cls(rootClassName, className)}
			style={{ width: size, height: size }}
		>
			<svg
				ref={svgRef}
				aria-hidden="true"
				focusable="false"
				viewBox="0 0 24 24"
				width="100%"
				height="100%"
			>
				{spokes.map(({ angle, opacity }) => (
					<line
						key={angle}
						x1={VIEWBOX_CENTER}
						y1={SPOKE_TOP}
						x2={VIEWBOX_CENTER}
						y2={SPOKE_TOP + SPOKE_LENGTH}
						stroke="currentColor"
						strokeWidth={SPOKE_WIDTH}
						strokeLinecap="round"
						opacity={opacity}
						transform={`rotate(${angle} ${VIEWBOX_CENTER} ${VIEWBOX_CENTER})`}
					/>
				))}
			</svg>
		</span>
	)
}

const variantStyles = {
	primary: style({
		color: "currentColor",
	}),
	accent: style({
		color: colors.accent[10],
	}),
	muted: style({
		color: colors.gray[11],
	}),
} as const

const rootClass = style({
	display: "inline-flex",
	verticalAlign: "-0.125em",
	flexShrink: 0,
})
