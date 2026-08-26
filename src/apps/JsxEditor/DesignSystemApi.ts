import type { ReactNode } from "react"

export type AttributeCompletion = {
	name: string
	info?: string
	values?: string[]
	boolean?: boolean
	object?: boolean
}

export type CatalogComponent = {
	name: string
	info: string
	attributes: AttributeCompletion[]
	html?: boolean
	svg?: boolean
}

/** CodeMirror / Shiki-aligned syntax palette for the current or both themes. */
export type SyntaxColors = {
	foreground: string
	foregroundMuted: string
	unimportant: string
	comment: string
	keyword: string
	operator: string
	type: string
	typeRef: string
	tag: string
	attribute: string
	string: string
	stringBright: string
	function: string
	meta: string
	accent: string
	invalid: string
}

/** Raw CSS values used by the editor chrome and CodeMirror theme. */
export type EditorChromeTokens = {
	elementBackground: string
	outline: string
	gray4: string
	gray9: string
	gray11: string
	gray12: string
	red3: string
	red6: string
	red9: string
	red11: string
	accent4: string
	accentAlpha3: string
	accentAlpha4: string
	accentAlpha5: string
	accent11: string
	radiusLg: string
	shadowMedium: string
	monoFontFamily: string
	uiFontFamily: string
	space3: string
	space4: string
	space8: string
}

export type DesignSystemChrome = {
	HeaderLabel: (props: { children?: ReactNode }) => ReactNode
	FormatButton: (props: { onClick: () => void }) => ReactNode
}

/**
 * Host design-system contract for the standalone JSX playground.
 *
 * The editor evaluates user JSX against `previewScope`, autocompletes and
 * lints from `catalog`, and mounts the preview inside `PreviewProviders`
 * (a new React root, so capture theme / style context here).
 */
export type DesignSystemApi = {
	catalog: CatalogComponent[]
	previewScope: Record<string, unknown>
	iconNames: string[]
	defaultSource: string
	storageKey: string
	resolvedTheme: "light" | "dark"
	syntax: SyntaxColors
	chrome: EditorChromeTokens
	Chrome: DesignSystemChrome
	PreviewProviders: (props: { children?: ReactNode }) => ReactNode
}
