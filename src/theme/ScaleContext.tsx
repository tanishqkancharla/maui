import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react"

export type ScalePreference = "system" | "medium" | "large"
export type ResolvedScale = Exclude<ScalePreference, "system">
export const scaleStorageKey = "maui-scale"
export const scaleMediaQuery = "(pointer: coarse)"

export function isScalePreference(value: unknown): value is ScalePreference {
	return value === "system" || value === "medium" || value === "large"
}

const ScaleContext = createContext<{
	preference: ScalePreference
	resolvedScale: ResolvedScale
	setPreference: (preference: ScalePreference) => void
} | null>(null)

function getInitialPreference(): ScalePreference {
	try {
		const stored = window.localStorage.getItem(scaleStorageKey)
		return isScalePreference(stored) ? stored : "system"
	} catch {
		return "system"
	}
}

/** Root-scoped, like ThemeProvider. Scale is independent of color mode. */
export function ScaleProvider({ children }: { children: ReactNode }) {
	const [preference, setPreference] = useState(getInitialPreference)
	const [coarsePointer, setCoarsePointer] = useState(
		() => window.matchMedia(scaleMediaQuery).matches,
	)

	useEffect(() => {
		const query = window.matchMedia(scaleMediaQuery)
		const update = () => setCoarsePointer(query.matches)
		query.addEventListener("change", update)
		update()
		return () => query.removeEventListener("change", update)
	}, [])

	const resolvedScale =
		preference === "system" ? (coarsePointer ? "large" : "medium") : preference

	useLayoutEffect(() => {
		document.documentElement.dataset.scale = resolvedScale
		try {
			window.localStorage.setItem(scaleStorageKey, preference)
		} catch {
			// Scale selection still works when storage is unavailable.
		}
	}, [preference, resolvedScale])

	const value = useMemo(
		() => ({ preference, resolvedScale, setPreference }),
		[preference, resolvedScale],
	)
	return <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
}

export function useScale() {
	const context = useContext(ScaleContext)
	if (!context) throw new Error("useScale must be used within a MauiProvider")
	return context
}
