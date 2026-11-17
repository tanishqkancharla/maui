import { renderToStaticMarkup } from "react-dom/server"
import { PurseProvider } from "purse-styles"
import { afterAll, beforeAll, expect, it, vi } from "vitest"
import { LogoIcon } from "./LogoIcon"

beforeAll(() => {
	vi.stubGlobal("document", { createElement: () => ({}) })
})

afterAll(() => {
	vi.unstubAllGlobals()
})

it("is decorative by default and exposes an accessible name when provided", () => {
	const decorative = renderToStaticMarkup(
		<PurseProvider>
			<LogoIcon src="/brand.svg" />
		</PurseProvider>,
	)
	expect(decorative).toContain('alt=""')
	expect(decorative).toContain('aria-hidden="true"')

	const labeled = renderToStaticMarkup(
		<PurseProvider>
			<LogoIcon src="/brand.svg" alt="Example" />
		</PurseProvider>,
	)
	expect(labeled).toContain('alt="Example"')
	expect(labeled).not.toContain("aria-hidden")
})
