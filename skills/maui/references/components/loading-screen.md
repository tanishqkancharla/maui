# Loading screen

Gallery: `/components/loading-screen`. Import from `"maui"`. Uses [Thinking](thinking.md) and [Crossfade](crossfade.md).

Fills available width and height (`flex: 1`, `width/height: 100%`). Centered `Thinking` (accent, `0.8em`), with `spacing.value(12)` (24px at the default scale) above the label.

```tsx
<LoadingScreen />
<LoadingScreen progressLabel="Indexing files" />
```

| First paint | Later `progressLabel` |
| --- | --- |
| Label present | Thinking + label fade in together. Later labels Crossfade `up`. Label punctuation is preserved; nothing is appended |
| No label | Thinking waits **2s**, then fades in. A label before 2s fades both in immediately. A label after 2s animates in and shifts Thinking so the pair stays centered |

`role="status"` `aria-busy` `aria-live="polite"`.
