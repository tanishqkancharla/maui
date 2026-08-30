# Maui

TypeScript-first design system styled with [`purse-styles`](https://www.npmjs.com/package/purse-styles). This repo is the design-system source and a gallery of tokens, components, patterns, and demo apps.

**Gallery:** [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev)

Maui is open source under the MIT License and published on npm as `@tanishqkancharla/maui`.

## Install

Halo keeps the short `maui` import alias:

```sh
pnpm add maui@npm:@tanishqkancharla/maui@0.0.9
```

```json
{
	"dependencies": {
		"maui": "npm:@tanishqkancharla/maui@0.0.9"
	}
}
```

The published tarball contains compiled `dist/` JavaScript and declarations. Installs do not run a Maui build.

Wrap the app in `MauiProvider`, then import tokens and components:

```tsx
import { MauiProvider, Button } from "maui"

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
| `npm run build:lib` | Compile package ESM + types → `dist/` (generated, not committed) |
| `npm run typecheck` | One-shot TypeScript check |
| `npm run verify-package` | Pack and inspect the real tarball |
| `npm run serve` | Preview the gallery build |

## Package

The default package export is compiled `dist/` JavaScript and declarations. TypeScript source remains available through the `source` export condition and `maui/src`. Patterns and demo apps in this repo are reference implementations, not part of the package barrel.

Pushes to `main` publish a new patch of `@tanishqkancharla/maui` to npm (tag `vX.Y.Z`, provenance). Add `[skip release]` to the merge commit message to skip. Manual `git tag vX.Y.Z && git push origin vX.Y.Z` still publishes when the tag matches `package.json`. The gallery deploys to [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev) through Vercel on `main`.

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## License

Maui is available under the [MIT License](./LICENSE).
