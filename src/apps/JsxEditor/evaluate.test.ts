import { describe, expect, test } from "vitest"
import { evaluateJsx } from "./evaluate"

describe("evaluateJsx", () => {
	test("evaluates MenuTrigger with a Maui Button", () => {
		const result = evaluateJsx(`<MenuTrigger>
  <Button variant="quiet" aria-label="Actions">
    <Icons.DotsHorizontal />
  </Button>
  <Menu>
    <MenuItem id="rename">Rename</MenuItem>
  </Menu>
</MenuTrigger>`)
		expect(result.ok).toBe(true)
	})
})
