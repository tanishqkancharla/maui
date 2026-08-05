import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

/** Maui standard interactive transition timing. */
export const motionDurationMs = 80
/** Entrance duration for streaming token reveals (Streamdown word fade). */
export const motionStreamDurationMs = 80
export const motionEasing = "ease-in-out"

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
