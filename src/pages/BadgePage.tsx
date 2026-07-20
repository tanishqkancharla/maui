import { Badge } from "../components/Badge"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, H3, P } from "../components/Typography"
import { Flex } from "../components/Utils"

import { colors } from "../tokens/colors"
export function BadgePage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Badge</H2>
			<P>
				Badges display compact counts or short status labels. Numeric content uses
				tabular figures to remain stable as values change.
			</P>

			<H3>Examples</H3>
			<Panel>
				<Flex row alignItems="center" gap={12}>
					<Badge>1</Badge>
					<Badge>12</Badge>
					<Badge>999+</Badge>
					<Badge>New</Badge>
					<Badge>Beta</Badge>
				</Flex>
			</Panel>

			<H3>Custom color</H3>
			<Panel>
				<Badge
					style={{
						backgroundColor: colors.accent[4],
						color: colors.accent[11],
					}}
				>
					Featured
				</Badge>
			</Panel>
		</Prose>
	)
}
