# Layout utilities

Gallery: `/components/layout-utilities`. Import from `"maui"`. Layout tokens: [tokens.md](../tokens.md).

Gallery-only: `Panel` is a preview frame in the docs site. It is **not** exported. Use `Flex` + `shadow` + `radius` instead.

## `Flex`

Row **or** column (exactly one of `row` / `column` is required).

```tsx
<Flex row gap={4} alignItems="center">
  <Avatar name="Ada Lovelace" size="md" />
  <Text size="lg" fontWeight={600}>Ada Lovelace</Text>
  <Spacer />
  <Badge>Active</Badge>
</Flex>
```

| Prop | Notes |
| --- | --- |
| `row` / `column` | Required, mutually exclusive |
| `gap` | Spacing step |
| `p` / `padding` | All-side padding step |
| `px` `py` `pt` `pb` | Axis / side padding |
| `alignItems` | CSS `align-items` |
| `border` | `true` (outline) or `"border" \| "outline" \| "accent"`. **Skipped when `shadow` is set** |
| `shadow` | `"subtle" \| "medium" \| "strong"` — includes a ring; do not also set `border` |
| `radius` | Token key (`sm`, `lg`, `pill`, …) |
| `style` | React style object |

## `Padding`

`xy` (all), `x` / `y`, or `top` `right` `bottom` `left`. Spacing steps.

## `Gap`

Fixed spacer: `{ width: Space }` **or** `{ height: Space }`. Does not grow.

## `Spacer`

`flex: 1 1 auto` — fills leftover space in a `Flex`.

## `Divider`

Full-width `<hr>` (`gray[5]`, 1.5px). Has vertical margin (~1.5rem). For tight lists, prefer `gap: 1px` between rows instead.

## `navigationItem`

Style object (not a component) for current-page nav rows: sm text, `radius.sm`, hover `elementHover`, `[aria-current="page"]` accent + weight 500. Used by the [Sidebar](../patterns/sidebar.md) recipe.
