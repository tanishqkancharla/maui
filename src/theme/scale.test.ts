import { readFileSync } from "node:fs"
import { runInNewContext } from "node:vm"
import { describe, expect, it } from "vitest"
import { themeFoucScript } from "./themeFoucScript"

const galleryScript = readFileSync(
	new URL("../index.html", import.meta.url),
	"utf8",
).match(/<script>([\s\S]*?)<\/script>/)![1]!

describe.each([
	["package", themeFoucScript],
	["gallery", galleryScript],
])("%s pre-paint scale", (_, script) => {
	it.each([
		[null, false, "medium"],
		[null, true, "large"],
		["system", true, "large"],
		["medium", true, "medium"],
		["large", false, "large"],
		["invalid", true, "large"],
	])(
		"resolves preference %s with coarse pointer %s to %s",
		(stored, coarse, expected) => {
			const root = { dataset: {} as Record<string, string>, style: {} }
			runInNewContext(script, {
				document: { documentElement: root },
				window: {
					localStorage: {
						getItem: (key: string) => (key === "maui-scale" ? stored : "dark"),
					},
					matchMedia: (query: string) => ({
						matches: query === "(pointer: coarse)" && coarse,
					}),
				},
			})
			expect(root.dataset.scale).toBe(expected)
			expect(root.dataset.theme).toBe("dark")
		},
	)

	it("uses system scale when storage is blocked", () => {
		const root = { dataset: {} as Record<string, string>, style: {} }
		runInNewContext(script, {
			document: { documentElement: root },
			window: {
				localStorage: {
					getItem: () => {
						throw new Error("blocked")
					},
				},
				matchMedia: (query: string) => ({
					matches: query === "(pointer: coarse)",
				}),
			},
		})
		expect(root.dataset.scale).toBe("large")
		expect(root.dataset.theme).toBe("light")
	})
})
