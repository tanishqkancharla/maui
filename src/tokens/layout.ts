import { style } from "purse-styles"
import { memoize } from "../utils/memoize"

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

export const flex = memoize((options: FlexOptions = {}) =>
	style({
		display: "flex",
		flexDirection: options.direction ?? "row",
		alignItems: options.align ? alignValues[options.align] : undefined,
		justifyContent: options.justify
			? justifyValues[options.justify]
			: undefined,
		gap: options.gap === undefined ? undefined : spaceValues[options.gap],
		flexWrap: options.wrap ? "wrap" : undefined,
	}),
)

export const flexItem = memoize((options: FlexItemOptions = {}) =>
	style({
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
	}),
)

export const grid = memoize((options: GridOptions = {}) =>
	style({
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
	}),
)

export const gridItem = memoize((options: GridItemOptions = {}) =>
	style({
		gridArea: options.area,
		gridColumn:
			options.span === "full"
				? "1 / -1"
				: typeof options.span === "number"
					? `span ${options.span}`
					: undefined,
		alignSelf: options.align ? alignValues[options.align] : undefined,
		justifySelf: options.justify ? alignValues[options.justify] : undefined,
	}),
)
