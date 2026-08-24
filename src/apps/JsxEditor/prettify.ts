import { format } from "prettier/standalone"
import * as babelPlugin from "prettier/plugins/babel"
import * as estreePlugin from "prettier/plugins/estree"
import type { Plugin } from "prettier"

const plugins = [babelPlugin, estreePlugin] as Plugin[]

const FALLBACK_PRINT_WIDTH = 72
const MIN_PRINT_WIDTH = 24
const MAX_PRINT_WIDTH = 200

export function printWidthFromEditor(view: {
	contentDOM: { clientWidth: number }
	defaultCharacterWidth: number
}): number {
	const { clientWidth } = view.contentDOM
	const charWidth = view.defaultCharacterWidth
	if (!(clientWidth > 0) || !(charWidth > 0)) {
		return FALLBACK_PRINT_WIDTH
	}

	return Math.max(
		MIN_PRINT_WIDTH,
		Math.min(MAX_PRINT_WIDTH, Math.floor(clientWidth / charWidth) - 1),
	)
}

type FormatOptions = {
	printWidth?: number
}

async function formatJsxExpression(source: string, printWidth: number) {
	return format(source, {
		parser: "__js_expression",
		plugins,
		semi: false,
		singleQuote: false,
		jsxSingleQuote: false,
		trailingComma: "all",
		tabWidth: 2,
		printWidth,
	})
}

function unwrapFragment(formatted: string): string {
	const trimmed = formatted.trim()
	if (!trimmed.startsWith("<>") || !trimmed.endsWith("</>")) {
		return formatted
	}

	const inner = trimmed.slice(2, -3).replace(/^\n/, "").replace(/\n$/, "")
	const dedented = inner
		.split("\n")
		.map((line) => (line.startsWith("  ") ? line.slice(2) : line))
		.join("\n")
	return formatted.endsWith("\n") ? `${dedented}\n` : dedented
}

export async function prettifyJsx(
	source: string,
	options: FormatOptions = {},
): Promise<string> {
	const trimmed = source.trim()
	if (trimmed.length === 0) {
		return source
	}

	const printWidth = options.printWidth ?? FALLBACK_PRINT_WIDTH

	try {
		return await formatJsxExpression(trimmed, printWidth)
	} catch {
		try {
			const wrapped = await formatJsxExpression(
				`<>${trimmed}</>`,
				printWidth,
			)
			return unwrapFragment(wrapped)
		} catch {
			return source
		}
	}
}
