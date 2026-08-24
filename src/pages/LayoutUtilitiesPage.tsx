import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../components/Utils"
import { borderColor } from "../tokens/borders"

export function LayoutUtilitiesPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Layout utilities</H2>
			<P>
				<code>Padding</code>, <code>Flex</code>, and <code>Gap</code> take
				spacing scale steps (<code>1</code>–<code>16</code>), not raw pixels.{" "}
				<code>Flex</code> also accepts <code>border</code>, <code>shadow</code>,{" "}
				<code>radius</code>, and <code>padding</code> when it should read as a
				surface.
			</P>
			<Padding xy={6}>
				<div
					style={{
						border: `1px solid ${borderColor.outline}`,
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					<Flex row alignItems="center">
						<span>Flex</span>
						<Gap width={6} />
						<span>Gap</span>
						<Spacer />
						<span>Spacer</span>
					</Flex>
				</div>
			</Padding>
			<Divider />
		</Prose>
	)
}
