import { style, type StyleElement } from "purse-styles"

const standardDuration = "80ms"
const standardEasing = "ease-in-out"

const standardCache = new Map<string, StyleElement>()

export const motion = {
	standard: (...properties: string[]) => {
		const key = properties.join(",")
		const cached = standardCache.get(key)

		if (cached) {
			return cached
		}

		const motionStyle = style({
			transition: properties
				.map((property) => `${property} ${standardDuration} ${standardEasing}`)
				.join(", "),
		})

		standardCache.set(key, motionStyle)
		return motionStyle
	},
} as const
