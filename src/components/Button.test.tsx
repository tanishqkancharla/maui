import { renderToStaticMarkup } from "react-dom/server"
import { ButtonContext } from "react-aria-components"
import { PurseProvider } from "purse-styles"
import { afterAll, beforeAll, expect, it, vi } from "vitest"
import { Button } from "./Button"

// Maui's client-only focus store has no server snapshot.
vi.mock("../hooks/useFocus", () => ({
	useFocus: () => [false, {}],
}))

beforeAll(() => {
	vi.stubGlobal("document", { createElement: () => ({}) })
})

afterAll(() => {
	vi.unstubAllGlobals()
})

it("shows progress beside a visible label only while pending, including from context", () => {
	const render = (isPending: boolean, pendingLabel?: string) =>
		renderToStaticMarkup(
			<PurseProvider>
				<ButtonContext.Provider value={{ isPending }}>
					<Button pendingLabel={pendingLabel}>Save changes</Button>
				</ButtonContext.Provider>
			</PurseProvider>,
		)

	const pending = render(true, "Saving changes…")
	expect(pending).toContain("Saving changes…")
	expect(pending).not.toContain("Save changes")
	expect(pending).toContain('role="progressbar"')
	expect(pending).toContain('aria-label="Pending"')
	expect(pending).toContain('aria-disabled="true"')
	expect(pending).not.toMatch(/\sdisabled=/)

	const fallback = render(true)
	expect(fallback).toContain("Save changes")
	expect(fallback).toContain('role="progressbar"')

	const ready = render(false, "Saving changes…")
	expect(ready).toContain("Save changes")
	expect(ready).not.toContain("Saving changes…")
	expect(ready).not.toContain('role="progressbar"')
})
