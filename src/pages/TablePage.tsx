import { Code } from "../components/Code"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/Table"
import { H2, H3, P } from "../components/Typography"

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
]

export function TablePage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Table</H2>
			<P>
				A data table with horizontal dividers and cell padding. Columns live
				directly in <Code>TableHeader</Code>. Use <Code>align</Code> on{" "}
				<Code>TableHead</Code> and <Code>TableCell</Code> instead of text
				alignment classes.
			</P>

			<H3>Invoices</H3>
			<Panel>
				<figure style={{ margin: 0, width: "100%" }}>
					<Table aria-label="Invoices">
						<TableHeader>
							<TableHead isRowHeader>Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead align="end">Amount</TableHead>
						</TableHeader>
						<TableBody>
							{invoices.map((invoice) => (
								<TableRow key={invoice.invoice} id={invoice.invoice}>
									<TableCell>{invoice.invoice}</TableCell>
									<TableCell>{invoice.paymentStatus}</TableCell>
									<TableCell>{invoice.paymentMethod}</TableCell>
									<TableCell align="end">{invoice.totalAmount}</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow id="total">
								<TableCell colSpan={3}>Total</TableCell>
								<TableCell align="end">$2,500.00</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
					<TableCaption>A list of your recent invoices.</TableCaption>
				</figure>
			</Panel>

			<H3>Empty</H3>
			<P>
				Tables need an empty composition. <Code>TableBody</Code> renders “No
				results.” when there are no rows; pass{" "}
				<Code>renderEmptyState</Code> to replace it.
			</P>
			<Panel>
				<Table aria-label="Empty invoices">
					<TableHeader>
						<TableHead isRowHeader>Invoice</TableHead>
						<TableHead>Status</TableHead>
						<TableHead align="end">Amount</TableHead>
					</TableHeader>
					<TableBody />
				</Table>
			</Panel>
		</Prose>
	)
}
