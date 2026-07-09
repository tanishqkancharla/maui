import { Avatar } from "../components/Avatar"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"
import type { TextSize } from "../tokens/text"

const sizes: TextSize[] = ["2xs", "xs", "sm", "md", "lg", "xl"]
const names = ["Maya Chen", "Noah Williams", "Sofia Patel", "Liam Garcia"]

export function AvatarPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Avatar</H2>
			<P>
				Avatars derive initials and a stable color from a person&apos;s name. The
				default size is <code>sm</code>.
			</P>

			<H3>Sizes</H3>
			<Panel>
				<Flex row alignItems="center" gap={16}>
					{sizes.map((size) => (
						<Flex
							key={size}
							column
							gap={6}
							alignItems="center"
							style={{ color: "var(--gray-11)" }}
						>
							<Avatar name="Maya Chen" size={size} />
							<code>{size}</code>
						</Flex>
					))}
				</Flex>
			</Panel>

			<H3>Name colors</H3>
			<Panel>
				<Flex row alignItems="center" gap={20} style={{ flexWrap: "wrap" }}>
					{names.map((name) => (
						<Flex key={name} row alignItems="center" gap={8}>
							<Avatar name={name} size="lg" />
							<span>{name}</span>
						</Flex>
					))}
				</Flex>
			</Panel>
		</Prose>
	)
}
