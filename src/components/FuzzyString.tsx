import React from "react"
import { FuzzyMatch } from "../utils/fuzzyMatch"

export function FuzzyString(props: { match: FuzzyMatch }) {
	const { match } = props

	return (
		<>
			{match.map((item, i) => {
				if ("match" in item) {
					return (
						<span style={{ fontWeight: "bold" }} key={i}>
							{item.match}
						</span>
					)
				} else {
					return (
						<span
							style={{ color: match.length > 1 ? "var(--sand-9)" : undefined }}
							key={i}
						>
							{item.skip}
						</span>
					)
				}
			})}
		</>
	)
}
