---
name: maui
description: Conventions for consuming the Maui design system. Use when building UI with Maui tokens, components, or purse-styles in an app that depends on Maui.
---

# Maui

TypeScript-first design system styled with `purse-styles`. Import tokens and components from the Maui package and compose with `style` / `useStyles`.

```ts
import { style } from "purse-styles"
import { background, border, colors, radius, shadow } from "maui"
```

## Shadows

Elevation shadows (`shadow.thin`, `shadow.minimal`, `shadow.middle`, `shadow.strong`, etc.) already include a 1px ring. Do not also apply `border()`, `borderColor.outline`, or an extra `0 0 0 1px` ring on the same element — use the shadow alone.
