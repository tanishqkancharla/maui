import React from "react"
import { transform } from "sucrase"
import { previewScope } from "./catalog"

export type EvaluateResult =
	| { ok: true; element: React.ReactNode }
	| { ok: false; error: string }

const scopeNames = Object.keys(previewScope)
const scopeValues = Object.values(previewScope)

function cssNameToReact(name: string): string {
	if (name.startsWith("--")) return name
	return name.replace(/-([a-z])/gi, (_, letter: string) => letter.toUpperCase())
}

export function cssTextToStyle(cssText: string): React.CSSProperties {
	const style: Record<string, string> = {}
	for (const declaration of cssText.split(";")) {
		const colon = declaration.indexOf(":")
		if (colon < 0) continue
		const property = declaration.slice(0, colon).trim()
		const value = declaration.slice(colon + 1).trim()
		if (!property || !value) continue
		style[cssNameToReact(property)] = value
	}
	return style
}

function sanitizeStyle(style: unknown): React.CSSProperties | undefined {
	if (typeof style === "string") return cssTextToStyle(style)
	if (style != null && typeof style === "object" && !Array.isArray(style)) {
		return style as React.CSSProperties
	}
	return undefined
}

function sanitizePreviewNode(node: React.ReactNode): React.ReactNode {
	if (Array.isArray(node)) {
		return node.map((child) => sanitizePreviewNode(child))
	}
	if (!React.isValidElement(node)) return node

	const props = node.props as { style?: unknown; children?: React.ReactNode }
	const next: Record<string, unknown> = {}
	let changed = false

	if ("style" in props) {
		const style = sanitizeStyle(props.style)
		if (style !== props.style) {
			next.style = style
			changed = true
		}
	}

	if (props.children != null) {
		const children = sanitizePreviewNode(props.children)
		if (children !== props.children) {
			next.children = children
			changed = true
		}
	}

	return changed ? React.cloneElement(node, next) : node
}

export function evaluateJsx(source: string): EvaluateResult {
	const trimmed = source.trim()
	if (trimmed.length === 0) {
		return { ok: true, element: null }
	}

	try {
		const wrapped = `const __el = (<React.Fragment>\n${trimmed}\n</React.Fragment>);`
		const { code } = transform(wrapped, {
			transforms: ["jsx", "typescript"],
			jsxRuntime: "classic",
			production: true,
		})
		const factory = new Function(
			"React",
			...scopeNames,
			`${code}\nreturn __el;`,
		)
		const element = sanitizePreviewNode(
			factory(React, ...scopeValues) as React.ReactNode,
		)
		return { ok: true, element }
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
