import { style, type CSSProperties, type StyleElement } from "purse-styles"

type Space = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16
type Align = "start" | "center" | "end" | "stretch" | "baseline"
type Justify = "start" | "center" | "end" | "between" | "around" | "evenly"

type FlexOptions = {
	direction?: "row" | "column"
	align?: Align
	justify?: Justify
	gap?: Space
	wrap?: boolean
}

type FlexItemOptions = {
	size?: "hug" | "fill" | "auto"
	align?: Align
	order?: number
}

type GridOptions = {
	columns?: "one" | "two" | "three" | "autoFit" | "sidebarContent"
	align?: Align
	justify?: Justify
	gap?: Space
}

type GridItemOptions = {
	area?: "sidebar" | "content"
	span?: "full" | 1 | 2 | 3
	align?: Align
	justify?: Align
}

const spaceValues: Record<Space, string> = {
	0: "0",
	1: "2px",
	2: "4px",
	3: "6px",
	4: "9px",
	6: "12px",
	8: "16px",
	12: "24px",
	16: "32px",
}

const alignValues: Record<Align, string> = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	stretch: "stretch",
	baseline: "baseline",
}

const justifyValues: Record<Justify, string> = {
	start: "flex-start",
	center: "center",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
}

const gridColumns: Record<NonNullable<GridOptions["columns"]>, string> = {
	one: "minmax(0, 1fr)",
	two: "repeat(2, minmax(0, 1fr))",
	three: "repeat(3, minmax(0, 1fr))",
	autoFit: "repeat(auto-fit, minmax(120px, 1fr))",
	sidebarContent: "180px minmax(0, 1fr)",
}

const cache = new Map<string, StyleElement>()

function cached(name: string, options: unknown, build: () => CSSProperties) {
	const key = `${name}:${JSON.stringify(options)}`
	const cachedStyle = cache.get(key)

	if (cachedStyle) {
		return cachedStyle
	}

	const layoutStyle = style(build())
	cache.set(key, layoutStyle)
	return layoutStyle
}

export function flex(options: FlexOptions = {}) {
	return cached("flex", options, () => ({
		display: "flex",
		flexDirection: options.direction ?? "row",
		alignItems: options.align ? alignValues[options.align] : undefined,
		justifyContent: options.justify
			? justifyValues[options.justify]
			: undefined,
		gap: options.gap === undefined ? undefined : spaceValues[options.gap],
		flexWrap: options.wrap ? "wrap" : undefined,
	}))
}

export function flexItem(options: FlexItemOptions = {}) {
	return cached("flexItem", options, () => ({
		flex:
			options.size === "fill"
				? "1 1 0"
				: options.size === "auto"
					? "1 1 auto"
					: options.size === "hug"
						? "0 0 auto"
						: undefined,
		alignSelf: options.align ? alignValues[options.align] : undefined,
		order: options.order,
	}))
}

export function grid(options: GridOptions = {}) {
	return cached("grid", options, () => ({
		display: "grid",
		gridTemplateColumns: options.columns
			? gridColumns[options.columns]
			: undefined,
		gridTemplateAreas:
			options.columns === "sidebarContent" ? '"sidebar content"' : undefined,
		alignItems: options.align ? alignValues[options.align] : undefined,
		justifyContent: options.justify
			? justifyValues[options.justify]
			: undefined,
		gap: options.gap === undefined ? undefined : spaceValues[options.gap],
	}))
}

export function gridItem(options: GridItemOptions = {}) {
	return cached("gridItem", options, () => ({
		gridArea: options.area,
		gridColumn:
			options.span === "full"
				? "1 / -1"
				: typeof options.span === "number"
					? `span ${options.span}`
					: undefined,
		alignSelf: options.align ? alignValues[options.align] : undefined,
		justifySelf: options.justify ? alignValues[options.justify] : undefined,
	}))
}
