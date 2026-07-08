import { style, useStyles } from "purse-styles"
import type React from "react"
import { border } from "../tokens/borders"
import { text } from "../tokens/text"
import { labelText } from "./Typography"

const tableClass = style({
	borderCollapse: "collapse",
	width: "100%",
})

const tableHeaderCellClass = style(labelText, {
	padding: "0 12px 8px 0",
	textAlign: "left",
	verticalAlign: "bottom",
})

const tableBodyCellClass = style(text("sm", 400, "lowContrast"), border(["top"], "border"), {
	padding: "10px 12px 10px 0",
	verticalAlign: "top",
})

export function Table(props: { children: React.ReactNode }) {
	const className = useStyles(tableClass)

	return <table className={className}>{props.children}</table>
}

export function TableHead(props: { children: React.ReactNode }) {
	return <thead>{props.children}</thead>
}

export function TableBody(props: { children: React.ReactNode }) {
	return <tbody>{props.children}</tbody>
}

export function TableRow(props: { children: React.ReactNode }) {
	return <tr>{props.children}</tr>
}

export function TableHeaderCell(props: { children: React.ReactNode }) {
	const className = useStyles(tableHeaderCellClass)

	return <th className={className}>{props.children}</th>
}

const tableBodyCellMiddleClass = style({
	verticalAlign: "middle",
})

export function TableCell(props: {
	children: React.ReactNode
	align?: "top" | "middle"
}) {
	const className = useStyles(
		tableBodyCellClass,
		props.align === "middle" && tableBodyCellMiddleClass,
	)

	return <td className={className}>{props.children}</td>
}
