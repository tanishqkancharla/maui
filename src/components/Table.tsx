import type { ReactNode } from "react"
import {
	Cell as AriaCell,
	Column as AriaColumn,
	Row as AriaRow,
	Table as AriaTable,
	TableBody as AriaTableBody,
	TableFooter as AriaTableFooter,
	TableHeader as AriaTableHeader,
	type CellProps as AriaCellProps,
	type ColumnProps as AriaColumnProps,
	type RowProps as AriaRowProps,
	type TableBodyProps as AriaTableBodyProps,
	type TableFooterProps as AriaTableFooterProps,
	type TableHeaderProps as AriaTableHeaderProps,
	type TableProps as AriaTableProps,
} from "react-aria-components"
import { style, useStyles } from "purse-styles"
import { backgroundColor } from "../tokens/background"
import { border, borderColor } from "../tokens/borders"
import { colors } from "../tokens/colors"
import { focusRing } from "../tokens/focusRing"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"

export type TableAlign = "start" | "center" | "end"

const alignClass = {
	start: style({ textAlign: "start" }),
	center: style({ textAlign: "center" }),
	end: style({ textAlign: "end" }),
} as const

const tableContainerClass = style({
	width: "100%",
	overflowX: "auto",
})

const tableClass = style(focusRing("&[data-focus-visible]"), {
	borderCollapse: "collapse",
	borderSpacing: 0,
	width: "100%",
	outline: "none",
})

const tableHeaderClass = style({
	outline: "none",
})

const tableHeadClass = style(
	text({ size: "xs", fontWeight: 500, color: "lowContrast" }),
	spacing.padding({ x: 4, y: 3 }),
	border(["bottom"], "border"),
	focusRing("&[data-focus-visible]"),
	{
		textAlign: "start",
		verticalAlign: "middle",
		whiteSpace: "nowrap",
		outline: "none",
		fontWeight: 500,
	},
)

const tableBodyClass = style({
	outline: "none",
	"& tr:last-child td": {
		borderBottom: "none",
	},
	"&[data-empty]": {
		textAlign: "center",
	},
})

const tableFooterClass = style(
	text({ size: "sm", fontWeight: 500, color: "highContrast" }),
	{
		backgroundColor: colors.gray[2],
		"& td": {
			borderBottom: "none",
			fontWeight: 500,
		},
		"& tr:first-child td": {
			borderTop: `1px solid ${borderColor.border}`,
		},
	},
)

const tableRowClass = style({
	outline: "none",
	cursor: "default",
	"&[data-hovered] td": {
		backgroundColor: backgroundColor.elementHover,
	},
	"&[data-selected] td": {
		backgroundColor: backgroundColor.elementActive,
	},
	"&[data-disabled]": {
		color: colors.gray[8],
	},
})

const tableCellClass = style(
	text({ size: "sm", fontWeight: 400, color: "highContrast" }),
	spacing.padding({ x: 4, y: 3 }),
	border(["bottom"], "border"),
	focusRing("&[data-focus-visible]"),
	{
		textAlign: "start",
		verticalAlign: "middle",
		outline: "none",
		'&[role="rowheader"]': {
			fontWeight: 500,
		},
	},
)

const tableCaptionClass = style(
	text({ size: "xs", fontWeight: 400, color: "lowContrast" }),
	{
		margin: 0,
		marginTop: spacing.value(4),
	},
)

const emptyStateClass = style(
	text({ size: "sm", fontWeight: 400, color: "lowContrast" }),
	spacing.padding({ x: 4, y: 8 }),
	{
		textAlign: "center",
	},
)

export interface TableProps extends Omit<AriaTableProps, "className"> {}

export function Table(props: TableProps) {
	const containerClassName = useStyles(tableContainerClass)
	const className = useStyles(tableClass)

	return (
		<div className={containerClassName}>
			<AriaTable {...props} className={className} />
		</div>
	)
}

export interface TableHeaderProps<T>
	extends Omit<AriaTableHeaderProps<T>, "className"> {}

export function TableHeader<T extends object = object>(
	props: TableHeaderProps<T>,
) {
	const className = useStyles(tableHeaderClass)

	return <AriaTableHeader {...props} className={className} />
}

export interface TableHeadProps extends Omit<AriaColumnProps, "className"> {
	align?: TableAlign
}

export function TableHead({ align, ...props }: TableHeadProps) {
	const className = useStyles(
		tableHeadClass,
		align ? alignClass[align] : undefined,
	)

	return <AriaColumn {...props} className={className} />
}

export interface TableBodyProps<T>
	extends Omit<AriaTableBodyProps<T>, "className"> {}

export function TableBody<T extends object = object>(props: TableBodyProps<T>) {
	const className = useStyles(tableBodyClass)
	const emptyClassName = useStyles(emptyStateClass)

	return (
		<AriaTableBody
			{...props}
			className={className}
			renderEmptyState={
				props.renderEmptyState ??
				(() => <div className={emptyClassName}>No results.</div>)
			}
		/>
	)
}

export interface TableFooterProps<T>
	extends Omit<AriaTableFooterProps<T>, "className"> {}

export function TableFooter<T extends object = object>(
	props: TableFooterProps<T>,
) {
	const className = useStyles(tableFooterClass)

	return <AriaTableFooter {...props} className={className} />
}

export interface TableRowProps<T>
	extends Omit<AriaRowProps<T>, "className"> {}

export function TableRow<T extends object = object>(props: TableRowProps<T>) {
	const className = useStyles(tableRowClass)

	return <AriaRow {...props} className={className} />
}

export interface TableCellProps extends Omit<AriaCellProps, "className"> {
	align?: TableAlign
}

export function TableCell({ align, ...props }: TableCellProps) {
	const className = useStyles(
		tableCellClass,
		align ? alignClass[align] : undefined,
	)

	return <AriaCell {...props} className={className} />
}

export function TableCaption(props: { children: ReactNode }) {
	const className = useStyles(tableCaptionClass)

	return <div className={className}>{props.children}</div>
}
