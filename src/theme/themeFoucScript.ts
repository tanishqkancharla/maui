import { themeStorageKey } from "./ThemeContext"

/**
 * Inline this in `<head>` before first paint so `data-theme` is set before
 * CSS vars resolve. Keep in sync with the gallery `index.html` FOUC script.
 */
export const themeFoucScript = `(function () {
	var preference = "system"
	try {
		var storedPreference = window.localStorage.getItem(${JSON.stringify(themeStorageKey)})
		if (
			storedPreference === "system" ||
			storedPreference === "light" ||
			storedPreference === "dark"
		) {
			preference = storedPreference
		}
	} catch {}

	var theme =
		preference === "system"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light"
			: preference

	document.documentElement.dataset.theme = theme
	document.documentElement.style.colorScheme = theme
})()`
