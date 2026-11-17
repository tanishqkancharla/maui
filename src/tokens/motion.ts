import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

/** Maui standard interactive transition timing. */
export const motionDurationMs = 80
/** Entrance duration for streaming token reveals (Streamdown word fade). */
export const motionStreamDurationMs = 80
export const motionEasing = "ease-in-out"

/** Shared timings for transient overlay surfaces. */
export const overlayMotion = {
	tooltipEnter: {
		durationMs: 120,
		easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
	},
	tooltipExit: { durationMs: 80, easing: "ease-in" },
	dialogEnter: {
		durationMs: 200,
		easing: "spring (bounce 0)",
		bounce: 0,
	},
	dialogExit: { durationMs: 120, easing: "ease-in" },
	backdrop: { durationMs: 100, easing: "ease-in-out" },
	reduced: { durationMs: 80, easing: "ease-in-out" },
} as const

const standardDuration = `${motionDurationMs}ms`

export const motion = {
	standard: memoize((...properties: string[]) =>
		style({
			transition: properties
				.map((property) => `${property} ${standardDuration} ${motionEasing}`)
				.join(", "),
		}),
	),
} as const
