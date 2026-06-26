---
version: alpha
name: Notion Calendar
description: Dense multi-pane calendar UI with warm Notion neutrals, crisp grid lines, pastel event blocks, and a flat productivity-focused surface.
colors:
  primary: "#32302C"
  secondary: "#787774"
  tertiary: "#F04842"
  neutral: "#F7F7F5"
  canvas: "#FFFFFF"
  sidebar: "#F7F7F5"
  panel: "#FCFCFC"
  grid-bg: "#FFFFFF"
  grid-subtle: "#EEEEEE"
  text-primary: "#32302C"
  text-secondary: "#787774"
  text-muted: "#A8A9A9"
  text-disabled: "#BFBFBF"
  hover-fill: "#F2F2F2"
  selected-fill: "#EDEDEC"
  current-red: "#F04842"
  purple: "#9950FF"
  purple-text: "#7733D2"
  purple-soft: "#FEEBFF"
  purple-soft-2: "#E8D3FF"
  orange: "#FE7032"
  orange-text: "#A33000"
  orange-soft: "#FFE3C8"
  peach-soft: "#F7F4F3"
  gray-event: "#F2F2F2"
  green: "#48CA80"
  white: "#FFFFFF"
typography:
  month-title:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI Variable Display, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 22px
    fontWeight: 700
    lineHeight: 26px
    letterSpacing: -0.22px
  body:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI Variable Display, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 13px
    fontWeight: 400
    lineHeight: 18px
  body-medium:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI Variable Display, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 13px
    fontWeight: 500
    lineHeight: 18px
  label:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI Variable Display, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 12px
    fontWeight: 500
    lineHeight: 16px
  micro:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI Variable Display, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 10px
    fontWeight: 500
    lineHeight: 13px
    letterSpacing: -0.3px
  calendar-day:
    fontFamily: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica Neue, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 20px
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  pill: 100px
  circle: 999px
spacing:
  px: 1px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  sidebar-width: 240px
  detail-width: 320px
  hour-row: 96px
  control-height: 32px
  event-min-height: 26px
components:
  sidebar:
    backgroundColor: "{colors.sidebar}"
    textColor: "{colors.text-primary}"
    padding: 16px
    width: "{spacing.sidebar-width}"
  detail-panel:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    padding: 16px
    width: "{spacing.detail-width}"
  toolbar-button:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: "{spacing.control-height}"
  mini-day-current:
    backgroundColor: "{colors.current-red}"
    textColor: "{colors.white}"
    typography: "{typography.calendar-day}"
    rounded: "{rounded.sm}"
    size: 28px
  mini-day-selected-range:
    backgroundColor: "{colors.selected-fill}"
    textColor: "{colors.text-primary}"
    typography: "{typography.calendar-day}"
    rounded: "{rounded.sm}"
    size: 28px
  event-purple:
    backgroundColor: "{colors.purple-soft}"
    textColor: "{colors.purple-text}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.xs}"
    padding: 8px
  event-orange:
    backgroundColor: "{colors.orange-soft}"
    textColor: "{colors.orange-text}"
    typography: "{typography.body-medium}"
    rounded: "{rounded.xs}"
    padding: 8px
  event-gray:
    backgroundColor: "{colors.gray-event}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.xs}"
    padding: 6px
  input-muted:
    backgroundColor: "{colors.hover-fill}"
    textColor: "{colors.text-muted}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 12px
    height: 32px
---

## Overview

Notion Calendar is a precision scheduling workspace: calm, gridded, and information-dense. The design borrows Notion's warm neutral shell but adds a strong temporal structure through fine grid lines, fixed side panels, and small pastel event blocks. It should feel like a professional instrument rather than a lifestyle calendar.

The UI is optimized for scanning across time, time zones, calendars, and event metadata simultaneously. Visual expression comes from event color coding and the red current-time/current-day marker; everything else stays flat and neutral.

## Colors

Use warm Notion neutrals for the product shell: white canvas, `#F7F7F5` sidebar, charcoal `#32302C` text, and muted gray labels/icons. Grid lines are very light (`#EEEEEE`) and should be visible without dominating the schedule.

The key functional accent is red-orange `#F04842`, used for the current day and current time indicator. Calendar/event colors use pastel fills with darker text: lavender/purple (`#FEEBFF` with `#7733D2`), peach/orange (`#FFE3C8` with `#A33000`), and light gray for neutral or shared events. Prefer low-saturation fills and reserve saturated color for calendar dots, current state, and thin event accents.

## Typography

Use a system sans stack with compact sizing. The month title is the only large typographic element at 22px/700 with slight negative tracking. Most interactive text uses 13px, labels and calendar metadata use 10–12px, and mini-calendar dates use 16px.

Keep hierarchy subtle. Use weight and color rather than size jumps: 500 weight for event titles and controls, muted gray for times and placeholders, and primary charcoal for confirmed values.

## Layout

Use a three-pane desktop layout: a fixed 240px left sidebar, a flexible central calendar grid, and a fixed detail panel around 320px. Separate panes with 1px vertical borders. The central calendar has a top toolbar, month heading, day headers, an all-day row, then hourly rows.

The left sidebar contains utility icons, a mini month grid, scheduling input, and grouped calendar toggles. The right panel is contextual: event type, title, start/end date-time, participants, conferencing, notes, location, attachments, description, calendar, availability, visibility, and reminders.

Spacing is compact and regular. Controls are about 32px high, mini-calendar day cells are 28px, event chips can be as small as 26px high, and hour rows are tall enough to stack multiple overlapping events. Use a 4px/8px grid throughout.

## Elevation & Depth

The interface is almost completely flat. Do not use card shadows for panes, toolbars, or events. Depth is created by borders, background fills, and layered event overlap.

Use `1px solid #EEEEEE` for grid and panel separation. Event overlap can be indicated by side-by-side slivers, inset positioning, and border accents rather than elevation.

## Shapes

Use 6px rounding for buttons, inputs, and mini-calendar selected days. Event cards use tight 4px rounding so they remain precise inside the grid. Current-day and avatars can be circular or pill-like. Avoid large, soft card radii in the calendar grid; it should retain a spreadsheet-like precision.

## Components

**Mini-calendar:** A compact 7-column month grid. The selected visible range uses a continuous light-gray rounded band. The current day is a red rounded square/circle with white text. Out-of-month days are muted.

**Calendar grid:** Fine vertical and horizontal rules form the schedule. Day headers are centered, time labels are muted, and a red current-time label/line marks now. Multi-time-zone labels sit in narrow columns at the left of the grid.

**Event blocks:** Pastel rectangles with darker text and a colored side accent. Confirmed events use solid pastel fills; tentative/blocked events may use dashed borders and reduced opacity. Long events compress text with ellipsis rather than expanding the grid.

**Toolbar controls:** Small rounded buttons for view selection, today, and navigation. They use near-white fills, subtle borders, and medium-weight 13px text.

**Detail panel:** A flat form-like sidebar with section dividers. Empty fields show large muted placeholder text and light icons. Filled fields use primary text and small colored calendar swatches.

**Calendar list:** Sidebar calendar rows use colored rounded-square toggles, muted hidden-calendar rows, and right-side visibility icons. Keep row height compact and align all color chips to a shared column.

## Do's and Don'ts

Do keep the grid crisp, flat, and neutral. Do use pastel color coding for events and saturated red only for current time/day. Do preserve dense multi-pane visibility. Do align events exactly to grid time positions.

Don't add shadows, gradients, or decorative imagery. Don't make event blocks overly rounded or card-like. Don't use bright saturated fills for entire events unless representing the current-time marker or a tiny calendar chip.
