import { renderToStaticMarkup } from "react-dom/server"
import { PurseProvider } from "purse-styles"
import type { ReactNode } from "react"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"
import { backgroundColor } from "../tokens/background"
import { colors } from "../tokens/colors"
import { beautifulMermaidEditorUrl, MermaidDiagram } from "./MermaidDiagram"

vi.mock("./Button", async () => {
	const { createElement } = await import("react")
	return {
		Button: ({ children, ...props }: { children?: ReactNode }) =>
			createElement("button", props, children),
	}
})

vi.mock("./Tooltip", () => ({
	Tooltip: ({ children }: { children?: ReactNode }) => children,
}))

beforeAll(() => {
	vi.stubGlobal("document", { createElement: () => ({}) })
})

afterAll(() => {
	vi.unstubAllGlobals()
})

describe("MermaidDiagram", () => {
	it("renders a themed SVG with an accessible label", () => {
		const html = renderToStaticMarkup(
			<PurseProvider>
				<MermaidDiagram
					aria-label="Checkout flow"
					source={`graph LR
	Customer --> Checkout
	Checkout --> Receipt`}
				/>
			</PurseProvider>,
		)

		expect(html).toContain('role="img"')
		expect(html).toContain('aria-label="Checkout flow"')
		expect(html).toContain("<svg")
		expect(html).toContain(`--accent:${colors.accent[9]}`)
		expect(html).toContain(`--surface:${backgroundColor.element}`)

		const urlIndex = html.indexOf('aria-label="Open in Beautiful Mermaid"')
		const copyIndex = html.indexOf('aria-label="Copy Mermaid source"')
		const fullscreenIndex = html.indexOf('aria-label="View fullscreen"')
		expect(urlIndex).toBeGreaterThan(-1)
		expect(copyIndex).toBeGreaterThan(urlIndex)
		expect(fullscreenIndex).toBeGreaterThan(copyIndex)
	})

	it("creates the canonical Beautiful Mermaid editor URL", () => {
		const source = `graph TD
	A --> B`
		const url = beautifulMermaidEditorUrl(source)
		const [, encoded = ""] = url.split("#")

		expect(url).toMatch(/^https:\/\/agents\.craft\.do\/mermaid\/editor#/)
		expect(JSON.parse(atob(encoded))).toEqual({ source })
	})

	it("shows renderer errors instead of crashing", () => {
		const html = renderToStaticMarkup(
			<PurseProvider>
				<MermaidDiagram source="not a diagram" />
			</PurseProvider>,
		)

		expect(html).toContain('role="alert"')
		expect(html).toContain("Invalid mermaid header")
	})
})
