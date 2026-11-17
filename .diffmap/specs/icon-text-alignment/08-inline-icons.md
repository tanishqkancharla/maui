# Inline icons in running text (later)

[`capCenter`](03-text-cap-center.md) through [`lineBox`](05-icon-line-box.md) cover icons in flex rows. This one covers icons inside a sentence ("Press ⌘ to record"). Build it only when a real use shows up.

**Today**

- `createIcon` renders a plain `<svg>` that sits on the baseline `[[src/icons/createIcon.tsx#createIcon]]`. It looks high in a sentence.

**Proposed**

- `<Icons.Command size="sm" inline />` sets `vertical-align: calc((1cap - <icon size>) / 2)`.
- That puts the icon's center at half the cap height above the baseline, which is how SF Symbols sit.
- See the [live comparison](02-other-design-systems.md#vertical-align-and-1em-icons-mui-chakra-primer) against `middle` and `text-bottom`.

```tsx [src/icons/createIcon.tsx (illustrative)]
style={{
  flexShrink: 0,
  ...(inline && { verticalAlign: `calc((1cap - ${box}) / 2)` }),
  ...style,
}}
```

- ✅ Pure CSS, wraps with text, needs no `text-box`.
- ⚠️ Inline flow only. Rows use `capCenter` + `1lh` boxes.

```changes

```
