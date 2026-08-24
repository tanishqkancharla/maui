import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView } from "@codemirror/view"
import { tags as t } from "@lezer/highlight"
import { backgroundColor } from "../../tokens/background"
import { colors } from "../../tokens/colors"
import { shadowVars } from "../../tokens/shadow"
import { monoFontFamily } from "../../tokens/text"
import { mauiSyntaxColors } from "../../utils/mauiShikiTheme"

export type JsxHighlightColors = {
	tagName: string
	attributeName: string
	string: string
}

export function mauiCodeMirrorTheme(dark: boolean, jsx?: JsxHighlightColors) {
	const syntax = dark ? mauiSyntaxColors.dark : mauiSyntaxColors.light
	const tagName = jsx?.tagName ?? syntax.typeRef
	const attributeName = jsx?.attributeName ?? syntax.typeRef
	const string = jsx?.string ?? syntax.string

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
					fontFamily: monoFontFamily,
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
					backgroundColor: colors.accentAlpha[4],
				},
				"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":
					{
						backgroundColor: colors.accentAlpha[5],
					},
				".cm-activeLine": {
					backgroundColor: "transparent",
				},
				"&.cm-focused .cm-matchingBracket, &.cm-focused .cm-matchingTag": {
					backgroundColor: colors.accentAlpha[4],
				},
				"&.cm-focused .cm-nonmatchingBracket": {
					backgroundColor: colors.accentAlpha[3],
				},
				".cm-gutters": {
					backgroundColor: "transparent",
					color: colors.gray[9],
					border: "none",
				},
				".cm-activeLineGutter": {
					backgroundColor: "transparent",
					color: colors.gray[9],
				},
				".cm-tooltip": {
					backgroundColor: backgroundColor.element,
					color: colors.gray[12],
					border: "none",
					borderRadius: "6px",
					boxShadow: shadowVars.medium,
				},
				".cm-tooltip-autocomplete ul li": {
					fontFamily: monoFontFamily,
					fontSize: "12px",
					fontWeight: "400",
				},
				".cm-tooltip-autocomplete ul li[aria-selected]": {
					backgroundColor: colors.accent[4],
					color: colors.gray[12],
				},
				".cm-completionInfo": {
					fontFamily: monoFontFamily,
					fontSize: "12px",
					fontWeight: "400",
					color: colors.gray[11],
				},
				".cm-completionMatchedText": {
					textDecoration: "none",
					color: colors.accent[11],
					fontWeight: "400",
				},
				".cm-lintRange-error": {
					backgroundImage: "none",
					textDecorationLine: "underline",
					textDecorationStyle: "wavy",
					textDecorationColor: colors.red[9],
					textDecorationThickness: "2px",
					textUnderlineOffset: "3px",
				},
				".cm-lintPoint-error": {
					borderBottomColor: colors.red[9],
				},
				".cm-tooltip.cm-tooltip-lint": {
					backgroundColor: backgroundColor.element,
					color: colors.gray[12],
					border: "none",
					borderRadius: "6px",
					boxShadow: shadowVars.medium,
					fontSize: "12px",
				},
				".cm-diagnostic-error": {
					borderLeftColor: colors.red[9],
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
				{ tag: t.string, color: string },
				{ tag: t.attributeValue, color: string },
				{ tag: t.number, color: string },
				{ tag: t.bool, color: string },
				{ tag: t.null, color: string },
				{ tag: t.literal, color: string },
				{ tag: t.content, color: syntax.foreground },
				{ tag: t.tagName, color: tagName },
				{ tag: t.standard(t.tagName), color: tagName },
				{ tag: t.typeName, color: syntax.type },
				{ tag: t.angleBracket, color: syntax.unimportant },
				{ tag: t.attributeName, color: attributeName },
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
