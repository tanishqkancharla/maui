import { renderToStaticMarkup } from "react-dom/server"
import { PurseProvider } from "purse-styles"
import type { ReactNode } from "react"
import { afterAll, beforeAll, expect, it, vi } from "vitest"
import { Banner } from "./Banner"

beforeAll(() => {
	vi.stubGlobal("document", { createElement: () => ({}) })
})

afterAll(() => vi.unstubAllGlobals())

function render(children: ReactNode) {
	return renderToStaticMarkup(<PurseProvider>{children}</PurseProvider>)
}

it("keeps tone separate from announcement urgency and makes the icon optional", () => {
	const quiet = render(<Banner tone="danger">Sync failed.</Banner>)
	expect(quiet).toContain("Sync failed.")
	expect(quiet).not.toMatch(/role="(?:alert|status|banner)"/)
	expect(quiet).not.toContain("<button")
	expect(quiet).toContain('aria-hidden="true"')

	for (const role of ["status", "alert"] as const) {
		const announced = render(
			<Banner role={role} icon={false}>
				Sync failed.
			</Banner>,
		)
		expect(announced).toContain(`role="${role}"`)
		expect(announced).not.toContain("<svg")
	}
})

it("preserves composed content, actions, and custom icons in both layouts", () => {
	for (const layout of ["inline", "stacked"] as const) {
		const html = render(
			<Banner
				layout={layout}
				title="Connection interrupted"
				icon={<svg data-custom-icon="bell" />}
				actions={<a href="/connection">Reconnect</a>}
			>
				Your <strong>local changes</strong> are safe.
			</Banner>,
		)
		expect(html).toContain("Connection interrupted")
		expect(html).toContain("<strong>local changes</strong>")
		expect(html).toContain('<a href="/connection">Reconnect</a>')
		expect(html).toContain('data-custom-icon="bell"')
	}
})
