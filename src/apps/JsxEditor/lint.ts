import { javascript } from "@codemirror/lang-javascript"
import { syntaxTree } from "@codemirror/language"
import { linter, type Diagnostic } from "@codemirror/lint"
import { EditorState } from "@codemirror/state"
import type { EditorView } from "@codemirror/view"
import { catalog, type CatalogComponent } from "./catalog"

const reactAttrs = new Set(["key", "ref", "children"])

const htmlAttrs = new Set([
	"className",
	"id",
	"style",
	"role",
	"title",
	"hidden",
	"tabIndex",
	"slot",
	"lang",
	"dir",
	"draggable",
	"contentEditable",
	"spellCheck",
	"translate",
	"autoFocus",
	"dangerouslySetInnerHTML",
])

const svgAttrs = new Set([
	"className",
	"style",
	"width",
	"height",
	"fill",
	"stroke",
	"strokeWidth",
	"strokeLinecap",
	"strokeLinejoin",
	"opacity",
	"role",
	"color",
	"viewBox",
	"focusable",
	"aria-hidden",
	"aria-label",
])

function catalogItem(tagName: string): CatalogComponent | undefined {
	const name = tagName.startsWith("Icons.") ? "Icons" : tagName
	return catalog.find((entry) => entry.name === name)
}

function isPassthroughName(
	item: CatalogComponent,
	name: string,
): boolean {
	if (reactAttrs.has(name)) return true
	if (/^(aria-|data-|on)[A-Za-z]/.test(name)) return true
	if (item.html && htmlAttrs.has(name)) return true
	if (item.svg && svgAttrs.has(name)) return true
	return false
}

function quoteUnion(values: string[]): string {
	return values.map((value) => (/^-?\d+$/.test(value) ? value : `"${value}"`)).join(" | ")
}

function tagNameFromOpen(state: EditorState, from: number, to: number): string | null {
	const text = state.sliceDoc(from, to)
	const match = /^<\/?([A-Za-z][\w.]*)/.exec(text)
	return match?.[1] ?? null
}

function unwrapValue(raw: string): string {
	const trimmed = raw.trim()
	if (
		(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
		(trimmed.startsWith("'") && trimmed.endsWith("'"))
	) {
		return trimmed.slice(1, -1)
	}
	if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
		return trimmed.slice(1, -1).trim()
	}
	return trimmed
}

export type JsxDiagnostic = Diagnostic & { line: number }

function diagnostic(
	state: EditorState,
	from: number,
	to: number,
	message: string,
): JsxDiagnostic {
	return {
		from,
		to,
		severity: "error",
		source: "maui",
		message,
		line: state.doc.lineAt(from).number,
	}
}

export function formatErrorBanner(message: string, line?: number): string {
	const cleaned = message.replace(/\s*\(\d+:\d+\)\s*$/, "").trim()
	return line ? `Line ${line}: ${cleaned}` : cleaned
}

export function lineFromCompileError(message: string): number | undefined {
	const match = /\((\d+):\d+\)/.exec(message)
	if (!match) return undefined
	return Math.max(1, Number(match[1]) - 1)
}

export function collectJsxDiagnostics(state: EditorState): JsxDiagnostic[] {
	const diagnostics: JsxDiagnostic[] = []

	syntaxTree(state)
		.cursor()
		.iterate((node) => {
			if (node.name !== "JSXAttribute") return
			if (node.node.getChild("⚠")) return

			const tag = node.node.parent
			if (
				!tag ||
				(tag.name !== "JSXOpenTag" && tag.name !== "JSXSelfClosingTag")
			) {
				return
			}

			const tagName = tagNameFromOpen(state, tag.from, tag.to)
			if (!tagName || tagName === tagName.toLowerCase()) return

			const item = catalogItem(tagName)
			if (!item) return

			const nameNode =
				node.node.getChild("JSXIdentifier") ??
				node.node.getChild("JSXNameSpacedName")
			if (!nameNode) return

			const attrName = state.sliceDoc(nameNode.from, nameNode.to)
			const known = item.attributes.find((entry) => entry.name === attrName)

			if (!known && !isPassthroughName(item, attrName)) {
				diagnostics.push(
					diagnostic(
						state,
						nameNode.from,
						nameNode.to,
						`Property '${attrName}' does not exist on ${tagName}.`,
					),
				)
				return
			}

			if (!known?.values || known.values.length === 0) return

			const valueNode =
				node.node.getChild("JSXAttributeValue") ?? node.node.getChild("JSXEscape")
			if (!valueNode) {
				diagnostics.push(
					diagnostic(
						state,
						nameNode.from,
						nameNode.to,
						`Type 'true' is not assignable to type '${quoteUnion(known.values)}'.`,
					),
				)
				return
			}

			const raw = state.sliceDoc(valueNode.from, valueNode.to)
			const value = unwrapValue(raw)
			if (value.length === 0) return
			if (known.values.includes(value)) return

			diagnostics.push(
				diagnostic(
					state,
					valueNode.from,
					valueNode.to,
					`Type '${/^-?\d+$/.test(value) ? value : `"${value}"`}' is not assignable to type '${quoteUnion(known.values)}'.`,
				),
			)
		})

	return diagnostics
}

export function collectJsxDiagnosticsFromSource(source: string): JsxDiagnostic[] {
	const state = EditorState.create({
		doc: source,
		extensions: [javascript({ jsx: true, typescript: true })],
	})
	return collectJsxDiagnostics(state)
}

export function lintJsx(view: EditorView): Diagnostic[] {
	return collectJsxDiagnostics(view.state)
}

export const mauiJsxLinter = linter(lintJsx, { delay: 150 })
