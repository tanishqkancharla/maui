import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

/** Maui standard interactive transition timing. */
export const motionDurationMs = 80
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
