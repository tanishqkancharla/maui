import { useRef } from "react"

import { intersection, isArray, isPlainObject } from "lodash"

export function isShallowEqual(a: any, b: any) {
	if (a == b) return true
	if (isArray(a)) {
		if (!isArray(b)) return false
		if (a.length !== b.length) return false
		return a.every((x, i) => b[i] === x)
	}
	if (isPlainObject(a)) {
		if (!isPlainObject(b)) return false
		const keys = Object.keys(a)
		const sameKeys = intersection(keys, Object.keys(b))
		if (keys.length !== sameKeys.length) return false
		return keys.every((key) => a[key] == b[key])
	}
	return false
}

export function useMemoShallowEqual<T>(value: T) {
	const valueRef = useRef(value)

	if (!isShallowEqual(valueRef.current, value)) {
		valueRef.current = value
		return value
	}

	return valueRef.current
}
