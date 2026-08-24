import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Divider, Flex, Gap, Padding, Spacer } from "../components/Utils"

export function LayoutUtilitiesPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Layout utilities</H2>
			<P>
				<code>Padding</code>, <code>Flex</code>, and <code>Gap</code> take
				spacing scale steps (<code>1</code>–<code>16</code>), not raw pixels.{" "}
				<code>Flex</code> also accepts <code>border</code>, <code>shadow</code>,{" "}
				<code>radius</code>, and <code>padding</code> when it should read as a
				surface. Shadows already include a 1px ring, so do not also set{" "}
				<code>border</code>.
			</P>
			<Padding xy={6}>
				<Flex row alignItems="center" padding={4} border="outline" radius="md">
					<Text size="sm">Flex</Text>
					<Gap width={6} />
					<Text size="sm">Gap</Text>
					<Spacer />
					<Text size="sm">Spacer</Text>
				</Flex>
			</Padding>
			<H3>Surface</H3>
			<CodeBlock lang="tsx">{`<Flex column gap={4} padding={6} shadow="subtle" radius="lg">
  <Text size="sm">Raised group</Text>
</Flex>`}</CodeBlock>
			<Padding xy={6}>
				<Flex column gap={4} padding={6} shadow="subtle" radius="lg">
					<Text size="sm">Raised group</Text>
					<Text size="sm" color="lowContrast">
						shadow=&quot;subtle&quot; includes the ring
					</Text>
				</Flex>
			</Padding>
			<Divider />
		</Prose>
	)
}
