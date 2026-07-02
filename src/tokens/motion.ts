import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

const standardDuration = "80ms"
const standardEasing = "ease-in-out"

export const motion = {
	standard: memoize((...properties: string[]) =>
		style({
			transition: properties
				.map((property) => `${property} ${standardDuration} ${standardEasing}`)
				.join(", "),
		}),
	),
} as const
