# Apps

Full-screen (or large-panel) compositions. None of these are on the `"maui"` barrel. Prefer these layouts and recreate the **structure** with barrel components. Package source under `"maui/src/apps"` is there if you need a detail this file does not cover.

Pick the closest app, then the matching [pattern](patterns.md).

| If you are building… | Start from |
| --- | --- |
| Mail / tickets / two-pane list+detail | Email client |
| Chat / agent transcript + composer | AI chat |
| Schedule / week grid / multi-source calendar | Calendar |
| Live JSX / design playground | JSX editor |
| Settings, docs, forms | `proseMaxWidth` column — not these apps |

---

## Email client

**Two panes**, full-bleed (not a 72ch column).

```
[ 240px inbox ] [ flexible reading pane ]
```

Shell: `radius.lg`, `shadow.subtle`, `minHeight` ~640px, `overflow: hidden`, `backgroundColor.app`, grid `240px minmax(0, 1fr)`.

**Inbox pane**

- Column, padding step 2, `minHeight: 0`, list `overflowY: auto`.
- Header: `H3` “Inbox” (or mailbox name), padded to match multi-line row text (`pt` 6, `px` 4).
- Body: [InboxMultiLine](patterns.md#inbox) with `threads`, `selectedId`, `onSelectThread`. Reset the pattern’s default `marginTop` so it sits flush under the header.

**Reading pane**

- Padding `x: 16, y: 8`, column `gap` 6, `overflowY: auto`.
- Selected: `H2` subject, then [MessageList](patterns.md#message-list) of that thread’s messages (`sender`, `timestamp`, optional `edited`, `P` children).
- None selected: lowContrast “Select a thread to read messages.”

State: one `selectedThreadId`. Threads carry `id / senders / subject / snippet / time / unread?` plus a `messages[]` array. Unread dots and hover toolbars come from the inbox pattern.

---

## AI chat

Column shell: outline border, `radius.lg`, `minHeight` ~560px / `maxHeight` ~720px, `overflow: hidden`.

```
[ scrollable feed: user bubbles + assistant rows ]
[ composer: Editor in a raised shell + send ]
```

**Feed** (`role="log"` `aria-label="Conversation"` `aria-relevant="additions"`)

- Padding `x: 8, y: 6`, column `gap` 6, `flex: 1`, `overflowY: auto`. Scroll to bottom when messages change.
- **User**: `justify: end`, bubble `maxWidth: 80%`, `prose("sm")` paragraph, `radius.md`, `shadow.subtle`, `background.element`, `pre-wrap`.
- **Assistant**: full-width column.
  1. Optional tool-call lines (lowContrast, ellipsis): `Read path`, `Wrote path`, `$ command` (command in `monospace`).
  2. [AssistantMessage](patterns.md#assistant-message) `size="sm"` `isAnimating={streaming}` — override `maxWidth: none` so it fills the pane.
  3. While streaming, a muted `Thinking` + “Thinking” (`xs` / lowContrast, row `gap` 4).

**Composer**

- Outer padding `x: 6, top: 4, bottom: 6`.
- Inner shell: `radius.lg`, `shadow.subtle`, `background.element`, padding `x: 4, y: 3`, column.
- `<Editor size="sm" onSubmit={send} editable={!streaming} placeholder="Message the assistant…" />`
- Send: circular quiet-ish `Button` (`radius.circle`, no box-shadow, `gray[3]` fill so it reads on `element`), icon `ArrowUp`, `aria-label="Send"`, disabled while streaming or empty. ⌘/Ctrl+Enter also sends (`Editor onSubmit`).

Mock streaming (no model required for a demo): wait ~3s (Thinking), optionally emit tool-call rows, then append markdown in small chunks. Keep `animated` on Streamdown the whole time; only `isAnimating` flips off when the last chunk lands.

Empty conversation: still show a welcome **assistant** markdown message, not a blank feed.

---

## Calendar

**Three panes** (sidebar can collapse):

```
[ 196px sidebar ] [ flexible week grid ] [ ~200–220px details ]
```

Shell: `radius.lg`, `shadow.subtle`, `minHeight` ~640px, `backgroundColor.app`, `overflow: hidden`. Without sidebar: `minmax(0, 1fr) minmax(200px, 220px)`.

This is a **full-bleed schedule**, not a prose column.

### Sidebar (calendar)

Raised `background.element` + `shadow.subtle`, column `gap` 6, padding 4.

- Toolbar: quiet icon buttons — hide sidebar (`Sidebar` icon), new event (`Plus`). Wrap in `Tooltip`.
- **Mini month**: 7-column weekday initials (`2xs`), 24px circular day buttons. Today = `accent[9]` + `onAccent` text. Selected (not today) = `grayAlpha[4]`. Outside-month = `gray[8]`. Hover = `elementHover` (no background transition on the chrome; day buttons may use `motion.standard` on color only). Prev/next month chevrons.
- `TextField` placeholder “Meet with...”.
- Account groups: xs/500/lowContrast email, then source rows (10px color swatch + name + hover-revealed quiet `Eye` to hide the calendar). Hidden sources drop to 45% opacity.
- Footer: quiet “Add calendar account” / “Add Notion database”.

Event colors: `accent` | `green` | `orange` | `pink` — fill step 3, text 11, selected fill 9 + `onAccent`.

### Week grid

- Header: month title (`xl`/700) + `Avatar` + `Select` for 1/3/5/7-day view + `Today` + prev/next quiet chevrons (`Tooltip`).
- Sticky **all-day** row, then a vertically scrolling 24h grid (`HOUR_HEIGHT` 52px).
- Timed events: absolutely positioned blocks (`radius.sm`, padding 3/1, title + time range `2xs` lowContrast). Click a block to select; click empty grid to **create** a 30-minute event (snap 15 minutes).
- Today column: `accentAlpha[2]` wash. Now line: 2px `accent[9]` + circle on the today column.
- Time gutter ~36px, `2xs` mono labels.

### Details pane

Raised column, padding 8.

- `SearchField` “Search events”. Matches render as a list of title (`FuzzyString`) + meta; click jumps to that event and date.
- Selected event: title `lg`/600, time range or “All day”, duration, calendar swatch + name, `Button` “Add meeting note”.
- None selected: “Select an event to see details, or click the grid to create one.”
- Footer: “Useful shortcuts” with `Kbd` (`T` today, `←`/`→` range, `` ` `` sidebar). Ignore shortcuts when focus is in an input.

Hotkeys (no modifiers): `t` today, arrows shift the visible range by `viewDays`, backtick toggles sidebar.

Empty search: show nothing extra (the selected-event block and shortcuts remain). Empty calendar: still show the grid + the details empty copy.

---

## JSX editor

Two **equal panes** (stack on narrow containers, side-by-side from ~760px): JSX source | live preview.

Each pane: `border([], "outline")`, `radius.lg`, `background.element`, header row (`Text size="xs"` + optional action), `minHeight: 0`.

**Source pane**

- CodeMirror, JavaScript+JSX. Theme follows `useTheme().resolvedTheme`.
- Header: “JSX” + `Button variant="quiet"` “Format” with `<Kbd>⌘S</Kbd>` (also the real shortcut).
- Maui components, icons, and tokens are **in scope** — author JSX with no imports, same as the gallery playground.

**Preview pane**

- Padding 8. If compile/runtime/type diagnostics exist, a `red[3]` banner (`red[11]` text) sits under the header; the preview dims (`opacity: 0.5`, `aria-busy`).
- Isolate the preview (error boundary). Do not remount MauiProvider around each edit if the host already has one.

This app is a **gallery tool**, not a pattern to copy into product UI. If you need an embeddable playground, reuse: two-pane shell, Format + ⌘S, dimmed preview while invalid, empty-state JSX that already composes `Flex` / `Avatar` / `Button`. Persist draft in sessionStorage and/or the URL hash if the host is a docs site.

Default canvas worth shipping as the empty editor:

```tsx
<Flex column gap={6}>
  <Flex row gap={4} alignItems="center">
    <Avatar name="Ada Lovelace" size="md" />
    <Flex column gap={1}>
      <Text size="lg" fontWeight={600}>Ada Lovelace</Text>
      <Text size="sm" color="lowContrast">Mathematician</Text>
    </Flex>
    <Spacer />
    <Badge>Active</Badge>
  </Flex>
  <Flex row gap={3} alignItems="center">
    <Button>
      <Plus size="sm" />
      Create
    </Button>
    <Button variant="quiet">Cancel</Button>
  </Flex>
</Flex>
```
