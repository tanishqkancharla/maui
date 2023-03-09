import CSSType from "csstype"
import { prefix } from "inline-style-prefixer"
import { entries, mapValues } from "lodash"
import { useInsertionEffect } from "react"
import { hashObject } from "./hashObject"
import { hyphenateStyleName } from "./hyphenateStyleName"

type NoPseudosCSSProperties = CSSType.Properties

export type CSSProperties = NoPseudosCSSProperties & {
	[Key in CSSType.SimplePseudos]?: NoPseudosCSSProperties
}

// const PurseContext = createContext<HTMLStyleElement | undefined>(undefined)

export type Styler = (
	...stylesOrClassnames: (CSSProperties | string)[]
) => string

export type StylingApi = {
	addStyleRule: (className: string, styleRule: string) => void
}

export function createDOMStyler() {
	const styleElement = document.createElement("style")
	document.head.appendChild(styleElement)
	// styleElement.addEventListener("")
	const styleSheet = styleElement.sheet
	if (!styleSheet) {
		throw new Error(`Could not get style sheet of style element`)
	}

	const styleApi: StylingApi = {
		addStyleRule(className, styleRule) {
			if (styleRule === "") return

			styleSheet.insertRule(styleRule, styleSheet.cssRules.length)
			// Need to add a destructor here, it's tricky because the index is changing if we delete
		},
	}

	const style = createStyler(styleApi)

	return { style }
}

export function createInMemoryStyler() {
	const styleMap = new Map<string, string>()

	const styleApi: StylingApi = {
		addStyleRule(className, styleRule) {
			styleMap.set(className, styleRule)

			return () => styleMap.delete(className)
		},
	}

	const style = createStyler(styleApi)

	return { style, styleMap }
}

export function useInsertStyleElement(styleElement: HTMLStyleElement) {
	useInsertionEffect(() => {
		document.head.appendChild(styleElement)
		return () => {
			document.head.removeChild(styleElement)
		}
	}, [])
}

// export function PurseProvider(props: {
// 	children?: React.ReactNode
// 	styleElement: HTMLStyleElement
// }) {
// 	const { styleElement } = props

// 	useInsertionEffect(() => {
// 		document.head.appendChild(styleElement)
// 		return () => {
// 			document.head.removeChild(styleElement)
// 		}
// 	}, [])

// 	return (
// 		<PurseContext.Provider value={styleElement}>
// 			{props.children}
// 		</PurseContext.Provider>
// 	)
// }

// const __style__ = Symbol("Style Rule")

// type StyleRule = {
// 	__style__: typeof __style__
// 	className: string
// 	compiled: string
// }

function compileDeclarations(declarations: NoPseudosCSSProperties) {
	return entries(prefix(declarations))
		.map(([property, value]) => {
			return `${hyphenateStyleName(property)}:${value};`
		})
		.join("")
}

function groupEntriesBy<K extends string | number | symbol, V>(
	obj: Record<K, V>,
	predicate: (key: K, value: V) => string
): Record<string, Record<K, V>> {
	const groupedEntries: Record<string, any> = {}

	for (const key in obj) {
		const value = obj[key]
		const group = predicate(key, value)

		if (group in groupedEntries) {
			groupedEntries[group][key] = value
		} else {
			console.log({ group, key, value })
			groupedEntries[group] = { [key]: value }
		}
	}

	return groupedEntries
}

function isObjectEmpty(obj: {}): boolean {
	return Object.keys(obj).length === 0
}

function compileStyles(styles: CSSProperties) {
	const styleDeclarationsBySelector: Record<string, any> = { "": {} }

	for (const propertyOrSelector in styles) {
		if (propertyOrSelector.startsWith(":")) {
			const selector = propertyOrSelector as CSSType.SimplePseudos
			styleDeclarationsBySelector[selector] = styles[selector]
		} else {
			const property = propertyOrSelector as keyof NoPseudosCSSProperties
			const value = (styles as any)[property]

			styleDeclarationsBySelector[""][property] = value
		}
	}

	for (const selector in styleDeclarationsBySelector) {
		const declarations = styleDeclarationsBySelector[selector]
		if (declarations && isObjectEmpty(declarations)) {
			delete styleDeclarationsBySelector[selector]
		}
	}

	const compiledStyleDeclarationsBySelector = mapValues(
		styleDeclarationsBySelector,
		compileDeclarations
	) as any

	const className = hashObject(compiledStyleDeclarationsBySelector)
	const styleRules = entries(compiledStyleDeclarationsBySelector).map(
		([simpleSelector, styles]) => {
			return `.${className}${simpleSelector}{${styles}}`
		}
	)

	return { styleRules, className }
}

function createStyler(styleApi: StylingApi) {
	const style: Styler = (...stylesOrClassnames) => {
		const classNames: string[] = []

		for (const stylesOrClassname of stylesOrClassnames) {
			if (typeof stylesOrClassname === "string") {
				classNames.push(stylesOrClassname)
			} else {
				const { styleRules, className } = compileStyles(stylesOrClassname)
				for (const styleRule of styleRules) {
					styleApi.addStyleRule(className, styleRule)
				}

				classNames.push(className)
			}
		}

		return classNames.join(" ")
	}

	return style
}
// function isStyleRule(obj: any): obj is StyleRule {
// 	return obj["__style__"] === __style__
// }

// function coerceToStyleRule(
// 	styleRuleOrObject: StyleRule | CSSProperties
// ): StyleRule {
// 	if (isStyleRule(styleRuleOrObject)) {
// 		return styleRuleOrObject
// 	} else {
// 		return createStyles(styleRuleOrObject as CSSProperties)
// 	}
// }

// function useMemoedStyles(
// 	styleRulesOrObjects: (StyleRule | CSSProperties)[]
// ): StyleRule[] {
// 	const ref = useRef(styleRulesOrObjects)

// 	// Depth 2 b/c top level object is always array
// 	if (!isEqualToDepth(ref.current, styleRulesOrObjects, 2)) {
// 		ref.current = styleRulesOrObjects
// 	}

// 	const memoedStyles = useMemo(() => {
// 		return ref.current.map(coerceToStyleRule)
// 	}, [ref.current])

// 	return memoedStyles
// }

// export function useStyles(
// 	...styleRulesOrObjects: (StyleRule | CSSProperties)[]
// ) {
// 	const context = useContext(PurseContext)
// 	const memoedStyleRules = useMemoedStyles(styleRulesOrObjects)

// 	useEffect(() => {
// 		const style = context

// 		if (!style) {
// 			throw new Error(
// 				`Style element was not defined; are you missing a \`PurseProvider\`?`
// 			)
// 		}

// 		const styleSheet = style.sheet
// 		if (!styleSheet) {
// 			throw new Error(`Could not get style sheet of style element`)
// 		}

// 		for (const styleRule of memoedStyleRules) {
// 			styleSheet.insertRule(styleRule.compiled, styleSheet.cssRules.length)
// 		}

// 		// TODO: Need to return but it's difficult to remove rules b/c it messes up the index for others.
// 		// Need to store the indices in a store and update correctly when things are deleted.

// 		// return () => styleSheet.replace
// 	}, [memoedStyleRules])

// 	const className = useMemo(() => {
// 		return memoedStyleRules.map((styleRule) => styleRule.className).join(" ")
// 	}, [memoedStyleRules])

// 	return className
// }
