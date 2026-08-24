import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react"

export type ThemePreference = "system" | "light" | "dark"
export type ResolvedTheme = Exclude<ThemePreference, "system">

export type ThemeContextValue = {
	preference: ThemePreference
	resolvedTheme: ResolvedTheme
	setPreference: (preference: ThemePreference) => void
}

export const themeStorageKey = "maui-theme"

export const ThemeContext = createContext<ThemeContextValue | null>(null)

function isThemePreference(value: string | null): value is ThemePreference {
	return value === "system" || value === "light" || value === "dark"
}

function getInitialPreference(): ThemePreference {
	try {
		const storedPreference = window.localStorage.getItem(themeStorageKey)
		return isThemePreference(storedPreference) ? storedPreference : "system"
	} catch {
		return "system"
	}
}

export function ThemeProvider(props: { children: ReactNode }) {
	const [preference, setPreference] =
		useState<ThemePreference>(getInitialPreference)
	const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
		window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light",
	)

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		const handleChange = (event: MediaQueryListEvent) => {
			setSystemTheme(event.matches ? "dark" : "light")
		}

		mediaQuery.addEventListener("change", handleChange)
		return () => mediaQuery.removeEventListener("change", handleChange)
	}, [])

	const resolvedTheme = preference === "system" ? systemTheme : preference

	useLayoutEffect(() => {
		const root = document.documentElement
		root.dataset.theme = resolvedTheme
		root.style.colorScheme = resolvedTheme
		try {
			window.localStorage.setItem(themeStorageKey, preference)
		} catch {
			// The active theme still works when storage is unavailable.
		}
	}, [preference, resolvedTheme])

	const value = useMemo(
		() => ({ preference, resolvedTheme, setPreference }),
		[preference, resolvedTheme],
	)

	return (
		<ThemeContext.Provider value={value}>
			{props.children}
		</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a MauiProvider")
	}

	return context
}
