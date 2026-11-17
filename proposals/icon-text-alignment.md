# Proposal: icon ↔ text alignment

Status: proposal, nothing built.

## TL;DR

- **Why it's hard:** CSS centers icons in the *line box*. The eye centers on the *capital letters*. On system fonts those two centers are ~1–2px apart, and Maui buttons (28px) are taller than a line of text (18–22px).
- **What others do:** Most ship nothing and rely on `align-items: center` / `vertical-align`. The good ones use (a) font-metric trimming (Radix `trim`, Capsize, CSS `text-box`), (b) icon boxes one line tall (Tailwind UI, Spectrum tokens), or (c) icons drawn as glyphs on the baseline (SF Symbols).
- **Recommend:** one rule plus three small APIs:
  - **Rule:** in an icon + text row, the text is cap-centered and every box is `1lh` tall.
  - `text({ capCenter: true })`
  - `Button size="line"`
  - `Icon inline`

## 1. Why it's hard

- **Half-leading.** `line-height` adds equal space above and below the font's *content area* (ascender + descender). It doesn't add it around the glyphs you can see.
- **Ascender/descender ≠ caps.** The content area includes descender room (g, p, y) and accent room above the caps. So the center of the line box is *not* the center of the capitals. On `-apple-system`/Segoe UI, caps sit above or below it by ~0.5–1.5px, and that changes per font.
  - Avatar commit `87c8b5a` measured "capitals sat up to 1.4px high".
- **Icons are centered in a square.** A 24×24 viewBox centers on the box, which is right. But the box gets centered on the line box, not on the caps → it looks ~1px low.
- **`vertical-align: middle` is also wrong.** It centers on baseline + ½ x-height, which is lower than cap center. Icons sink.
- **Controls aren't one line tall.** Button = 28px and `sm` = 24px, but `text sm` line = 20px.
  - Put a button next to text with `align-items: center` → it's centered on the whole paragraph, not on line 1.
  - Use `start` → the extra 4–8px pushes the icon down.
- **Wrappers break selectors.** Button wraps children in `[data-button-content]`. So `button > svg` overrides from app code silently miss (diffmap hit this).
- **`text-box` / Capsize trims change the box size.** Trimming removes the space above caps and below the baseline. Padding has to add it back, or rows lose their rhythm.
- **Browser support.** `text-box` works in Chrome 133+ and Safari 18.2+. Firefox: check before relying on it. `1cap` / `1lh` units are broadly supported.

## 2. Maui history: we have solved this before, four times, ad hoc

