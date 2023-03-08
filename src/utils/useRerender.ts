import { useCallback, useState } from "react"

export function useRerender() {
	const [state, setState] = useState(0)

	const increment = useCallback(() => {
		setState((x) => x + 1)
	}, [])

	return increment
}
