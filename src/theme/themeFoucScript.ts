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

	var scale = "system"
	try {
		var storedScale = window.localStorage.getItem("maui-scale")
		if (storedScale === "system" || storedScale === "medium" || storedScale === "large") {
			scale = storedScale
		}
	} catch {}
	document.documentElement.dataset.scale = scale === "system"
		? window.matchMedia("(pointer: coarse)").matches ? "large" : "medium"
		: scale
})()`