| Where | Trick |
| --- | --- |
| `Button` label (`5f4b02a`, Jun 2026) | `textBox: trim-both cap alphabetic`, with padding retuned (spacing 4 → 9px) |
| `Avatar` initials (`87c8b5a`, Oct 2026) | same trim on an inner block span |
| `Calendar` mini day cells | same trim on grid cells |
| `Banner` icon (`9a94c5b`) | icon box `width/height: 1lh` + `--banner-text-inset: (controlHeight − 1lh)/2` so icon, text and buttons share an inset |
| diffmap `CommentCard` (PR #56) | actions `height: 1lh`, icon buttons `height: 100%; aspect-ratio: 1`, body trimmed + `paddingBlock: calc((1lh - 1cap) / 2)`. Measured: 2px off → 0.02px off |

- `TabBar` has to *undo* the Button trim (`textBox: normal`). The trim is baked into Button instead of being opt-in.
- `text()` has no trim option, so every consumer copies these lines.

## 3. What other systems do

- **Radix Themes:** `Text`/`Heading` take `trim="normal | start | end | both"`. It uses negative margins from per-font `--*-leading-trim` vars. Ghost buttons/IconButtons use negative margins so the glyph lines up with text, not the hover fill.
- **Capsize (Seek):** computes margins from font metrics (capHeight, ascent, descent, unitsPerEm) to get a cap-height box. This is what `text-box` does natively. Needs metrics for each font.
- **CSS `text-box-trim` / `text-box-edge`:** the native version of Capsize. `trim-both cap alphabetic` gives a box exactly cap-height tall.
- **Tailwind / Tailwind UI:** no built-in trim. The common pattern is `flex items-start` with an icon box as tall as the line (`h-6` next to `leading-6`), which keeps the icon on line 1. Same as Banner's `1lh`. `h-[1lh]` arbitrary values work.
- **Adobe Spectrum:** alignment is defined in *tokens*: `component-top-to-text`, `component-top-to-workflow-icon`, `checkbox-top-to-control`. Each control states its own offset so the icon center matches line 1.
- **GitHub Primer:** Octicon `verticalAlign` prop (default `text-bottom`). Button `leadingVisual`/`trailingVisual` slots own the alignment. IconButton sizes match control heights.
- **Chakra:** `Icon` defaults to `display: inline-block; line-height: 1em; vertical-align: middle` (the x-height approximation).
- **MUI:** `SvgIcon` sizes in `1em` with `fontSize="inherit"`. Docs say to use `display:flex; align-items:center`. `IconButton edge="start|end"` uses negative margins for optical edges. No trim.
- **Atlassian:** new icons have a `spacing` prop (`none / compact / spacious`) that pads the glyph to fit standard boxes. Alignment comes from box sizes.
- **Polaris:** `InlineStack blockAlign="center"`. Checkbox/choice controls hard-code an offset so they sit on line 1.
- **Apple HIG / SF Symbols:** symbols *are glyphs*. They sit on the text baseline, are vertically centered on cap height, and scale with font size and weight. SwiftUI `HStack(alignment: .firstTextBaseline)` aligns them to line 1. This is the gold standard: alignment comes from typography, not boxes.

**Takeaway:** for web, the best version is "make the text box *mean* caps" (trim) **plus** "make everything one line tall" (`1lh`). Both are now native CSS, so no per-font metrics are needed.

## 4. Options for Maui

### A. `text({ capCenter: true })` (recommended)

- Adds `textBox: trim-both cap alphabetic` + `paddingBlock: calc((1lh - 1cap) / 2)` inside `@supports (text-box: trim-both cap alphabetic)`.
- Result: each line still takes `1lh` (same layout as today), but the caps of line 1 sit exactly centered in the first `1lh`.
- ✅ No layout change, opt-in, works in any flex row with `alignItems: start`.
- ✅ Replaces the copies in Button, Avatar, Calendar and diffmap.
- ⚠️ Browsers without `text-box` fall back to today's ~1px offset. The `@supports` guard is required, or the padding double-counts.
- Alt name: `trim: "cap-centered"`, to leave room for Radix-style `trim: "start" | "end" | "both"` later. Those fully remove the space (for headings flush against card edges).

### B. `Button size="line"` (recommended)

- Icon-only button sized to its parent's line: `height: 1lh; aspect-ratio: 1; padding: 0`, with `font-size` inherited so `1lh` matches the neighbouring text.
- Hit target: add `::before { inset: -4px }` (or negative margin, like Radix ghost) so a 20px visual still gets a ~28px target.
- ✅ Fixes "button taller than one line of text" at the source. No `[data-button-content]` selectors in apps.
- ⚠️ Small visual target. Limit it to `quiet` / `text` variants.
- Alternative: a `buttonGroupStyles.line` wrapper (diffmap's approach). More flexible, but it brings back the selector problem.

### C. `Icon inline` prop (nice to have)

- For icons *inside running text* (e.g. "Press ⌘ to…"): `vertical-align: calc((1cap - <iconSize>) / 2)`. This centers the icon on cap height relative to the baseline, like SF Symbols.
- ✅ Pure CSS, wraps with the text, needs no flex.
- ⚠️ Only for inline flow. Rows still use A + B.

### D. `lineBox` slot style (small)

- Promote Banner's icon box: `width: 1lh; height: 1lh; display: grid; place-items: center`, and export it as `iconStyles.lineBox`.
- Use it for leading icons in list rows, banners, toasts, checkbox labels.

### E. Spectrum-style offset tokens (not recommended)

- `controlSize.topToText`, `topToIcon`, …: works, but it's numbers per control and per size, and they drift when fonts change. `1lh`/`1cap` make them unnecessary.

## 5. Recommended plan

1. Add `capCenter` to `TextOptions` (Option A).
2. Add `Button size="line"` (Option B) and export `iconStyles.lineBox` (Option D).
3. Migrate Button label, Avatar, Calendar, Banner and diffmap `CommentCard` to these. Make the Button trim opt-out-able so `TabBar` stops undoing it.
4. Add an "Alignment" gallery page with 1-line, 2-line, and every-size rows. Add a Playwright check that measures icon center vs cap center (≤ 0.5px), like diffmap's 0.02px measurement.
5. Add one line to the Maui skill's design constraints: "Icon + text rows: `alignItems: start`, text `capCenter`, icons/buttons `1lh`."
6. Later: Option C if inline icons in prose show up.
