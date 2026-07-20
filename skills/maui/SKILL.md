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

## Theme

Maui resolves System / Light / Dark onto `data-theme` on `<html>`. Token modules use purse `defineVars` with the `DARK_THEME` selector condition (`:root[data-theme="dark"]`). Prefer semantic tokens (`colors`, `background`, `avatar`, `focusRing()`) over bespoke CSS variables.

## Focus

`focusRing()` applies a theme-aware accent shadow (`accentAlpha[8]` hard edge + `accentAlpha[5]` glow). Do not hand-roll a competing outline or box-shadow for keyboard focus.
