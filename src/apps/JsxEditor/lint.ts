import { syntaxTree } from "@codemirror/language"
import { linter, type Diagnostic } from "@codemirror/lint"
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
	"about",
	"accessKey",
	"autoCapitalize",
	"autoFocus",
	"color",
	"itemID",
	"itemProp",
	"itemRef",
	"itemScope",
	"itemType",
	"nonce",
	"part",
	"popover",
	"slot",
	"spellCheck",
	"inputMode",
	"is",
	"radioGroup",
	"resource",
	"results",
	"security",
	"unselectable",
	"dangerouslySetInnerHTML",
	"suppressHydrationWarning",
	"suppressContentEditableWarning",
])

function catalogItem(tagName: string): CatalogComponent | undefined {
	const name = tagName.startsWith("Icons.") ? "Icons" : tagName
	return catalog.find((entry) => entry.name === name)
}

function isPassthroughName(name: string): boolean {
	return (
		reactAttrs.has(name) ||
		htmlAttrs.has(name) ||
		/^(aria-|data-|on)[A-Za-z]/.test(name)
	)
}

function quoteUnion(values: string[]): string {
	return values.map((value) => (/^-?\d+$/.test(value) ? value : `"${value}"`)).join(" | ")
}

function tagNameFromOpen(
	view: EditorView,
	from: number,
	to: number,
): string | null {
	const text = view.state.sliceDoc(from, to)
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

export function lintJsx(view: EditorView): Diagnostic[] {
	const diagnostics: Diagnostic[] = []

	syntaxTree(view.state)
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

			const tagName = tagNameFromOpen(view, tag.from, tag.to)
			if (!tagName || tagName === tagName.toLowerCase()) return

			const item = catalogItem(tagName)
			if (!item) return

			const nameNode =
				node.node.getChild("JSXIdentifier") ??
				node.node.getChild("JSXNameSpacedName")
			if (!nameNode) return

			const attrName = view.state.sliceDoc(nameNode.from, nameNode.to)
			const known = item.attributes.find((entry) => entry.name === attrName)
			const allowedPassthrough =
				isPassthroughName(attrName) && (item.html || reactAttrs.has(attrName))

			if (!known && !allowedPassthrough) {
				diagnostics.push({
					from: nameNode.from,
					to: nameNode.to,
					severity: "error",
					source: "maui",
					message: `Property '${attrName}' does not exist on ${item.name}.`,
				})
				return
			}

			if (!known?.values || known.values.length === 0) return

			const valueNode =
				node.node.getChild("JSXAttributeValue") ?? node.node.getChild("JSXEscape")
			if (!valueNode) return

			const raw = view.state.sliceDoc(valueNode.from, valueNode.to)
			const value = unwrapValue(raw)
			if (value.length === 0) return
			if (known.values.includes(value)) return

			diagnostics.push({
				from: valueNode.from,
				to: valueNode.to,
				severity: "error",
				source: "maui",
				message: `Type '${/^-?\d+$/.test(value) ? value : `"${value}"`}' is not assignable to type '${quoteUnion(known.values)}'.`,
			})
		})

	return diagnostics
}

export const mauiJsxLinter = linter(lintJsx, { delay: 250 })
