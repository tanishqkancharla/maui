# Alignment gallery and check

[`capCenter`](03-text-cap-center.md), [`size="line"`](04-button-line-size.md) and [`lineBox`](05-icon-line-box.md) add the APIs. This page keeps them honest.

**Today**

- No gallery page shows icon + text rows. Regressions show up in apps, as in diffmap.

**Proposed**

- **Gallery page "Alignment":** rows for every text size × (icon + text, `size="line"` button, 1-line, 3-line), with a toggle that draws the cap-center line.
- **Playwright check** (same method as the [measurements](01-why-its-hard.md#maui-history-five-ad-hoc-fixes)):
  - icon center = `svg.getBBox()` mapped through `getScreenCTM()`
  - cap center = baseline probe − ½ `measureText("H").actualBoundingBoxAscent`
  - fail if the gap is > 0.5px

```ts [alignment.test.ts (illustrative)]
for (const row of await page.locator("[data-align-row]").all()) {
  expect(Math.abs(await iconMinusCap(row))).toBeLessThanOrEqual(0.5)
}
```

- One line in the Maui skill's design constraints: "Icon + text rows: `alignItems: start`, text `capCenter`, icons and buttons `1lh`."

```changes

```
