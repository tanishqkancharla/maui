# AI chat

Gallery: `/apps/ai-chat`. Not on the `"maui"` barrel. Prefer this layout; rebuild with barrel components. Package source: `"maui/src/apps/AiChat/"` if you need a detail this file does not cover.

Uses [Editor](../components/editor.md), [Assistant message](../patterns/assistant-message.md), [Thinking](../components/thinking.md).

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
  2. AssistantMessage `size="sm"` `isAnimating={streaming}` — override `maxWidth: none` so it fills the pane.
  3. While streaming, a muted `Thinking` + “Thinking” (`xs` / lowContrast, row `gap` 4).

**Composer**

- Outer padding `x: 6, top: 4, bottom: 6`.
- Inner shell: `radius.lg`, `shadow.subtle`, `background.element`, padding `x: 4, y: 3`, column.
- `<Editor size="sm" onSubmit={send} editable={!streaming} placeholder="Message the assistant…" />`
- Send: circular quiet-ish `Button` (`radius.circle`, no box-shadow, `gray[3]` fill so it reads on `element`), icon `ArrowUp`, `aria-label="Send"`, disabled while streaming or empty. ⌘/Ctrl+Enter also sends (`Editor onSubmit`).

Mock streaming (no model required for a demo): wait ~3s (Thinking), optionally emit tool-call rows, then append markdown in small chunks. Keep `animated` on Streamdown the whole time; only `isAnimating` flips off when the last chunk lands.

Empty conversation: still show a welcome **assistant** markdown message, not a blank feed.
