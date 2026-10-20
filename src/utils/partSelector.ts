import type { CSSProperties, StyleElement } from "purse-styles"

/**
 * Class selector for a part style's own class. Root styles use it to restyle
 * a child part from React Aria state, so any element that uses the same part
 * style picks the rule up.
 */
export function partSelector(part: StyleElement): string {
	if (!part.owned)
		throw new Error("partSelector needs a style with its own declarations")
	return `.${part.owned.className}`
}

/** Nested rule that styles `part` while the root matches `rootState`, e.g. `"[data-selected]"`. */
export function partRule(
	rootState: string,
	part: StyleElement,
	declarations: CSSProperties,
): CSSProperties {
	return {
		[`&${rootState} ${partSelector(part)}`]: declarations,
	} as unknown as CSSProperties
}
