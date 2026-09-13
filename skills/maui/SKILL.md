---
name: maui
description: Conventions and design constraints for consuming the Maui design system. Use when building UI with Maui tokens, components, patterns, or purse-styles. Prefer this skill and its references for composition knowledge.
---

# Maui

TypeScript-first design system styled with `purse-styles`. Wrap the app in `MauiProvider`, then import tokens and components from `"maui"`.

```ts
import { style } from "purse-styles"
import {
	MauiProvider,
	background,
	border,
	colors,
	radius,
	shadow,
} from "maui"

function App() {
	return (
		<MauiProvider>
			{/* … */}
		</MauiProvider>
	)
}
```

The published package exposes:

- `"maui"` — compiled barrel (`dist/`) of provider, theme, tokens, and components
- `"maui/icons"` — tree-shakeable named icon modules (same names as `Icons.*`)
- `"maui/src"` — TypeScript source barrel
- `"maui/src/*"` — TypeScript source for deep imports
- `"maui/skills/maui"` — this skill file
- `"maui/skills/maui/*"` — reference files next to this skill

`MauiProvider` sets up theme (`data-theme` / `color-scheme`), `PurseProvider`, design-system globals, and the focus UI database used by Button/Dialog.

## How to learn Maui

Prefer this skill for composition knowledge — how to assemble tokens, components, patterns, and apps. Reach for package source (`"maui/src/patterns"`, `"maui/src/apps"`, or an install under `node_modules`) when you need a detail the skill does not cover.

Before designing or implementing new UI:

1. Read the constraints in this file.
2. Open the matching reference below and reuse its structure, tokens, and interactions.

| Need | Read |
| --- | --- |
| Tokens, `purse-styles`, motion, layout, theme | [references/tokens.md](references/tokens.md) |
| Component props and composition | [references/components.md](references/components.md) |
| Sidebar, inbox, messages, streaming markdown | [references/patterns.md](references/patterns.md) |
| Email client, calendar, AI chat, JSX editor | [references/apps.md](references/apps.md) |

Patterns, demo apps, and the gallery `Panel` preview surface are **not** part of the `"maui"` package barrel. Prefer the recipes in those references and rebuild with barrel exports (`Button`, `Flex`, `text(...)`, …).

## Design constraints

- Hover backgrounds have no transitions. Hover fills (`backgroundColor.elementHover`, quiet-button washes, list/row highlights) snap instantly. Do not animate `background` / `background-color` on hover with `motion.standard(...)` or a CSS `transition`. Other motion (tooltips, transforms) is fine.
- Simple apps default to a `proseMaxWidth` column (`72ch`) centered in their container: `width: "100%"`, `maxWidth: proseMaxWidth`, `marginInline: "auto"`. `sizing.contentWidth` is the same measure. Use this for single-column tools, settings, forms, and reading layouts. Multi-pane or full-bleed apps (inbox, calendar, IDE) are the exception.
- Always design empty states. Every list, inbox, search result, or collection needs an intentional empty composition (copy and an optional action), never a blank panel.

## Theme FOUC

Put the exported `themeFoucScript` string in a classic inline `<script>` in `<head>` (before React boots) so `data-theme` is correct on first paint. The gallery `src/index.html` uses the same script.

Use `useTheme()` for preference / resolved theme. Token dark values use the `DARK_THEME` selector (`:root[data-theme="dark"]`). Prefer semantic tokens (`colors`, `background`, `avatar`, `focusRing()`) over bespoke CSS variables.

## Shadows

Use the three-level elevation scale:

- `shadow.subtle` — controls, cards, and ordinary raised surfaces
- `shadow.medium` — tooltips and larger floating panels
- `shadow.strong` — dropdowns, popovers, and dominant overlays

All three already include a 1px ring. Do not also apply `border()`, `borderColor.outline`, or another ring on the same element.

Buttons and form-control surfaces use `shadow.subtle` by default. For compound
controls, apply it once to the outer control boundary rather than to every
internal button or segment.

## Focus

`focusRing()` applies a theme-aware Radix blue shadow (`blueAlpha[8]` hard edge + `blueAlpha[5]` glow). Do not hand-roll a competing outline or box-shadow for keyboard focus.

## Layout utilities

`Flex`, `Padding`, and `Gap` take spacing scale steps (`1 | 2 | 3 | 4 | 6 | 8 | 12 | 16`), not raw pixels. Example: `<Flex row gap={4}>` is 9px, not 4px. `Spacer` grows to fill leftover flex space. `Divider` is a horizontal rule.

## Icons

Import named icons so unused SVGs are tree-shaken. Do not import the `Icons` namespace in app code unless you want the full set.

```ts
import { Search, Plus } from "maui"
import { Text as TextIcon } from "maui/icons"

<Search size="sm" />
<TextIcon size="md" />
```

