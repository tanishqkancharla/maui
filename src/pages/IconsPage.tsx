import type React from "react"
import { Icons } from "../components/Icons"
import { Panel } from "../components/Panel"
import { Prose } from "../components/Prose"
import { H2, P } from "../components/Typography"

import { colors } from "../tokens/colors"
import { borderColor } from "../tokens/borders"
const iconEntries = Object.entries(Icons) as [
	keyof typeof Icons,
	React.ComponentType<React.SVGProps<SVGSVGElement>>,
][]

export function IconsPage() {
	return (
		<Prose style={{ marginBottom: "32px" }}>
			<H2>Icons</H2>
			<P>
				{iconEntries.length} SVG icons exported from <code>Icons</code>. Each
				icon accepts standard SVG props and uses <code>currentColor</code> for
				stroke and fill.
			</P>

			<Panel>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
						gap: "16px",
					}}
				>
					{iconEntries.map(([name, Icon]) => (
						<div
							key={name}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: "10px",
								padding: "16px 12px",
								borderRadius: "6px",
								border: `1px solid ${borderColor.outline}`,
								background: colors.gray[1],
							}}
						>
							<Icon style={{ color: colors.gray[12] }} />
							<code
								style={{
									fontSize: "11px",
									color: colors.gray[11],
									textAlign: "center",
								}}
							>
								{name}
							</code>
						</div>
					))}
				</div>
			</Panel>
		</Prose>
	)
}
