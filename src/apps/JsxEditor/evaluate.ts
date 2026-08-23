import React from "react"
import { transform } from "sucrase"
import { previewScope } from "./catalog"

export type EvaluateResult =
	| { ok: true; element: React.ReactNode }
	| { ok: false; error: string }

const scopeNames = Object.keys(previewScope)
const scopeValues = Object.values(previewScope)

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
		const element = factory(React, ...scopeValues) as React.ReactNode
		return { ok: true, element }
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : String(error),
		}
	}
}
