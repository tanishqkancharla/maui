# One-line icon slot: iconStyles.lineBox

[`capCenter`](03-text-cap-center.md) centers caps in each line. [`size="line"`](04-button-line-size.md) covers clickable icons. This phase covers decorative icons: list rows, banners, toasts, checkbox labels.

**Today**

- Banner builds its own `1lh` box `[[src/components/Banner.tsx#L64-L74]]`.
- Other rows use `alignItems: center`, which drifts when text wraps.

**Proposed**

- Export Banner's box as a style:

```ts [src/tokens/sizing.ts (illustrative)]
export const iconStyles = {
  lineBox: style({
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
    width: "1lh",
    height: "1lh",
  }),
}
```

```tsx
<div className={rowStart}>
  <span className={lineBox}><Information size="sm" /></span>
  <Text size="sm" capCenter>Comment saved</Text>
</div>
```

- The icon keeps its own `size`. The box only sets the line slot.
- Banner switches to it in [Migrate existing fixes](06-migrate-existing-fixes.md).

## Tradeoffs

- ✅ Tiny, and generalizes a pattern Maui already ships.
- ⚠️ The box must inherit the text's `font-size` / `line-height`. Put it in the same text context, as Banner does.

## Verify

- Same gallery and check as [the alignment check](07-alignment-check.md), with 1- and 3-line text.

```changes

```
