import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
import type { HighlighterCore } from "shiki"
import { mauiShikiTheme } from "./mauiShikiTheme"

export const supportedCodeLangs = [
	"typescript",
	"javascript",
	"tsx",
	"css",
	"json",
	"bash",
] as const

export type SupportedCodeLang = (typeof supportedCodeLangs)[number]

let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter() {
	if (!highlighterPromise) {
		highlighterPromise = createHighlighterCore({
			themes: [mauiShikiTheme],
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

export function isSupportedCodeLang(lang: string): lang is SupportedCodeLang {
	return supportedCodeLangs.includes(lang as SupportedCodeLang)
}

export async function highlightCode(code: string, lang: SupportedCodeLang) {
	const highlighter = await getHighlighter()

	return highlighter.codeToHtml(code.trimEnd(), {
		lang,
		theme: "maui",
		transformers: [
			{
				pre(node) {
					node.properties.class = "shiki maui-shiki"
					node.properties.style = "background-color: transparent; margin: 0; padding: 0;"
				},
			},
		],
	})
}
