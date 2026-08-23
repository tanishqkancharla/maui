import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView } from "@codemirror/view"
import { tags as t } from "@lezer/highlight"
import { backgroundColor } from "../../tokens/background"
import { colors } from "../../tokens/colors"
import { shadowVars } from "../../tokens/shadow"

const monoFontFamily =
	'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'

export function mauiCodeMirrorTheme(dark: boolean) {
	return [
		EditorView.theme(
			{
				"&": {
					height: "100%",
					overflow: "hidden",
					backgroundColor: "transparent",
					color: colors.gray[12],
					fontSize: "13px",
				},
				"&.cm-focused": {
					outline: "none",
				},
				".cm-scroller": {
					fontFamily: monoFontFamily,
					fontVariantNumeric: "tabular-nums",
					lineHeight: "20px",
					overflow: "auto",
				},
				".cm-content": {
					caretColor: colors.gray[12],
					paddingTop: "8px",
					paddingBottom: "8px",
				},
				".cm-cursor, .cm-dropCursor": {
					borderLeftColor: colors.gray[12],
				},
				".cm-selectionBackground, .cm-content ::selection": {
					backgroundColor: colors.accentAlpha[4],
				},
				"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":
					{
						backgroundColor: colors.accentAlpha[5],
					},
				".cm-activeLine": {
					backgroundColor: colors.grayAlpha[3],
				},
				".cm-gutters": {
					backgroundColor: "transparent",
					color: colors.gray[9],
					border: "none",
				},
				".cm-activeLineGutter": {
					backgroundColor: "transparent",
					color: colors.gray[11],
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
				},
				".cm-tooltip-autocomplete ul li[aria-selected]": {
					backgroundColor: colors.accent[4],
					color: colors.gray[12],
				},
				".cm-completionInfo": {
					fontFamily: monoFontFamily,
					fontSize: "12px",
					color: colors.gray[11],
				},
				".cm-completionMatchedText": {
					textDecoration: "none",
					color: colors.accent[11],
				},
				".cm-lintRange-error": {
					backgroundImage: "none",
					textDecorationLine: "underline",
					textDecorationStyle: "wavy",
					textDecorationColor: colors.accent[9],
					textDecorationThickness: "2px",
					textUnderlineOffset: "3px",
				},
				".cm-lintPoint-error": {
					borderBottomColor: colors.accent[9],
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
					borderLeftColor: colors.accent[9],
				},
			},
			{ dark },
		),
		syntaxHighlighting(
			HighlightStyle.define([
				{ tag: t.comment, color: colors.gray[9], fontStyle: "italic" },
				{ tag: t.keyword, color: colors.accent[11] },
				{ tag: t.controlKeyword, color: colors.accent[11] },
				{ tag: t.definitionKeyword, color: colors.accent[11] },
				{ tag: t.operatorKeyword, color: colors.gray[11] },
				{ tag: t.string, color: colors.accent[11] },
				{ tag: t.attributeValue, color: colors.accent[11] },
				{ tag: t.number, color: colors.accent[11] },
				{ tag: t.bool, color: colors.accent[11] },
				{ tag: t.null, color: colors.accent[11] },
				{ tag: t.literal, color: colors.accent[11] },
				{ tag: t.content, color: colors.gray[12] },
				{
					tag: t.tagName,
					color: colors.accent[11],
					fontWeight: "600",
				},
				{
					tag: t.standard(t.tagName),
					color: colors.accent[11],
					fontWeight: "600",
				},
				{ tag: t.typeName, color: colors.accent[11] },
				{ tag: t.angleBracket, color: colors.gray[9] },
				{ tag: t.attributeName, color: colors.gray[11] },
				{ tag: t.propertyName, color: colors.gray[11] },
				{ tag: t.variableName, color: colors.gray[12] },
				{ tag: t.definition(t.variableName), color: colors.gray[12] },
				{ tag: t.function(t.variableName), color: colors.gray[12] },
				{ tag: t.punctuation, color: colors.gray[9] },
				{ tag: t.operator, color: colors.gray[10] },
				{ tag: t.bracket, color: colors.gray[9] },
				{ tag: t.squareBracket, color: colors.gray[9] },
				{ tag: t.paren, color: colors.gray[9] },
				{ tag: t.brace, color: colors.gray[9] },
				{ tag: t.meta, color: colors.gray[10] },
				{
					tag: t.invalid,
					color: colors.gray[12],
					backgroundColor: colors.accent[4],
				},
			]),
		),
	]
}
