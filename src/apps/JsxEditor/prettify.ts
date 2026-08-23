import { format } from "prettier/standalone"
import * as babelPlugin from "prettier/plugins/babel"
import * as estreePlugin from "prettier/plugins/estree"
import type { Plugin } from "prettier"

const plugins = [babelPlugin, estreePlugin] as Plugin[]

export async function prettifyJsx(source: string): Promise<string> {
	const trimmed = source.trim()
	if (trimmed.length === 0) {
		return source
	}

	try {
		return await format(trimmed, {
			parser: "__js_expression",
			plugins,
			semi: false,
			singleQuote: false,
			jsxSingleQuote: false,
			trailingComma: "all",
			tabWidth: 2,
			printWidth: 72,
		})
	} catch {
		return source
	}
}
