# Patterns

Recipes for app chrome that is **not** on the `"maui"` barrel. Prefer these recipes and rebuild with barrel components and tokens in consuming apps. Package source under `"maui/src/patterns"` is there if you need a detail this file does not cover.

Shared rules: hover fills snap (no background transition); empty collections get copy (and usually an action); keep `minWidth: 0` on text columns so truncation works.

---

## Sidebar

`Sidebar` / `SidebarSection` / `SidebarItem`: fixed **240px** nav: raised `background.element` + `shadow.subtle` + `radius.lg`, column `gap={8}`, padding step 2.

Composition:

1. Optional brand block (not a special component).
2. One or more sections: xs/500/lowContrast label, then a list of items.
3. Each item is a full-width quiet row: 16px icon column, label, optional trailing (`Badge`).

```tsx
import { Flex, Text } from "maui"

<nav aria-label="Workspace">
  {/* 240px column, padding step 2, radius.lg, shadow.subtle, background.element, gap 8 */}
  <Flex column gap={2} px={4} pt={4}>
    <Text size="sm" fontWeight={600}>Maui Cloud</Text>
    <Text size="xs" color="lowContrast">Production</Text>
  </Flex>
  {/* sections + items — see layout rules below */}
</nav>
```

Item layout (rebuild, do not invent a different nav row):

- Grid: `16px minmax(0, 1fr) auto`, column gap spacing 3.
- Style from `navigationItem` + `focusRing("&:focus-visible")`.
- `aria-current="page"` when `active` — accent color + weight 500, **no** filled background.
- Icon wrap is 16×16, `gray[11]`; active icon uses `accent[9]`.
- Label: 13/20, ellipsis. Section label is padded to align with the text column (padding-start = item padding 4 + 16px icon + gap 3).
- Native `<button type="button">` inside `<li>`, not `Button` — so the row can be a grid without the 28px control chrome.
- List: no bullets, `gap: 1px`.

Hover: `backgroundColor.elementHover`, instant.

---

## Inbox

`Inbox` / `InboxMultiLine`: mail **thread list**, not a table. Two densities:

| | `Inbox` (single line) | `InboxMultiLine` |
| --- | --- | --- |
| Grid | `minmax(180px, 24%) minmax(0, 1fr) 92px` — sender · subject+snippet · time | Column: sender+time row, subject, 2-line snippet |
| Height | ~40px | Padded `y: 6, x: 4` |
| Unread | 6px accent dot before sender | Same, aligned to the first line |

Row model:

```ts
type EmailThread = {
	id: string
	senders: string
	subject: string
	snippet: string
	time: string
	unread?: boolean
}
```

Behavior:

- `selectedId` + `onSelectThread(id)`. Selected row uses `backgroundColor.elementActive`. Hover uses `elementHover` (instant).
- `radius.md`, `userSelect: none`, list `gap: 1px`.
- Subject: highContrast, ellipsis. Snippet: lowContrast, ellipsis (multi-line clamps to 2).
- Time sits on the right. **On hover**, time fades out and a quiet icon toolbar (`Star`, `Archive`, `Trash`, `Envelope`, `Clock`) fades in at the right — `shadow.subtle` chip, `Button variant="quiet"` with `aria-label`, `stopPropagation` on click.
- Always include an empty state when `threads.length === 0` (“No messages” + optional compose action).

Single-line sender column is highContrast with the unread dot. Multi-line puts the dot in a leading column (`align: start`).

Email client uses **InboxMultiLine** in a 240px pane (see [apps.md](apps.md#email-client)).

---

## Message list

`MessageList` + `Message`: raised **cards** in a column (`gap` 6, max width ~760px), `role="feed"`.

Each `Message`:

```tsx
<article> {/* radius.lg, shadow.subtle, padding 8, column gap 4, background.element */}
  <header> {/* row, wrap, gap 2 */}
    <Avatar name={sender} size="sm" />
    <Text size="sm" fontWeight={500}>{sender}</Text>
    <time><Text size="xs" color="lowContrast">{timestamp}</Text></time>
    {edited ? <Text size="xs" color="lowContrast">(edited)</Text> : null}
  </header>
  <Prose>{/* body: P / lists, not a raw string */}</Prose>
</article>
```

- `sender` + `timestamp` required; `edited?` appends “(edited)”.
- Body is React children inside `Prose` (so headings/paragraphs get reading rhythm). For email, keep the inner `Prose` unconstrained (`minWidth: 0`) so it fills the card.
- Empty thread: “Select a thread to read messages.” (see Email client).

---

## Assistant message

`AssistantMessage`: streaming **markdown reply**. Same reading scale as `Prose` (`proseHtml(size)`), max width `proseMaxWidth`.

```tsx
<AssistantMessage size="sm" isAnimating={streaming}>
  {markdown}
</AssistantMessage>
```

Rebuild with Streamdown + Maui tokens (Streamdown is a Maui dependency):

1. Root: `maxWidth: proseMaxWidth`, `minWidth: 0`. `aria-live="polite"` and `aria-busy` while `isAnimating`.
2. `<Streamdown>` with `proseHtml(size)` on the root (flex column, Maui type, **drop Streamdown’s Tailwind classNames** on `h1`/`p`/`ul`/… so markers and gaps stay under Maui).
3. Fenced code: while the fence is incomplete, render a plain `<pre>` (`radius.md`, `shadow.subtle`, `backgroundColor.app`, padding 12px) so the highlighter does not remount every chunk. When complete, `<CodeBlock lang={lang}>{text}</CodeBlock>`.
4. Animation: keep Streamdown `animated` **stably on**; toggle `isAnimating` only. Flipping `animated` resets stagger and makes new blocks pop. Word fade: `duration: motionStreamDurationMs`, `easing: motionEasing`, `stagger: 16`. While animating, also apply `proseStreamingMarkers` so list bullets fade with words.
5. `controls={false}`, `lineNumbers={false}`, `mode="streaming"`.

Do not wrap AssistantMessage in `Prose` — `proseHtml` already owns rhythm.

User turns in a chat are **not** this pattern: they are a right-aligned bubble (`prose("sm").paragraph`, `radius.md`, `shadow.subtle`, `background.element`, max-width ~80%). See [AI chat](apps.md#ai-chat).
