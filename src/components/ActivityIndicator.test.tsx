import { renderToStaticMarkup } from "react-dom/server"
import { PurseProvider } from "purse-styles"
import { afterAll, beforeAll, expect, it, vi } from "vitest"
import { iconSizeValues } from "../tokens/sizing"
import { ActivityIndicator } from "./ActivityIndicator"

beforeAll(() => {
	vi.stubGlobal("document", { createElement: () => ({}) })
})

afterAll(() => {
	vi.unstubAllGlobals()
})

it("uses icon scale tokens for t-shirt sizes while preserving CSS lengths and the default", () => {
	for (const [size, expected] of [
		["2xs", iconSizeValues["2xs"]],
		["xs", iconSizeValues.xs],
		["37px", "37px"],
		[undefined, "1em"],
	] as const) {
		const html = renderToStaticMarkup(
			<PurseProvider>
				<ActivityIndicator size={size} />
			</PurseProvider>,
		)
		expect(html).toContain(`width:${expected}`)
		expect(html).toContain(`height:${expected}`)
	}
})
