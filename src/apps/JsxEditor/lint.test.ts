import { describe, expect, test } from "vitest"
import { collectJsxDiagnosticsFromSource } from "./lint"

describe("collectJsxDiagnosticsFromSource", () => {
	test("accepts a Button palette variantColor", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="primary" variantColor="blue">Connect</Button>`,
		)
		expect(diagnostics).toEqual([])
	})

	test("accepts a Button hex variantColor", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="primary" variantColor="#1A73E8">Connect</Button>`,
		)
		expect(diagnostics).toEqual([])
	})

	test("accepts a Button rgb variantColor", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="primary" variantColor="rgb(26, 115, 232)">Connect</Button>`,
		)
		expect(diagnostics).toEqual([])
	})

	test("accepts a braced string hex variantColor", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="primary" variantColor={"#1A73E8"}>Connect</Button>`,
		)
		expect(diagnostics).toEqual([])
	})

	test("rejects a CSS color name that is not a palette name", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="primary" variantColor="navy">Connect</Button>`,
		)
		expect(diagnostics).toHaveLength(1)
		expect(diagnostics[0]?.message).toContain(
			`Type '"navy"' is not assignable to type '`,
		)
		expect(diagnostics[0]?.message).toContain("`#${string}`")
	})

	test("still rejects an unknown Button variant", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Button variant="solid">Connect</Button>`,
		)
		expect(diagnostics).toHaveLength(1)
		expect(diagnostics[0]?.message).toBe(
			`Type '"solid"' is not assignable to type '"default" | "quiet" | "primary"'.`,
		)
	})
})
