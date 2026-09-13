# JSX editor

Gallery: `/editor` (top-level nav, not under Apps). Not on the `"maui"` barrel. Prefer this layout; package source: `"maui/src/apps/JsxEditor/"` if you need a detail this file does not cover.

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
