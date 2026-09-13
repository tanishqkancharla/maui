import type { ThemePreference } from "../../theme/ThemeContext"

/**
 * Shareable JSX editor state, stored in the URL hash as URL-safe base64 JSON.
 * Matches the Craft mermaid-editor pattern: `{ source, theme }`.
 *
 * URL-safe base64 is required so the fragment never starts with `#/`, which
 * the gallery treats as a legacy hash route (`src/index.tsx`).
 */
export type EditorUrlState = {
	source: string
	theme?: ThemePreference
}

export const editorPath = "/editor"
export const editorUrlDebounceMs = 300

const themePreferences = new Set<ThemePreference>(["system", "light", "dark"])

function isThemePreference(value: unknown): value is ThemePreference {
	return typeof value === "string" && themePreferences.has(value as ThemePreference)
}

function bytesToBase64Url(bytes: Uint8Array): string {
	let binary = ""
	const chunkSize = 0x8000
	for (let offset = 0; offset < bytes.length; offset += chunkSize) {
		binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize))
	}
	return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
}

function base64UrlToBytes(encoded: string): Uint8Array {
	const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/")
	const padLength = (4 - (normalized.length % 4)) % 4
	const binary = atob(normalized + "=".repeat(padLength))
	const bytes = new Uint8Array(binary.length)
	for (let index = 0; index < binary.length; index++) {
		bytes[index] = binary.charCodeAt(index)
	}
	return bytes
}

export function encodeEditorUrlState(state: EditorUrlState): string {
	const json = JSON.stringify({
		source: state.source,
		theme: state.theme,
	})
	return bytesToBase64Url(new TextEncoder().encode(json))
}

export function decodeEditorUrlState(hash: string): EditorUrlState | null {
	const encoded = hash.startsWith("#") ? hash.slice(1) : hash
	if (!encoded) {
		return null
	}

	try {
		const json = new TextDecoder().decode(base64UrlToBytes(encoded))
		const parsed: unknown = JSON.parse(json)
		if (
			parsed === null ||
			typeof parsed !== "object" ||
			typeof (parsed as { source?: unknown }).source !== "string"
		) {
			return null
		}

		const source = (parsed as { source: string }).source
		const themeValue = (parsed as { theme?: unknown }).theme
		return isThemePreference(themeValue)
			? { source, theme: themeValue }
			: { source }
	} catch {
		return null
	}
}

export function readEditorUrlState(): EditorUrlState | null {
	return decodeEditorUrlState(window.location.hash)
}

export function writeEditorUrlState(state: EditorUrlState) {
	if (window.location.pathname !== editorPath) {
		return
	}

	const nextHash = `#${encodeEditorUrlState(state)}`
	if (window.location.hash === nextHash) {
		return
	}

	window.history.replaceState(
		window.history.state,
		"",
		`${window.location.pathname}${window.location.search}${nextHash}`,
	)
}
