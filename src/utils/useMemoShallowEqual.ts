import { useRef } from "react"
import { isEqualToDepth } from "./isEqualToDepth"

export function useMemoShallowEqual<T>(value: T) {
	const valueRef = useRef(value)

	if (!isEqualToDepth(valueRef.current, value, 1)) {
		valueRef.current = value
		return value
	} else {
		return valueRef.current
	}
}
