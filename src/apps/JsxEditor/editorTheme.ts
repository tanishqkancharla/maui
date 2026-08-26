import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView } from "@codemirror/view"
import { tags as t } from "@lezer/highlight"
import type { EditorChromeTokens, SyntaxColors } from "./DesignSystemApi"

export function createCodeMirrorTheme(
	dark: boolean,
	chrome: EditorChromeTokens,
	syntax: SyntaxColors,
) {
	return [
		EditorView.theme(
			{
				"&": {
					height: "100%",
					overflow: "hidden",
					backgroundColor: "transparent",
					color: syntax.foreground,
					fontSize: "13px",
					fontWeight: "400",
				},
				"&.cm-focused": {
					outline: "none",
				},
				".cm-scroller": {
					fontFamily: chrome.monoFontFamily,
					fontVariantNumeric: "tabular-nums",
					fontWeight: "400",
					lineHeight: "20px",
					overflow: "auto",
				},
				".cm-content": {
					caretColor: syntax.foreground,
					paddingTop: "8px",
					paddingBottom: "8px",
					fontWeight: "400",
				},
				".cm-cursor, .cm-dropCursor": {
					borderLeftColor: syntax.foreground,
				},
				".cm-selectionBackground, .cm-content ::selection": {
					backgroundColor: chrome.accentAlpha4,
				},
				"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":
					{
						backgroundColor: chrome.accentAlpha5,
					},
				".cm-activeLine": {
					backgroundColor: "transparent",
				},
				"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-matchingTag": {
					backgroundColor: chrome.accentAlpha4,
				},
				"&.cm-focused .cm-nonmatchingBracket": {
					backgroundColor: chrome.accentAlpha3,
				},
				".cm-gutters": {
					backgroundColor: "transparent",
					color: chrome.gray9,
					border: "none",
				},
				".cm-activeLineGutter": {
					backgroundColor: "transparent",
					color: chrome.gray9,
				},
				".cm-tooltip": {
					backgroundColor: chrome.elementBackground,
					color: chrome.gray12,
					border: "none",
					borderRadius: "6px",
					boxShadow: chrome.shadowMedium,
				},
				".cm-tooltip-autocomplete ul li": {
					fontFamily: chrome.monoFontFamily,
					fontSize: "12px",
					fontWeight: "400",
				},
				".cm-tooltip-autocomplete ul li[aria-selected]": {
					backgroundColor: chrome.accent4,
					color: chrome.gray12,
				},
				".cm-completionInfo": {
					fontFamily: chrome.monoFontFamily,
					fontSize: "12px",
					fontWeight: "400",
					color: chrome.gray11,
				},
				".cm-completionMatchedText": {
					textDecoration: "none",
					color: chrome.accent11,
					fontWeight: "400",
				},
				".cm-lintRange-error": {
					backgroundImage: "none",
					textDecorationLine: "underline",
					textDecorationStyle: "wavy",
					textDecorationColor: chrome.red9,
					textDecorationThickness: "2px",
					textUnderlineOffset: "3px",
				},
				".cm-lintPoint-error": {
					borderBottomColor: chrome.red9,
				},
				".cm-tooltip.cm-tooltip-lint": {
					backgroundColor: chrome.elementBackground,
					color: chrome.gray12,
					border: "none",
					borderRadius: "6px",
					boxShadow: chrome.shadowMedium,
					fontSize: "12px",
				},
				".cm-diagnostic-error": {
					borderLeftColor: chrome.red9,
				},
			},
			{ dark },
		),
		syntaxHighlighting(
			HighlightStyle.define([
				{ tag: t.comment, color: syntax.comment, fontStyle: "italic" },
				{ tag: t.keyword, color: syntax.keyword },
				{ tag: t.controlKeyword, color: syntax.keyword },
				{ tag: t.definitionKeyword, color: syntax.keyword },
				{ tag: t.operatorKeyword, color: syntax.operator },
				{ tag: t.string, color: syntax.string },
				{ tag: t.attributeValue, color: syntax.string },
				{ tag: t.number, color: syntax.string },
				{ tag: t.bool, color: syntax.string },
				{ tag: t.null, color: syntax.string },
				{ tag: t.literal, color: syntax.string },
				{ tag: t.content, color: syntax.foreground },
				{ tag: t.tagName, color: syntax.tag },
				{ tag: t.standard(t.tagName), color: syntax.tag },
				{ tag: t.typeName, color: syntax.type },
				{ tag: t.angleBracket, color: syntax.unimportant },
				{ tag: t.attributeName, color: syntax.attribute },
				{ tag: t.propertyName, color: syntax.foregroundMuted },
				{ tag: t.variableName, color: syntax.foregroundMuted },
				{ tag: t.definition(t.variableName), color: syntax.foregroundMuted },
				{ tag: t.function(t.variableName), color: syntax.function },
				{ tag: t.punctuation, color: syntax.unimportant },
				{ tag: t.operator, color: syntax.operator },
				{ tag: t.bracket, color: syntax.accent },
				{ tag: t.squareBracket, color: syntax.unimportant },
				{ tag: t.paren, color: syntax.unimportant },
				{ tag: t.brace, color: syntax.unimportant },
				{ tag: t.meta, color: syntax.meta },
				{
					tag: t.invalid,
					color: syntax.foreground,
					backgroundColor: syntax.invalid,
				},
			]),
		),
	]
}
