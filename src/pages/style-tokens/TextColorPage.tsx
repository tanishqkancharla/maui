import { useStyles } from "purse-styles"
import { H2, H3, H4, P } from "../../components/Typography"
import { text, type TextSize } from "../../utils/text"

export function TextColorPage() {
	return (
		<section style={{ marginBottom: "32px" }}>
			<H2>Text</H2>
			<P>
				The text token combines size, weight, and semantic color into one style
				object. Use it anywhere text needs a consistent Maui type treatment.
			</P>

			<H3>Values</H3>
			<table style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
					<tr>
						<th style={tableHeaderStyle}>Input</th>
						<th style={tableHeaderStyle}>Values</th>
						<th style={tableHeaderStyle}>Use</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={tableCellStyle}>
							<code>size</code>
						</td>
						<td style={tableCellStyle}>
							<code>"2xs" | "xs" | "sm" | "md" | "lg" | "xl"</code>
						</td>
						<td style={tableCellStyle}>T-shirt text size presets.</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>fontWeight</code>
						</td>
						<td style={tableCellStyle}>
							<code>400 | 500 | 600 | 700</code>
						</td>
						<td style={tableCellStyle}>
							Regular, medium, semibold, and bold text.
						</td>
					</tr>
					<tr>
						<td style={tableCellStyle}>
							<code>color</code>
						</td>
						<td style={tableCellStyle}>
							<code>
								"lowContrast" | "highContrast" | "accent" | "onAccent"
							</code>
						</td>
						<td style={tableCellStyle}>Semantic text colors.</td>
					</tr>
				</tbody>
			</table>

			<H3>Examples</H3>
			<H4>Sizes</H4>
			<pre style={codeBlockStyle}>
				<code>{`const tiny = text("2xs", 400, "highContrast")
const label = text("xs", 400, "highContrast")
const body = text("sm", 400, "highContrast")
const heading3 = text("md", 400, "highContrast")
const heading2 = text("lg", 400, "highContrast")
const heading1 = text("xl", 400, "highContrast")`}</code>
			</pre>
			<div className="maui-example-panel">
				<div style={{ display: "grid", gap: "12px" }}>
					{sizeExamples.map((size) => (
						<SizeExample key={size} size={size} />
					))}
				</div>
			</div>

			<H4>Weight</H4>
			<pre style={codeBlockStyle}>
				<code>{`const heading = text("lg", 600, "highContrast")`}</code>
			</pre>
			<div className="maui-example-panel">
				<HeadingExample />
			</div>

			<H4>Accent text</H4>
			<pre style={codeBlockStyle}>
				<code>{`const active = text("sm", 500, "accent")`}</code>
			</pre>
			<div className="maui-example-panel">
				<AccentExample />
			</div>
		</section>
	)
}

const sizeExamples: TextSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]

const textSizeDetails: Record<
	TextSize,
	{
		fontSize: string
		lineHeight: string
	}
> = {
	"2xs": { fontSize: "0.6875rem", lineHeight: "1.45" },
	xs: { fontSize: "0.75rem", lineHeight: "1.45" },
	sm: { fontSize: "0.8125rem", lineHeight: "1.5" },
	md: { fontSize: "0.9375rem", lineHeight: "1.5" },
	lg: { fontSize: "1.125rem", lineHeight: "1.4" },
	xl: { fontSize: "1.375rem", lineHeight: "1.3" },
}

const sampleParagraph =
	"Computers started as room-sized machines. Today, they fit in pockets and help people write, draw, learn, and work together."

function SizeExample(props: { size: TextSize }) {
	const className = useStyles(
		text(props.size, 400, "highContrast"),
		exampleCardClass,
	)

	return (
		<div style={{ display: "grid", gap: "6px" }}>
			<code style={{ color: "var(--sand-10)" }}>
				{props.size} · {textSizeDetails[props.size].fontSize} /{" "}
				{textSizeDetails[props.size].lineHeight}
			</code>
			<div className={className}>{sampleParagraph}</div>
		</div>
	)
}

function HeadingExample() {
	const className = useStyles(text("lg", 600, "highContrast"), exampleCardClass)

	return <div className={className}>Readable heading</div>
}

function AccentExample() {
	const className = useStyles(text("sm", 500, "accent"), exampleCardClass)

	return <div className={className}>Selected navigation item</div>
}

const exampleCardClass = {
	background: "var(--sand-3)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	padding: "12px",
} as const

const tableHeaderStyle = {
	color: "var(--sand-10)",
	fontSize: "11px",
	fontWeight: 500,
	letterSpacing: "0.04em",
	padding: "0 12px 8px 0",
	textAlign: "left",
	textTransform: "uppercase",
} as const
const tableCellStyle = {
	borderTop: "1px solid var(--sand-5)",
	color: "var(--sand-11)",
	padding: "10px 12px 10px 0",
	verticalAlign: "top",
} as const
const codeBlockStyle = {
	background: "var(--sand-2)",
	border: "1px solid var(--sand-6)",
	borderRadius: "6px",
	color: "var(--sand-12)",
	padding: "12px",
	overflowX: "auto",
} as const
