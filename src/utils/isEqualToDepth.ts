import { intersection, isArray, isPlainObject } from "lodash"

export function isEqualToDepth(a: any, b: any, depth: number): boolean {
	if (depth === 0) {
		return a == b
	} else {
		if (a == b) return true
		if (isArray(a)) {
			if (!isArray(b)) return false
			if (a.length !== b.length) return false
			return a.every((x, i) => isEqualToDepth(x, b[i], depth - 1))
		}
		if (isPlainObject(a)) {
			if (!isPlainObject(b)) return false
			const keys = Object.keys(a)
			const sameKeys = intersection(keys, Object.keys(b))
			if (keys.length !== sameKeys.length) return false
			return keys.every((key) => isEqualToDepth(a[key], b[key], depth - 1))
		}
		return false
	}
}
