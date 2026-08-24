import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
import type { HighlighterCore } from "shiki"
import type { ResolvedTheme } from "../theme/ThemeContext"
import { mauiShikiThemeDark, mauiShikiThemeLight } from "./mauiShikiTheme"

/** Canonical Shiki language ids loaded into the highlighter. */
export const supportedCodeLangs = [
	"typescript",
	"javascript",
	"tsx",
	"css",
	"json",
	"bash",
] as const

export type SupportedCodeLang = (typeof supportedCodeLangs)[number]

/** Common fence aliases → loaded Shiki language. */
const codeLangAliases: Record<string, SupportedCodeLang> = {
	ts: "typescript",
	tsx: "tsx",
	js: "javascript",
	javascript: "javascript",
	typescript: "typescript",
	css: "css",
	json: "json",
	bash: "bash",
	sh: "bash",
	shell: "bash",
}

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighterCore({
			themes: [mauiShikiThemeDark, mauiShikiThemeLight],
			langs: [
				import("@shikijs/langs/typescript"),
				import("@shikijs/langs/javascript"),
				import("@shikijs/langs/tsx"),
				import("@shikijs/langs/css"),
				import("@shikijs/langs/json"),
				import("@shikijs/langs/bash"),
			],
			engine: createOnigurumaEngine(import("shiki/wasm")),
		})
	}

	return highlighterPromise
}

export function resolveCodeLang(lang: string): SupportedCodeLang | null {
	return codeLangAliases[lang.toLowerCase()] ?? null
}

export function isSupportedCodeLang(lang: string): boolean {
	return resolveCodeLang(lang) !== null
}

export async function highlightCode(
	code: string,
	lang: string,
	theme: ResolvedTheme,
) {
	const resolved = resolveCodeLang(lang)
	if (!resolved) {
		throw new Error(`Unsupported code language: ${lang}`)
	}

	const highlighter = await getHighlighter()

	return highlighter.codeToHtml(code.trimEnd(), {
		lang: resolved,
		theme: `maui-${theme}`,
		transformers: [
			{
				pre(node) {
					node.properties.class = "shiki maui-shiki"
					node.properties.style =
						"background-color: transparent; margin: 0; padding: 0; font-family: inherit;"
				},
			},
		],
	})
}
