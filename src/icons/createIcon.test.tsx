import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import { ChevronDown } from "./ChevronDown"
import { iconSizeValues, type IconSize } from "../tokens/sizing"

describe("icon sizing", () => {
	it("applies the default size through CSS, not SVG attributes", () => {
		const markup = renderToStaticMarkup(<ChevronDown />)
		expect(markup).toContain(`width:${iconSizeValues.sm}`)
		expect(markup).toContain(`height:${iconSizeValues.sm}`)
		expect(markup).toContain("flex-shrink:0")
		expect(markup).not.toContain(' width="')
		expect(markup).not.toContain(' height="')
	})

	it.each<IconSize>(["2xs", "xs", "sm", "md", "lg", "xl"])(
		"applies the %s size token through CSS",
		(size) => {
			const markup = renderToStaticMarkup(<ChevronDown size={size} />)
			expect(markup).toContain(`width:${iconSizeValues[size]}`)
			expect(markup).toContain(`height:${iconSizeValues[size]}`)
		},
	)

	it("preserves explicit numeric dimensions", () => {
		const markup = renderToStaticMarkup(<ChevronDown width={32} height={24} />)
		expect(markup).toContain("width:32px")
		expect(markup).toContain("height:24px")
		expect(markup).toContain('width="32"')
		expect(markup).toContain('height="24"')
	})

	it("preserves CSS variable dimensions", () => {
		const markup = renderToStaticMarkup(
			<ChevronDown width="var(--custom-width)" height="2em" />,
		)
		expect(markup).toContain("width:var(--custom-width)")
		expect(markup).toContain("height:2em")
	})

	it("lets caller styles override dimensions and flex behavior", () => {
		const markup = renderToStaticMarkup(
			<ChevronDown
				width={32}
				style={{ width: 40, height: 48, flexShrink: 1 }}
			/>,
		)
		expect(markup).toContain("width:40px")
		expect(markup).toContain("height:48px")
		expect(markup).toContain("flex-shrink:1")
	})
})
