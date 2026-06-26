---
version: alpha
name: Notion Mail
description: Dense, calm email productivity UI with Notion's neutral editorial shell, blue filter intelligence, and soft status labels.
colors:
  primary: "#1D1B16"
  secondary: "#5F5E5B"
  tertiary: "#2383E2"
  neutral: "#F7F7F5"
  canvas: "#FFFFFF"
  sidebar: "#F7F7F5"
  sidebar-active: "#E3E3E1"
  text-primary: "#1D1B16"
  text-secondary: "#5F5E5B"
  text-muted: "#91918E"
  border-subtle: "#E3E2E0"
  hover-fill: "#F1F1EF"
  accent-blue: "#2383E2"
  accent-blue-soft: "#EDF4FD"
  accent-blue-card: "#D3E5EF"
  warning-bg: "#FBF3DB"
  warning-text: "#CB9433"
  peach-bg: "#FFE2DD"
  peach-text: "#49290E"
  tag-blue-bg: "#D3E5EF"
  tag-blue-text: "#183347"
  black: "#000000"
  white: "#FFFFFF"
typography:
  title:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 17px
    fontWeight: 600
    lineHeight: 22px
  body:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 22.4px
  row:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 400
    lineHeight: 20px
  row-strong:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 600
    lineHeight: 20px
  nav:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 14px
    fontWeight: 500
    lineHeight: 20px
  caption:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
  micro:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Arial, sans-serif
    fontSize: 10px
    fontWeight: 400
    lineHeight: 13px
rounded:
  xs: 3px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  pill: 100px
  circle: 999px
spacing:
  px: 1px
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  sidebar-width: 240px
  row-height: 40px
  icon-sm: 20px
  icon-md: 24px
components:
  sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.text-secondary}"
    padding: 16px
    width: "{spacing.sidebar-width}"
  sidebar-item:
    backgroundColor: transparent
    textColor: "{colors.text-secondary}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    padding: 8px
    height: 36px
  sidebar-item-active:
    backgroundColor: "{colors.sidebar-active}"
    textColor: "{colors.text-primary}"
    typography: "{typography.nav}"
    rounded: "{rounded.md}"
    padding: 8px
  filter-chip:
    backgroundColor: "{colors.accent-blue-soft}"
    textColor: "{colors.accent-blue}"
    typography: "{typography.row}"
    rounded: "{rounded.pill}"
    padding: 8px
    height: 28px
  label-peach:
    backgroundColor: "{colors.peach-bg}"
    textColor: "{colors.peach-text}"
    typography: "{typography.row-strong}"
    rounded: "{rounded.sm}"
    padding: 4px
  label-blue:
    backgroundColor: "{colors.tag-blue-bg}"
    textColor: "{colors.tag-blue-text}"
    typography: "{typography.row}"
    rounded: "{rounded.sm}"
    padding: 4px
  warning-banner:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning-text}"
    typography: "{typography.row}"
    padding: 16px
    height: 44px
  ios-cta:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    typography: "{typography.row-strong}"
    rounded: "{rounded.pill}"
    padding: 16px
---

## Overview

Notion Mail feels like Notion translated into an inbox: editorial, quiet, and extremely information-dense. The interface avoids decorative chrome and uses a warm off-white sidebar, flat content planes, understated dividers, and small rounded fills to create hierarchy. Interaction feels analytical rather than branded: filter chips, labels, and unread dots carry most of the color while the surrounding shell stays nearly monochrome.

The product should feel fast, organized, and assistant-like. Keep the reading surface white and spacious, but compress navigation and message rows enough that many items remain visible at once.

## Colors

The foundation is a warm neutral Notion palette: white canvas, `#F7F7F5` sidebar, charcoal text, and gray iconography. Use pure blue (`#2383E2`) sparingly for machine intelligence and unread state: filter chips, unread dots, and active controls.

Soft tints communicate categorization. Peach labels mark sections like starred/everything-else groups, blue-gray labels mark custom classifications, and the shutdown/status banner uses warm yellow-orange. Prefer background tints over outlines for semantic labels.

## Typography

Use a system sans stack with SF Pro/Segoe-like proportions. Most UI sits between 12px and 16px. Message rows use 14px text, with sender and subject promoted to 600 weight when unread. Section headers, metadata, counts, and chips use 12px–14px with medium weight.

Avoid large expressive type. The app title is only slightly larger than body text, relying on icon, position, and whitespace rather than display typography.

## Layout

Use a fixed 240px left sidebar and a flexible main mail pane. The sidebar is vertically stacked with a profile selector, search, grouped navigation, app links, and support actions. Main content has a top banner, a compact title/control row, a horizontally scrollable filter-chip row, then a single-line message list.

Spacing follows a 4px/8px rhythm. Sidebar rows are about 36px high, icon buttons are 20–24px, filter chips are about 28px high, and email rows are about 40px high. Message rows use column alignment: unread dot, sender, subject/snippet, optional label, then right-aligned time.

## Elevation & Depth

Keep the base interface flat. Separate panes with background shifts and 1px dividers rather than shadows. Reserve shadows for genuinely floating objects such as promotional cards and bottom-right call-to-action pills.

Floating cards can use a soft layered shadow around `0 4px 12px rgba(0,0,0,0.08)` plus a hairline edge. The black iOS pill should cast a stronger, diffuse shadow to make it feel above the mail list.

## Shapes

Use subtle 4px–8px rounding for most controls. Sidebar highlights and labels are 4px–6px. Buttons and search/filter controls can be 6px–8px. Pills are fully rounded for high-level CTAs and filter chips. Avatars and unread dots are circular.

Do not over-round the main layout: panes, lists, and rows remain rectangular so the product keeps a serious productivity feel.

## Components

**Sidebar:** A warm off-white navigation rail with muted gray icons and text. Active items use a filled gray background, stronger text, and a colored icon. Counts align to the far right.

**Filter chips:** Capsule controls with blue-tinted backgrounds, blue icons/text, and optional chevrons. They sit in one horizontal row above the mail list and can truncate long filter expressions.

**Message rows:** Single-line, scan-first rows. Unread rows get a blue dot and heavier sender/subject weight. Read metadata and timestamps use muted gray. Labels are small rounded rectangles inserted inline without disrupting row height.

**Status banner:** Full-width, pale yellow strip at the top with warning icon, text, and a bordered action button. It should feel informative, not alarming.

**Floating promo card / CTA:** Promotional surfaces float above the sidebar or content with more rounding and shadow than the primary app shell. Keep them visually separate from the flat inbox.

## Do's and Don'ts

Do keep color usage semantic and sparse. Do align counts, timestamps, and message columns precisely. Do use soft fills for active/filter/label states. Do keep rows compact enough for dense inbox scanning.

Don't introduce saturated brand gradients, large shadows, or heavy borders. Don't make the inbox feel card-based; the message list should remain a flat table-like surface. Don't use expressive display fonts or oversized headings.
