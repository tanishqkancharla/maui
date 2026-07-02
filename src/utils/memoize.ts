/**
 * Wraps a function so repeated calls with equivalent arguments return a
 * cached result instead of recomputing it. Useful for expensive value
 * construction (e.g. style tokens) where callers pass fresh inline
 * objects/args on every call, so caching must be by value (JSON key) rather
 * than by argument identity.
 */
export function memoize<Args extends unknown[], Result>(
	fn: (...args: Args) => Result,
): (...args: Args) => Result {
	const cache = new Map<string, Result>()

	return (...args: Args): Result => {
		const key = JSON.stringify(args)
		const cached = cache.get(key)

		if (cached !== undefined) {
			return cached
		}

		const result = fn(...args)
		cache.set(key, result)
		return result
	}
}
