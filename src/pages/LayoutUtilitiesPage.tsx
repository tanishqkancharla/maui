import { Prose } from "../components/Prose"
import { H2 } from "../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../components/Utils"

export function LayoutUtilitiesPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Layout utilities</H2>
			<Padding xy={12}>
				<div
					style={{
						border: "1px solid var(--outline)",
						borderRadius: "6px",
						padding: "12px",
					}}
				>
					<Flex row alignItems="center">
						<span>Flex</span>
						<Gap width={12} />
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
