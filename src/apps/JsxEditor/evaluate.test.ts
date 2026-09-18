import { describe, expect, test } from "vitest"
import { evaluateJsx } from "./evaluate"

describe("evaluateJsx", () => {
	test("evaluates Flex justifyContent and background", () => {
		const result = evaluateJsx(`<Flex row alignItems="center" justifyContent="between" background="element" p={4} radius="lg">
  <Text>Left</Text>
  <Text>Right</Text>
</Flex>`)
		expect(result.ok).toBe(true)
	})
})
