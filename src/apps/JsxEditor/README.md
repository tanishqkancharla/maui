# JSX editor (standalone)

Gist: https://gist.github.com/tanishqkancharla/814050126496e7ef2250d26ccdbf7edf

CodeMirror JSX playground: live preview, catalog autocomplete, attribute lint, and format-on-⌘S.

Design-system specifics live behind `DesignSystemApi`. Point `JsxEditor` at any adapter — Maui’s is `useMauiDesignSystem()` in the Maui repo.

## Usage

```tsx
import { JsxEditor } from "./JsxEditor"
import { exampleDesignSystem } from "./exampleAdapter"

export function App() {
	return <JsxEditor designSystem={exampleDesignSystem()} />
}
```

## Adapter (`DesignSystemApi`)

| Field | Role |
| --- | --- |
| `catalog` | Component names, props, and enum values for autocomplete + lint |
| `previewScope` | Values in scope when evaluating user JSX (`Button`, tokens, …) |
| `iconNames` | Completions after `Icons.` |
| `defaultSource` / `storageKey` | Initial document and `sessionStorage` key |
| `resolvedTheme` / `syntax` / `chrome` | CodeMirror theme + pane CSS |
| `Chrome` | Header label and Format control (use your DS buttons) |
| `PreviewProviders` | Wrap the isolated preview React root (theme, style runtime, focus DB) |

Maui adapter sketch:

```tsx
<JsxEditor designSystem={useMauiDesignSystem()} />
```

## Peers

`react`, `react-dom`, `@uiw/react-codemirror`, `@codemirror/*`, `@lezer/highlight`, `sucrase`, `prettier`.
