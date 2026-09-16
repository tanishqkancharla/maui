import { describe, expect, test } from "vitest"
import {
	collectJsxDiagnosticsFromSource,
	formatTypeErrorBanners,
} from "./lint"

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

	test("reports every invalid attribute", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Flex>
				<Button variant="solid" disabled>Connect</Button>
				<Button variant="ghost">Cancel</Button>
			</Flex>`,
		)
		expect(formatTypeErrorBanners(diagnostics)).toEqual([
			`Line 2: Type '"solid"' is not assignable to type '"default" | "quiet" | "primary"'.`,
			`Line 2: Property 'disabled' does not exist on Button.`,
			`Line 3: Type '"ghost"' is not assignable to type '"default" | "quiet" | "primary"'.`,
		])
	})

	test("reports each multiline disabled Button", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Flex>
				<Button
					variant="primary"
					variantColor="#1A73E8"
					style={{ color: "#FFFFFF" }}
					disabled
				>
					Starting
				</Button>
				<Button
					variant="primary"
					variantColor="#1A73E8"
					style={{ color: "#FFFFFF" }}
					disabled
				>
					Connecting
				</Button>
			</Flex>`,
		)
		expect(formatTypeErrorBanners(diagnostics)).toEqual([
			`Line 6: Property 'disabled' does not exist on Button.`,
			`Line 14: Property 'disabled' does not exist on Button.`,
		])
	})

	test("accepts Flex padding aliases and side props", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<Flex column padding={6} px={4} py={3} pt={2} pr={8} pb={2} pl={8}>
				<Text>Inset</Text>
			</Flex>`,
		)
		expect(diagnostics).toEqual([])
	})

	test("accepts MenuTrigger with a Maui Button", () => {
		const diagnostics = collectJsxDiagnosticsFromSource(
			`<MenuTrigger>
				<Button variant="quiet" aria-label="Actions">
					<Icons.DotsHorizontal />
				</Button>
				<Menu>
					<MenuItem id="rename">Rename</MenuItem>
				</Menu>
			</MenuTrigger>`,
		)
		expect(diagnostics).toEqual([])
	})
})
