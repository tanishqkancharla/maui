# Maui

TypeScript-first design system styled with [`purse-styles`](https://www.npmjs.com/package/purse-styles). This repo is the published package and a gallery of tokens, components, patterns, and demo apps.

**Gallery:** [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev)
**Package:** [`@tanishqkancharla/maui`](https://www.npmjs.com/package/@tanishqkancharla/maui)

## Install

```bash
npm install @tanishqkancharla/maui
```

Wrap the app in `MauiProvider`, then import tokens and components:

```tsx
import { MauiProvider, Button } from "@tanishqkancharla/maui"

function App() {
	return (
		<MauiProvider>
			<Button>Hello</Button>
		</MauiProvider>
	)
}
```

Put the exported `themeFoucScript` in a classic inline `<script>` in `<head>` so `data-theme` is correct on first paint.

## Develop

```bash
npm install
npm run dev
```

Vite serves the gallery at [http://localhost:5173/](http://localhost:5173/).

| Script | What it does |
| --- | --- |
| `npm run dev` | Gallery dev server |
| `npm run build` | Static gallery → `website/` |
| `npm run build:lib` | Package ESM + types → `dist/` |
| `npm run serve` | Preview the gallery build |
| `npx tsc --noEmit` | Type-check |

## Package

Published as [`@tanishqkancharla/maui`](https://www.npmjs.com/package/@tanishqkancharla/maui). The barrel exports the provider, theme, tokens, and components. Patterns and demo apps in this repo are reference implementations, not part of the package barrel.

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## License

Maui is **source-available, not open source.** The code is public so you can read it and run the gallery; it is not licensed for other people to use in commercial products or as their design system.

The [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) covers personal, educational, and other noncommercial use. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

**Halo is an exception.** [Halo](https://github.com/tanishqkancharla/halo-v2) may depend on, bundle, and distribute Maui, including commercially. That grant is for Halo as an application. It does not make Maui MIT, and it does not let someone lift Maui out of Halo into another product.

This is not an open-contribution project. Please do not open pull requests; see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
