import { describe, expect, it } from "vitest"
import { createInMemoryStyler } from "./purse"

describe("Purse", () => {
	it("Works", () => {
		const { style, styleMap } = createInMemoryStyler()

		const className = style({
			accentColor: "blue",
			borderColor: "blue",
		})

		expect(styleMap.get(className)).toBe(
			`.${className}{accent-color:blue;border-color:blue;}`
		)
	})

	it.skip("Inserts into given style element correctly")
	it.skip("Works if you pass style rule or object to useStyles")
	it.skip("Works if you pass multiple style rule or object to useStyles")
	it.skip("Inserts browser prefixes")
	it.skip("Works with simple pseudo selectors")
})
