import {
	autocompletion,
	type Completion,
	type CompletionContext,
	type CompletionResult,
} from "@codemirror/autocomplete"
import { catalog, iconNames } from "./catalog"

function componentCompletions(): Completion[] {
	return catalog.map((item) => ({
		label: item.name,
		type: "class",
		info: item.info,
		boost: 10,
	}))
}

function attributeCompletions(
	tagName: string,
	used: Set<string>,
): Completion[] {
	const item = catalog.find((entry) => entry.name === tagName)
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

			if (attribute.values && attribute.values.length > 0) {
				const isNumeric = attribute.values.every((value) => /^\d+$/.test(value))
				const apply = isNumeric
					? `${attribute.name}={}`
					: `${attribute.name}=""`
				return {
					label: attribute.name,
					type: "property",
					info: attribute.info,
					apply,
				} satisfies Completion
			}

			return {
				label: attribute.name,
				type: "property",
				info: attribute.info,
				apply: `${attribute.name}=""`,
			} satisfies Completion
		})
}

function valueCompletions(tagName: string, attributeName: string): Completion[] {
	const item = catalog.find((entry) => entry.name === tagName)
	const attribute = item?.attributes.find((entry) => entry.name === attributeName)
	if (!attribute?.values) return []

	const isNumeric = attribute.values.every((value) => /^\d+$/.test(value))
	return attribute.values.map((value) => ({
		label: value,
		type: "enum",
		apply: isNumeric ? value : value,
	}))
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

	const openTag = context.matchBefore(/<[A-Za-z]*/)
	if (openTag) {
		return {
			from: openTag.from + 1,
			options: componentCompletions(),
		}
	}

	const tag = currentTag(before)
	if (!tag) return null

	const quotedValue = context.matchBefore(/([A-Za-z][\w-]*)=(["'])[^"']*/)
	if (quotedValue) {
		const attributeName = /([A-Za-z][\w-]*)=/.exec(quotedValue.text)?.[1]
		if (attributeName) {
			const quoteIndex = quotedValue.text.indexOf("=") + 2
			return {
				from: quotedValue.from + quoteIndex,
				options: valueCompletions(tag.name, attributeName),
			}
		}
	}

	const bracedValue = context.matchBefore(/([A-Za-z][\w-]*)=\{[^}]*/)
	if (bracedValue) {
		const attributeName = /([A-Za-z][\w-]*)=\{/.exec(bracedValue.text)?.[1]
		if (attributeName) {
			const braceIndex = bracedValue.text.indexOf("{") + 1
			return {
				from: bracedValue.from + braceIndex,
				options: valueCompletions(tag.name, attributeName),
			}
		}
	}

	const bareEquals = context.matchBefore(/([A-Za-z][\w-]*)=$/)
	if (bareEquals) {
		const attributeName = bareEquals.text.slice(0, -1)
		const item = catalog.find((entry) => entry.name === tag.name)
		const attribute = item?.attributes.find((entry) => entry.name === attributeName)
		const isNumeric = Boolean(
			attribute?.values?.every((value) => /^\d+$/.test(value)),
		)
		return {
			from: context.pos,
			options: valueCompletions(tag.name, attributeName).map((option) => ({
				...option,
				apply: isNumeric ? `{${option.label}}` : `"${option.label}"`,
			})),
		}
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
		}
	}

	return null
}

export const mauiAutocomplete = autocompletion({
	override: [mauiCompletionSource],
	activateOnTyping: true,
	icons: false,
})
