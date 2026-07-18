import React from "react"
import { FuzzyMatch } from "../utils/fuzzyMatch"
import { colors } from "../tokens/colors"

export function FuzzyString(props: { match: FuzzyMatch }) {
	const { match } = props

	return (
		<>
			{match.map((item, i) => {
				if ("match" in item) {
					return (
						<span style={{ color: colors.accent[11] }} key={i}>
							{item.match}
						</span>
					)
				} else {
					return <span key={i}>{item.skip}</span>
				}
			})}
		</>
	)
}
