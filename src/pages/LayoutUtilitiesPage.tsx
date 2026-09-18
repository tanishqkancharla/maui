import { CodeBlock } from "../components/CodeBlock"
import { Prose } from "../components/Prose"
import { Text } from "../components/Text"
import { H2, H3, P } from "../components/Typography"
import { Divider, Flex, Gap, Spacer } from "../components/Utils"

export function LayoutUtilitiesPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Layout utilities</H2>
			<P>
				<code>Flex</code> and <code>Gap</code> take spacing scale steps (
				<code>1</code>–<code>16</code>), not raw pixels. Put inset on{" "}
				<code>Flex</code> with <code>padding</code> / <code>p</code>,{" "}
				<code>px</code>, <code>py</code>, <code>pt</code>, <code>pr</code>,{" "}
				<code>pb</code>, <code>pl</code>. <code>justify</code> uses the same
				tokens as <code>flex()</code> (<code>start</code>, <code>center</code>,{" "}
				<code>end</code>, <code>between</code>, <code>around</code>,{" "}
				<code>evenly</code>). <code>background</code> applies a surface token.
				<code>Flex</code> also accepts <code>border</code>, <code>shadow</code>,
				and <code>radius</code> when it should read as a surface. Shadows
				already include a 1px ring, so do not also set <code>border</code>.
			</P>
			<Flex column padding={6}>
				<Flex row alignItems="center" px={4} py={3} border="outline" radius="md">
					<Text size="sm">Flex</Text>
					<Gap width={6} />
					<Text size="sm">Gap</Text>
					<Spacer />
					<Text size="sm">Spacer</Text>
				</Flex>
			</Flex>
			<H3>Justify</H3>
			<CodeBlock lang="tsx">{`<Flex row alignItems="center" justify="between">
  <Text size="sm">Title</Text>
  <Text size="sm" color="lowContrast">Action</Text>
</Flex>`}</CodeBlock>
			<Flex column padding={6}>
				<Flex
					row
					alignItems="center"
					justify="between"
					px={4}
					py={3}
					border="outline"
					radius="md"
				>
					<Text size="sm">Title</Text>
					<Text size="sm" color="lowContrast">
						Action
					</Text>
				</Flex>
			</Flex>
			<H3>Surface</H3>
			<CodeBlock lang="tsx">{`<Flex column gap={4} p={6} background="element" shadow="subtle" radius="lg">
  <Text size="sm">Raised group</Text>
</Flex>`}</CodeBlock>
			<Flex column padding={6}>
				<Flex
					column
					gap={4}
					p={6}
					background="element"
					shadow="subtle"
					radius="lg"
				>
					<Text size="sm">Raised group</Text>
					<Text size="sm" color="lowContrast">
						background=&quot;element&quot; with shadow=&quot;subtle&quot;
					</Text>
				</Flex>
			</Flex>
			<Divider />
		</Prose>
	)
}
