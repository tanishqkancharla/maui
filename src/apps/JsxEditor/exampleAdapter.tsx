import type { ReactNode } from "react"
import type { DesignSystemApi } from "./DesignSystemApi"

const lightSyntax = {
	foreground: "#202020",
	foregroundMuted: "#646464",
	unimportant: "#838383",
	comment: "#646464",
	keyword: "#3e63dd",
	operator: "#a15c00",
	type: "#272962",
	typeRef: "#8a4b08",
	tag: "#008573",
	attribute: "#646464",
	string: "#0d74ce",
	stringBright: "#0588f0",
	function: "#202020",
	meta: "#66736d",
	accent: "#3e63dd",
	invalid: "#ce2c31",
} as const

/**
 * Minimal adapter for hosts that are not Maui. Copy this and replace
 * `catalog` / `previewScope` with your own components.
 */
export function exampleDesignSystem(
	overrides: Partial<DesignSystemApi> = {},
): DesignSystemApi {
	return {
		catalog: [
			{
				name: "button",
				info: "Native button",
				html: true,
				attributes: [{ name: "type", values: ["button", "submit"] }],
			},
		],
		previewScope: {},
		iconNames: [],
		defaultSource: `<button type="button">Hello</button>`,
		storageKey: "jsx-editor",
		resolvedTheme: "light",
		syntax: lightSyntax,
		chrome: {
			elementBackground: "#ffffff",
			outline: "rgba(0, 0, 0, 0.1)",
			gray4: "#e0e0e0",
			gray9: "#838383",
			gray11: "#646464",
			gray12: "#202020",
			red3: "#ffe5e5",
			red6: "#f5a9a9",
			red9: "#e5484d",
			red11: "#ce2c31",
			accent4: "#d4e4ff",
			accentAlpha3: "rgba(62, 99, 221, 0.12)",
			accentAlpha4: "rgba(62, 99, 221, 0.18)",
			accentAlpha5: "rgba(62, 99, 221, 0.28)",
			accent11: "#3e63dd",
			radiusLg: "8px",
			shadowMedium: "rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.06) 0px 6px 6px -3px",
			monoFontFamily:
				'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
			uiFontFamily:
				'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			space3: "6px",
			space4: "9px",
			space8: "16px",
		},
		Chrome: {
			HeaderLabel: ({ children }) => (
				<span style={{ fontSize: 12, fontWeight: 500 }}>{children}</span>
			),
			FormatButton: ({ onClick }) => (
				<button type="button" onClick={onClick}>
					Format
				</button>
			),
		},
		PreviewProviders: ({ children }: { children?: ReactNode }) => (
			<>{children}</>
		),
		...overrides,
	}
}
