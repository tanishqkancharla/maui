import type { ReactNode } from "react"
import {
	Cell as AriaCell,
	Checkbox as AriaCheckbox,
	Collection,
	Column as AriaColumn,
	Row as AriaRow,
	Table as AriaTable,
	TableBody as AriaTableBody,
	TableFooter as AriaTableFooter,
	TableHeader as AriaTableHeader,
	useTableOptions,
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
import { flex } from "../tokens/layout"
import { radius } from "../tokens/radius"
import { shadow, shadowVars } from "../tokens/shadow"
import { spacing } from "../tokens/spacing"
import { text } from "../tokens/text"
import { memoize } from "../utils/memoize"

export type TableAlign = "start" | "center" | "end"

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

const tableHeadClass = memoize((align: TableAlign = "start") =>
	style(
		text({ size: "xs", fontWeight: 500, color: "lowContrast" }),
		spacing.padding({ x: 4, y: 3 }),
		border(["bottom"], "border"),
		focusRing("&[data-focus-visible]"),
		{
			textAlign: align,
			verticalAlign: "middle",
			whiteSpace: "nowrap",
			outline: "none",
			fontWeight: 500,
		},
	),
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
			backgroundColor: colors.gray[2],
		},
		"& tr:first-child td": {
			borderTop: `1px solid ${borderColor.border}`,
		},
		"& tr[data-hovered] td, & tr[data-selected] td": {
			backgroundColor: colors.gray[2],
		},
	},
)

const tableRowClass = style({
	outline: "none",
	cursor: "default",
	"&[data-selection-mode][data-hovered] td": {
		backgroundColor: backgroundColor.elementHover,
	},
	"&[data-selection-mode][data-selected] td": {
		backgroundColor: backgroundColor.elementActive,
	},
	"&[data-disabled]": {
		color: colors.gray[8],
	},
})

const tableCellClass = memoize((align: TableAlign = "start") =>
	style(
		text({ size: "sm", fontWeight: 400, color: "highContrast" }),
		spacing.padding({ x: 4, y: 3 }),
		border(["bottom"], "border"),
		focusRing("&[data-focus-visible]"),
		{
			textAlign: align,
			verticalAlign: "middle",
			outline: "none",
			'&[role="rowheader"]': {
				fontWeight: 500,
			},
		},
	),
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

const tableSelectionCheckboxClass = style(
	flex({ align: "center", justify: "center" }),
	focusRing("&[data-focus-visible] .checkbox-toggle", shadowVars.subtle),
	{
		position: "relative",
		width: "fit-content",
		cursor: "default",
		"& input": {
			position: "absolute",
			width: "1px",
			height: "1px",
			padding: 0,
			margin: "-1px",
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			border: 0,
		},
		"&[data-hovered] .checkbox-toggle": {
			backgroundColor: backgroundColor.elementHover,
		},
		"&[data-selected] .checkbox-toggle, &[data-indeterminate] .checkbox-toggle":
			{
				backgroundColor: colors.accent[9],
			},
		"&[data-selected] .checkbox-icon, &[data-indeterminate] .checkbox-icon": {
			opacity: 1,
			transform: "scale(1)",
		},
	},
)

const tableSelectionToggleClass = style(
	flex({ align: "center", justify: "center" }),
	radius["2xs"],
	shadow.subtle,
	{
		pointerEvents: "none",
		width: "14px",
		height: "14px",
		backgroundColor: backgroundColor.element,
	},
)

const tableSelectionIconClass = style({
	width: "10px",
	height: "10px",
	paddingTop: "0.5px",
	paddingLeft: "0.5px",
	fill: colors.gray[3],
	opacity: 0,
	transform: "scale(0)",
})

function useMultipleSelectionCheckboxes() {
	const { selectionMode, selectionBehavior } = useTableOptions()
	return selectionMode === "multiple" && selectionBehavior === "toggle"
}

function TableSelectionCheckbox() {
	const className = useStyles(tableSelectionCheckboxClass)
	const toggleClassName = useStyles(tableSelectionToggleClass)
	const iconClassName = useStyles(tableSelectionIconClass)

	return (
		<AriaCheckbox slot="selection" className={className}>
			{({ isIndeterminate }) => (
				<span className={`${toggleClassName} checkbox-toggle`}>
					<svg
						focusable="false"
						aria-hidden="true"
						className={`${iconClassName} checkbox-icon`}
						viewBox="0 0 11 11"
					>
						{isIndeterminate ? (
							<rect x="2" y="4.75" width="7" height="1.5" rx="0.5" />
						) : (
							<path d="M3.788 9A.999.999 0 0 1 3 8.615l-2.288-3a1 1 0 1 1 1.576-1.23l1.5 1.991 3.924-4.991a1 1 0 1 1 1.576 1.23l-4.712 6A.999.999 0 0 1 3.788 9z" />
						)}
					</svg>
				</span>
			)}
		</AriaCheckbox>
	)
}

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

export function TableHeader<T extends object = object>({
	children,
	columns,
	...props
}: TableHeaderProps<T>) {
	const className = useStyles(tableHeaderClass)
	const showSelectionCheckboxes = useMultipleSelectionCheckboxes()

	return (
		<AriaTableHeader {...props} className={className}>
			{showSelectionCheckboxes && (
				<TableHead
					align="center"
					width={32}
					minWidth={32}
					style={{ width: 32, minWidth: 32 }}
				>
					<TableSelectionCheckbox />
				</TableHead>
			)}
			{typeof children === "function" ? (
				<Collection items={columns}>{children}</Collection>
			) : (
				children
			)}
		</AriaTableHeader>
	)
}

export interface TableHeadProps extends Omit<AriaColumnProps, "className"> {
	align?: TableAlign
}

export function TableHead({ align = "start", ...props }: TableHeadProps) {
	const className = useStyles(tableHeadClass(align))

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

export function TableRow<T extends object = object>({
	children,
	columns,
	...props
}: TableRowProps<T>) {
	const className = useStyles(tableRowClass)
	const showSelectionCheckboxes = useMultipleSelectionCheckboxes()

	return (
		<AriaRow {...props} className={className}>
			{showSelectionCheckboxes && (
				<TableCell align="center">
					<TableSelectionCheckbox />
				</TableCell>
			)}
			{typeof children === "function" ? (
				<Collection items={columns}>{children}</Collection>
			) : (
				children
			)}
		</AriaRow>
	)
}

export interface TableCellProps extends Omit<AriaCellProps, "className"> {
	align?: TableAlign
}

export function TableCell({ align = "start", ...props }: TableCellProps) {
	const className = useStyles(tableCellClass(align))

	return <AriaCell {...props} className={className} />
}

export function TableCaption(props: { children: ReactNode }) {
	const className = useStyles(tableCaptionClass)

	return <div className={className}>{props.children}</div>
}
