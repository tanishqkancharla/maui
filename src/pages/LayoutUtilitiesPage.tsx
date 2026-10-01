import { Code } from "../components/Code"
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
				<Code>Flex</Code> and <Code>Gap</Code> take spacing scale steps (
				<Code>1</Code>–<Code>16</Code>), not raw pixels. Put inset on{" "}
				<Code>Flex</Code> with <Code>padding</Code> / <Code>p</Code>,{" "}
				<Code>px</Code>, <Code>py</Code>, <Code>pt</Code>, <Code>pr</Code>,{" "}
				<Code>pb</Code>, <Code>pl</Code>.{" "}
				<Code>justifyContent</Code> uses the same tokens as <Code>flex()</Code>{" "}
				(<Code>start</Code>, <Code>center</Code>, <Code>end</Code>,{" "}
				<Code>between</Code>, <Code>around</Code>, <Code>evenly</Code>).{" "}
				<Code>background</Code> applies a surface token.{" "}
				<Code>Flex</Code> also accepts <Code>border</Code>, <Code>shadow</Code>,
				and <Code>radius</Code> when it should read as a surface. Shadows
				already include a 1px ring, so do not also set <Code>border</Code>.
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
			<H3>justifyContent</H3>
			<CodeBlock lang="tsx">{`<Flex row alignItems="center" justifyContent="between">
  <Text size="sm">Title</Text>
  <Text size="sm" color="lowContrast">Action</Text>
</Flex>`}</CodeBlock>
			<Flex column padding={6}>
				<Flex
					row
					alignItems="center"
					justifyContent="between"
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
