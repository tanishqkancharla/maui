import {
	autocompletion,
	snippetCompletion,
	startCompletion,
	type Completion,
	type CompletionContext,
	type CompletionResult,
} from "@codemirror/autocomplete"
import { EditorView } from "@codemirror/view"
import {
	catalog,
	iconNames,
	type AttributeCompletion,
	type CatalogComponent,
} from "./catalog"

function catalogItem(tagName: string): CatalogComponent | undefined {
	const name = tagName.startsWith("Icons.") ? "Icons" : tagName
	return catalog.find((entry) => entry.name === name)
}

function componentCompletions(): Completion[] {
	return catalog.map((item) => ({
		label: item.name,
		type: "class",
		info: item.info,
		boost: 10,
	}))
}

function isNumericAttribute(attribute: AttributeCompletion | undefined): boolean {
	return Boolean(attribute?.values?.every((value) => /^-?\d+$/.test(value)))
}

function attributeCompletions(
	tagName: string,
	used: Set<string>,
): Completion[] {
	const item = catalogItem(tagName)
	if (!item) return []

	return item.attributes
		.filter((attribute) => !used.has(attribute.name))
		.map((attribute) => {
			if (attribute.boolean) {
				return {
					label: attribute.name,
					type: "property",
					info: attribute.info,
					apply: attribute.name,
				} satisfies Completion
			}

			if (isNumericAttribute(attribute)) {
				return snippetCompletion(`${attribute.name}={#{}}`, {
					label: attribute.name,
					type: "property",
					info: attribute.info,
				})
			}

			return snippetCompletion(`${attribute.name}="#{}"`, {
				label: attribute.name,
				type: "property",
				info: attribute.info,
			})
		})
}

function valueCompletions(
	tagName: string,
	attributeName: string,
	mode: "bare" | "quoted" | "braced",
): Completion[] {
	const item = catalogItem(tagName)
	const attribute = item?.attributes.find((entry) => entry.name === attributeName)
	if (!attribute?.values) return []

	const numeric = isNumericAttribute(attribute)
	return attribute.values.map((value) => {
		let apply = value
		if (mode === "bare") {
			apply = numeric ? `{${value}}` : `"${value}"`
		}
		return {
			label: value,
			type: "enum",
			apply,
		} satisfies Completion
	})
}

function usedAttributes(tagOpen: string): Set<string> {
	const used = new Set<string>()
	const pattern = /\s([A-Za-z][\w-]*)(?:[={\s/>]|$)/g
	for (const match of tagOpen.matchAll(pattern)) {
		used.add(match[1])
	}
	return used
}

function currentTag(before: string): { name: string; open: string } | null {
	const lastOpen = before.lastIndexOf("<")
	const lastClose = before.lastIndexOf(">")
	if (lastOpen < 0 || lastOpen < lastClose) return null
	if (before[lastOpen + 1] === "/" || before[lastOpen + 1] === "!") return null

	const open = before.slice(lastOpen)
	const nameMatch = /^<([A-Za-z][\w.]*)/.exec(open)
	if (!nameMatch) return null
	return { name: nameMatch[1], open }
}

function valueResult(
	from: number,
	tagName: string,
	attributeName: string,
	mode: "bare" | "quoted" | "braced",
): CompletionResult | null {
	const options = valueCompletions(tagName, attributeName, mode)
	if (options.length === 0) return null
	return {
		from,
		options,
		validFor: /^[^\s"'{}>=]*$/,
	}
}

export function mauiCompletionSource(
	context: CompletionContext,
): CompletionResult | null {
	const before = context.state.doc.sliceString(0, context.pos)

	const iconsDot = context.matchBefore(/Icons\.[A-Za-z]*/)
	if (iconsDot) {
		return {
			from: iconsDot.from + "Icons.".length,
			options: iconNames.map((name) => ({
				label: name,
				type: "class",
				apply: name,
			})),
		}
	}

	const closeTag = context.matchBefore(/<\/[A-Za-z]*/)
	if (closeTag) {
		return {
			from: closeTag.from + 2,
			options: componentCompletions(),
		}
	}

	const openTag = context.matchBefore(/<[A-Za-z][\w.]*/)
	if (openTag && !/\s/.test(openTag.text)) {
		return {
			from: openTag.from + 1,
			options: componentCompletions(),
		}
	}

	const tag = currentTag(before)
	if (!tag) return null

	const quotedValue = context.matchBefore(
		/([A-Za-z][\w-]*)=(["'])(?:\\.|[^\n"'])*/,
	)
	if (quotedValue) {
		const matched = /^([A-Za-z][\w-]*)=(["'])/.exec(quotedValue.text)
		if (matched) {
			return valueResult(
				quotedValue.from + matched[0].length,
				tag.name,
				matched[1],
				"quoted",
			)
		}
	}

	const bracedValue = context.matchBefore(/([A-Za-z][\w-]*)=\{[^}]*/)
	if (bracedValue) {
		const attributeName = /([A-Za-z][\w-]*)=\{/.exec(bracedValue.text)?.[1]
		if (attributeName) {
			return valueResult(
				bracedValue.from + bracedValue.text.indexOf("{") + 1,
				tag.name,
				attributeName,
				"braced",
			)
		}
	}

	const bareEquals = context.matchBefore(/([A-Za-z][\w-]*)=$/)
	if (bareEquals) {
		return valueResult(context.pos, tag.name, bareEquals.text.slice(0, -1), "bare")
	}

	const attrName = context.matchBefore(/[\s][A-Za-z][\w-]*/)
	const escapedName = tag.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
	const afterTagName = new RegExp(`<${escapedName}(?:\\s|$)`).test(tag.open)
	const inTagReadyForAttr =
		afterTagName &&
		(/[\s]$/.test(before) || context.explicit || Boolean(attrName))
	if (inTagReadyForAttr) {
		return {
			from: attrName ? attrName.from + 1 : context.pos,
			options: attributeCompletions(tag.name, usedAttributes(tag.open)),
			validFor: /^[A-Za-z][\w-]*$/,
		}
	}

	return null
}

const triggerValueCompletion = EditorView.updateListener.of((update) => {
	if (!update.docChanged) return
	const pos = update.state.selection.main.head
	const last = update.state.sliceDoc(Math.max(0, pos - 1), pos)
	if (last === "=" || last === '"' || last === "'" || last === "{") {
		startCompletion(update.view)
	}
})

export const mauiAutocomplete = [
	autocompletion({
		override: [mauiCompletionSource],
		activateOnTyping: true,
		activateOnCompletion: (completion) =>
			completion.type === "property" || completion.type === "enum",
		icons: false,
	}),
	triggerValueCompletion,
]