`size` uses the same t-shirt scale as `text(...)` (`2xs`–`xl`, default `sm`). Stroke and fill use `currentColor`. Icons that share a root export name (`Text`, `Badge`, `Switch`, `H1`, `H2`, `H3`, `Link`, `Menu`, `Code`, `Blockquote`, `Padding`, `SearchField`) are `TextIcon` / `BadgeIcon` / … from `"maui"`, or the original name from `"maui/icons"` / `Icons.Text`.

## Components

Catalog only — props, examples, and composition live in [references/components.md](references/components.md).

### Typography and reading

- `Text` — size / weight / color / `monospace` span
- `H1`–`H4`, `P`, `Label`, `Blockquote`, `Ul`, `Ol`, `Li`, `Link`
- `Prose` — long-form rhythm; headings switch to the prose scale inside it
- `Editor` — TipTap markdown surface (CommonMark shortcuts, `proseHtml` type) with no chrome; wrap it for padding, elevation, and actions

### Form controls

- `Button` — `variant` is `"default"` | `"quiet"` | `"primary"`; `variantColor` is a palette name, or an opaque hex / `rgb()` string (`#${string}` or `rgb(`). Primary palettes fill step 9 (hover 10) with light text (`onAccent`, or step 12 on amber/lime/mint/sky/yellow). A CSS color is used as the fill (alpha is dropped; hover is `l - 0.04`; text is white or near-black from lightness). The edge is `tintedSubtle`. Quiet + color uses a 3.5% wash of the fill (hover 7%). Disable with React Aria’s `isDisabled` (maps to the native `disabled` attribute; no parallel `disabled` React prop).
- `TextField`, `SearchField`, `NumberField`, `QuietTextField`
- `Checkbox`, `Switch`, `Slider`
- `RadioOptionGroup` / `RadioOption`
- `Select` / `SelectItem`

### Collections and overlays

- `ListBox` / `ListBoxItem`
- `MenuTrigger` / `Menu` / `MenuItem`
- `Tooltip`
- `CollectionPopover` — shared popover used by Select and Menu
- `Overlay`, `Dialog`

### Display

- `Avatar`
- `Badge`
- `Code`, `Kbd`, `CodeBlock`
- `Table` — React Aria table. `TableHeader` contains `TableHead` columns directly (no `TableRow`). Mark the identifying column with `isRowHeader` (required; usually the name/id column, not a leading checkbox or drag handle). When `selectionMode` is `"multiple"`, `TableHeader` and `TableRow` insert a leading checkbox column (`Checkbox slot="selection"`). `align` on `TableHead` / `TableCell` is `"start"` | `"center"` | `"end"`. `TableFooter` fills with `colors.gray[2]`. Place `TableCaption` after `Table`. `TableBody` renders “No results.” when empty; pass `renderEmptyState` to replace it.
- `FuzzyString` — highlight segments; takes a match result, not a plain string
- `Thinking` — 3×3 Game of Life indicator; reseeds when the board dies or loops
- `Crossfade` — when `contentKey` changes, fades the previous view out in `direction` (`up` | `down` | `left` | `right`), then fades the new view in from the opposite side. `contentKey` is required. Do not put `key` on `Crossfade` itself or the exit is skipped.
- `LoadingScreen` — fills available width and height. Optional `progressLabel`. Label at start fades Thinking (accent, small / `0.8em`) and the label (accent, weight 500, trailing `...`) in together; later label changes Crossfade up. With no label at start, Thinking waits 2s before fading in; a label before 2s fades both in immediately; a label after 2s animates in and shifts Thinking so the pair stays centered.

## Patterns and apps

Not on the `"maui"` barrel. Prefer the recipes here; rebuild with barrel exports in consuming apps.

| Pattern | Role | Reference |
| --- | --- | --- |
| Sidebar | 240px nav: sections, active item, optional icon and trailing badge | [patterns.md](references/patterns.md#sidebar) |
| Inbox / InboxMultiLine | Mail thread list with unread dot, hover actions, selection | [patterns.md](references/patterns.md#inbox) |
| MessageList / Message | Thread of raised message cards (avatar + Prose body) | [patterns.md](references/patterns.md#message-list) |
| AssistantMessage | Streaming markdown reply (Streamdown + Maui prose + CodeBlock) | [patterns.md](references/patterns.md#assistant-message) |

| App | Role | Reference |
| --- | --- | --- |
| Email client | Two-pane inbox + reading pane | [apps.md](references/apps.md#email-client) |
| AI chat | Mock streaming chat (Editor + AssistantMessage + Thinking) | [apps.md](references/apps.md#ai-chat) |
| Calendar | Three-pane schedule (mini month, week grid, event details) | [apps.md](references/apps.md#calendar) |
| JSX editor | Live JSX playground (CodeMirror + Maui catalog) | [apps.md](references/apps.md#jsx-editor) |

## License

Maui is open source under the MIT License.
