import type { ThemeRegistration } from "shiki"

// Adapted from rsms/sublime-theme (rsms-dark), remapped to Maui gray + accent.
// JSX tags use accent (teal light / violet dark); attributes are gray;
// strings are blue in light and green in dark so they don't collide with teal.
export const mauiSyntaxColors = {
	dark: {
		foreground: "#eeeeee", // --gray-12
		foregroundMuted: "#b4b4b4", // --gray-11
		unimportant: "#6e6e6e", // --gray-9
		comment: "#6e6e6e",
		keyword: "#8b8fd8", // desaturated accent
		operator: "#d9a066", // rsms orange, softened
		type: "#ecebe8",
		typeRef: "#e8c9a0", // rsms typeRef, warm
		tag: "#baa7ff", // --accent-11 (violet)
		attribute: "#b4b4b4", // --gray-11
		string: "#3dd68c", // --green-11
		stringBright: "#7ee7b0",
		function: "#ecebe8",
		meta: "#8a9f94",
		accent: "#a8a6f0", // --accent-color / brackets
		invalid: "#e85d4f",
	},
	light: {
		foreground: "#202020",
		foregroundMuted: "#646464",
		unimportant: "#838383",
		comment: "#646464",
		keyword: "#3e63dd",
		operator: "#a15c00",
		type: "#272962",
		typeRef: "#8a4b08",
		tag: "#008573", // --accent-11 (teal)
		attribute: "#646464", // --gray-11
		string: "#0d74ce", // --blue-11
		stringBright: "#0588f0", // --blue-10
		function: "#202020",
		meta: "#66736d",
		accent: "#3e63dd",
		invalid: "#ce2c31",
	},
} as const

type ThemeColors = (typeof mauiSyntaxColors)[keyof typeof mauiSyntaxColors]

function createThemeTokens(colors: ThemeColors) {
	return [
		{ role: "Foreground", sublime: "fgBase", color: colors.foreground },
		{ role: "Comment", sublime: "comment", color: colors.comment },
		{ role: "Keyword", sublime: "keyword", color: colors.keyword },
		{ role: "Operator", sublime: "keyword.operator", color: colors.operator },
		{ role: "Type", sublime: "entity.name.type", color: colors.type },
		{ role: "Type reference", sublime: "support.type", color: colors.typeRef },
		{
			role: "Tag / component",
			sublime: "entity.name.tag",
			color: colors.tag,
		},
		{
			role: "Attribute",
			sublime: "entity.other.attribute-name",
			color: colors.attribute,
		},
		{
			role: "String / constant",
			sublime: "string, constant",
			color: colors.string,
		},
		{
			role: "Function",
			sublime: "entity.name.function",
			color: colors.function,
		},
		{ role: "Punctuation", sublime: "punctuation", color: colors.unimportant },
		{ role: "Bracket / accent", sublime: "brackets", color: colors.accent },
	] as const
}

export const mauiThemeTokens = {
	dark: createThemeTokens(mauiSyntaxColors.dark),
	light: createThemeTokens(mauiSyntaxColors.light),
} as const

function createMauiShikiTheme(
	name: string,
	type: "light" | "dark",
	colors: ThemeColors,
): ThemeRegistration {
	return {
		name,
		type,
		colors: {
			"editor.background": "#00000000",
			"editor.foreground": colors.foreground,
		},
		tokenColors: [
			{
				settings: {
					foreground: colors.foreground,
				},
			},
			{
				scope: ["comment", "punctuation.definition.comment"],
				settings: { foreground: colors.comment, fontStyle: "italic" },
			},
			{
				scope: ["meta.keyword", "meta.annotation"],
				settings: { foreground: colors.meta },
			},
			{
				scope: [
					"punctuation.separator",
					"punctuation.terminator",
					"punctuation.accessor",
					"punctuation.section",
					"keyword.operator.type.annotation",
				],
				settings: { foreground: colors.unimportant },
			},
			{
				scope: [
					"entity.name.type",
					"entity.name.class",
					"entity.name.struct",
					"entity.name.enum",
					"meta.type.declaration entity.name.type",
				],
				settings: { foreground: colors.type, fontStyle: "bold" },
			},
			{
				scope: [
					"support.type",
					"meta.type.annotation entity.name.type",
					"entity.other.inherited-class",
				],
				settings: { foreground: colors.typeRef },
			},
			{
				scope: [
					"keyword",
					"storage",
					"storage.type.keyword",
					"keyword.operator.new",
					"keyword.operator.delete",
				],
				settings: { foreground: colors.keyword },
			},
			{
				scope: ["keyword.operator"],
				settings: { foreground: colors.operator },
			},
			{
				scope: ["entity.name.function", "support.function"],
				settings: { foreground: colors.function, fontStyle: "bold" },
			},
			{
				scope: [
					"string",
					"constant",
					"string punctuation.definition",
					"constant punctuation.definition",
					"constant.numeric",
				],
				settings: { foreground: colors.string },
			},
			{
				scope: ["string constant"],
				settings: { foreground: colors.stringBright },
			},
			{
				scope: ["string variable", "variable", "variable.other"],
				settings: { foreground: colors.foregroundMuted },
			},
			{
				scope: ["meta.tag"],
				settings: { foreground: colors.unimportant },
			},
			{
				scope: ["meta.tag entity.name", "entity.name.tag"],
				settings: { foreground: colors.tag },
			},
			{
				scope: ["meta.tag entity", "meta.tag.attributes"],
				settings: { foreground: colors.attribute },
			},
			{
				scope: ["entity.other.attribute-name"],
				settings: { foreground: colors.attribute },
			},
			{
				scope: ["punctuation.definition.tag"],
				settings: { foreground: colors.unimportant },
			},
			{
				scope: ["invalid.illegal"],
				settings: { foreground: colors.foreground, background: colors.invalid },
			},
		],
	}
}

export const mauiShikiThemeDark = createMauiShikiTheme(
	"maui-dark",
	"dark",
	mauiSyntaxColors.dark,
)
export const mauiShikiThemeLight = createMauiShikiTheme(
	"maui-light",
	"light",
	mauiSyntaxColors.light,
)
