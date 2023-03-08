import CSS from "csstype"
import { createContext, useContext, useEffect, useMemo } from "react"
import { hyphenateStyleName } from "./hyphenateStyleName"
import { useMemoShallowEqual } from "./useMemoShallowEqual"

const toAlphabeticChar = (code: number) =>
	String.fromCharCode(code + (code > 25 ? 39 : 97))

const toAlphabeticName = (code: number) => {
	let name = ""
	let x

	for (x = Math.abs(code); x > 52; x = (x / 52) | 0)
		name = toAlphabeticChar(x % 52) + name

	return toAlphabeticChar(x % 52) + name
}

const toPhash = (h: number, x: string) => {
	let i = x.length
	while (i) h = (h * 33) ^ x.charCodeAt(--i)
	return h
}

export const toHash = (value: Object) =>
	toAlphabeticName(toPhash(5381, JSON.stringify(value)) >>> 0)

const PurseContext = createContext<React.RefObject<HTMLStyleElement>>({
	current: null,
})

export function PurseProvider(props: {
	children?: React.ReactNode
	styleRef: React.RefObject<HTMLStyleElement>
}) {
	return (
		<PurseContext.Provider value={props.styleRef}>
			{props.children}
		</PurseContext.Provider>
	)
}

class StyleRule {
	className: string
	compiled: string

	constructor(properties: CSS.Properties) {
		const entries = Object.entries(properties)

		const styleDeclarations = entries
			.map(([property, value]) => {
				return `${hyphenateStyleName(property)}:${value};`
			})
			.join("")

		this.className = toHash(properties)
		this.compiled = `.${this.className} {${styleDeclarations}}`
	}
}

export function createStyles(styles: CSS.Properties) {
	return new StyleRule(styles)
}

export function useStyles(styleRuleOrObject: StyleRule | CSS.Properties) {
	const context = useContext(PurseContext)
	const memoedStyleRuleOrObject = useMemoShallowEqual(styleRuleOrObject)

	const styleRule = useMemo(() => {
		if (styleRuleOrObject instanceof StyleRule) {
			return styleRuleOrObject
		} else {
			return new StyleRule(styleRuleOrObject)
		}
	}, [memoedStyleRuleOrObject])

	useEffect(() => {
		const style = context.current

		if (!style) {
			throw new Error(
				`Style element was not defined; are you missing a \`PurseProvider\`?`
			)
		}

		const styleSheet = style.sheet
		if (!styleSheet) {
			throw new Error(`Could not get style sheet of style element`)
		}

		const index = styleSheet.cssRules.length

		styleSheet.insertRule(styleRule.compiled, index)

		return () => styleSheet.deleteRule(index)
	}, [])

	return styleRule.className
}
