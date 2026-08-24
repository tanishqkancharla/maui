import { bracketMatching, syntaxTree, type MatchResult } from "@codemirror/language"
import type { EditorState, Range } from "@codemirror/state"
import {
	Decoration,
	EditorView,
	ViewPlugin,
	type ViewUpdate,
} from "@codemirror/view"
import type { SyntaxNode } from "@lezer/common"

const matchingBracketMark = Decoration.mark({ class: "cm-matchingBracket" })
const nonmatchingBracketMark = Decoration.mark({ class: "cm-nonmatchingBracket" })
const matchingTagMark = Decoration.mark({ class: "cm-matchingTag" })

const tagNodeNames = new Set([
	"JSXOpenTag",
	"JSXCloseTag",
	"JSXFragmentTag",
	"JSXSelfClosingTag",
])

function isAngleBracketToken(text: string) {
	return text === "<" || text === ">" || text === "</" || text === "/>"
}

function renderMatch(
	match: MatchResult,
	state: EditorState,
): readonly Range<Decoration>[] {
	const start = state.doc.sliceString(match.start.from, match.start.to)
	if (isAngleBracketToken(start)) return []
	if (match.end) {
		const end = state.doc.sliceString(match.end.from, match.end.to)
		if (isAngleBracketToken(end)) return []
	}

	const mark = match.matched ? matchingBracketMark : nonmatchingBracketMark
	const decorations = [mark.range(match.start.from, match.start.to)]
	if (match.end) {
		decorations.push(mark.range(match.end.from, match.end.to))
	}
	return decorations
}

function tagNodeAt(state: EditorState, pos: number): SyntaxNode | null {
	const tree = syntaxTree(state)
	return tagFromNode(tree.resolveInner(pos, -1)) ?? tagFromNode(tree.resolveInner(pos, 1))
}

function tagFromNode(node: SyntaxNode | null): SyntaxNode | null {
	for (let current = node; current; current = current.parent) {
		if (tagNodeNames.has(current.name)) return current
		if (current.name === "JSXElement") return null
	}
	return null
}

function matchingTagPair(tag: SyntaxNode): { open: SyntaxNode; close: SyntaxNode } | null {
	if (tag.name === "JSXSelfClosingTag") return null
	const element = tag.parent
	if (!element || element.name !== "JSXElement") return null

	let open: SyntaxNode | null = null
	let close: SyntaxNode | null = null
	for (let child = element.firstChild; child; child = child.nextSibling) {
		if (child.name === "JSXOpenTag" || child.name === "JSXFragmentTag") {
			open = child
		} else if (child.name === "JSXCloseTag") {
			close = child
		}
	}

	if (!open || !close) return null
	return { open, close }
}

function matchingTagDecorations(state: EditorState) {
	if (!state.selection.main.empty) return Decoration.none
	const tag = tagNodeAt(state, state.selection.main.head)
	if (!tag) return Decoration.none
	const pair = matchingTagPair(tag)
	if (!pair) return Decoration.none
	return Decoration.set([
		matchingTagMark.range(pair.open.from, pair.open.to),
		matchingTagMark.range(pair.close.from, pair.close.to),
	])
}

const jsxTagMatching = ViewPlugin.fromClass(
	class {
		decorations = Decoration.none

		constructor(view: EditorView) {
			this.decorations = matchingTagDecorations(view.state)
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.selectionSet) {
				this.decorations = matchingTagDecorations(update.state)
			}
		}
	},
	{ decorations: (plugin) => plugin.decorations },
)

export const mauiBracketMatching = [
	bracketMatching({ renderMatch }),
	jsxTagMatching,
]
