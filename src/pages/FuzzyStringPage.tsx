import { useStyles } from "purse-styles"
import { useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/Table"
import { FuzzyString } from "../components/FuzzyString"
import { SearchField } from "../components/Input"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { text } from "../tokens/text"
import { fuzzyMatch, fuzzyMatchScore } from "../utils/fuzzyMatch"

const staticExamples = [
	{ query: "fz", text: "FuzzyString" },
	{ query: "em", text: "Email client" },
	{ query: "sh", text: "Shadows" },
	{ query: "typ", text: "Typography" },
	{ query: "abc", text: "abc bcd" },
] as const

const searchableItems = [
	"Background color",
	"Buttons",
	"Checkbox",
	"Corner radius",
	"Email client",
	"Focus ring",
	"Form controls",
	"FuzzyString",
	"Icons",
	"Layout utilities",
	"Menu",
	"Motion",
	"Shadows",
	"Sizing",
	"Spacing",
	"Switch",
	"Text",
	"Typography",
]

export function FuzzyStringPage() {
	const [query, setQuery] = useState("em")
	const resultTextClass = useStyles(text("md", 400, "highContrast"))

	const filteredItems = useMemo(() => {
		if (!query) {
			return searchableItems.map((text) => ({ text, match: undefined }))
		}

		return searchableItems
			.map((text) => ({
				text,
				match: fuzzyMatch(query, text),
			}))
			.filter((item) => item.match !== undefined)
			.sort(
				(a, b) => fuzzyMatchScore(query, b.text) - fuzzyMatchScore(query, a.text),
			)
	}, [query])

	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>FuzzyString</H2>
			<P>
				Matched segments use medium weight (500); skipped characters use muted
				segments.
			</P>

			<H3>Examples</H3>
			<div className="maui-example-panel">
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Query</TableHeaderCell>
							<TableHeaderCell>Text</TableHeaderCell>
							<TableHeaderCell>Result</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{staticExamples.map((example) => {
							const match = fuzzyMatch(example.query, example.text)
							return (
								<TableRow key={`${example.query}-${example.text}`}>
									<TableCell>
										<code>{example.query}</code>
									</TableCell>
									<TableCell>
										<code>{example.text}</code>
									</TableCell>
									<TableCell>
										{match ? <FuzzyString match={match} /> : "—"}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>

			<H3>Interactive search</H3>
			<P>Type a query to filter the list below and see live highlighting.</P>
			<div style={{ maxWidth: "280px", marginBottom: "16px" }}>
				<SearchField
					aria-label="Fuzzy search demo"
					placeholder="Search items…"
					value={query}
					onChange={setQuery}
				/>
			</div>
			<div className="maui-example-panel">
				<ul
					style={{
						listStyle: "none",
						margin: 0,
						padding: 0,
						display: "flex",
						flexDirection: "column",
						gap: "4px",
					}}
				>
					{filteredItems.length === 0 ? (
						<li
							className={resultTextClass}
							style={{ color: "var(--gray-10)", padding: "8px 12px" }}
						>
							No matches
						</li>
					) : (
						filteredItems.map((item) => (
							<li
								key={item.text}
								className={resultTextClass}
								style={{
									padding: "8px 12px",
									borderRadius: "4px",
									background: "var(--gray-1)",
									border: "1px solid var(--border)",
								}}
							>
								{item.match ? (
									<FuzzyString match={item.match} />
								) : (
									item.text
								)}
							</li>
						))
					)}
				</ul>
			</div>
		</Prose>
	)
}

