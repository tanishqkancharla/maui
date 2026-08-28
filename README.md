# Maui

TypeScript-first design system styled with [`purse-styles`](https://www.npmjs.com/package/purse-styles). This repo is the design-system source and a gallery of tokens, components, patterns, and demo apps.

**Gallery:** [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev)

Maui is not a public npm library. First-party and granted projects install `@tanishqkancharla/maui` from GitHub Packages (see [Install](#install)).

## Install

Only software Tanishq Kancharla personally creates, or a project listed in [`NOTICE`](./NOTICE), should depend on Maui.

### GitHub Packages

The package is `@tanishqkancharla/maui` on `https://npm.pkg.github.com`. Halo can keep the `maui` import alias:

```sh
pnpm add maui@npm:@tanishqkancharla/maui@0.0.8
```

```json
{
	"dependencies": {
		"maui": "npm:@tanishqkancharla/maui@0.0.8"
	}
}
```

In the consuming repo’s `.npmrc` (never commit a token):

```ini
@tanishqkancharla:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Local and CI installs need a GitHub token with `read:packages` in `NODE_AUTH_TOKEN`. Contributors use a personal token (or `gh auth token`). GitHub Actions should set `packages: read` and pass `NODE_AUTH_TOKEN` from `GITHUB_TOKEN` after the Halo repo is granted read access to the package. Forks do not inherit that access; they need their own token.

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

Tag `vX.Y.Z` matching `package.json` to publish to GitHub Packages. Do not publish to public npm (`npm run release` exits).

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## Remaining private-rollout tasks

Cloud agents cannot change GitHub visibility, npm, Halo, or Vercel. On your local computer (browser + terminal, logged in as you), run [`.cursor/private-rollout-agent-tasks.md`](./.cursor/private-rollout-agent-tasks.md) in order.

## License

Maui is **source-available, not open source.** The code is public so you can read it and run the gallery; it is not licensed for other people to use in commercial products or as their design system.

The [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) covers personal, educational, and other noncommercial use. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

**First-party and granted projects are exceptions.** Any software Tanishq Kancharla personally creates — including [Halo](https://github.com/tanishqkancharla/halo-v2) — may depend on, bundle, and distribute Maui, including commercially. The same grant can be given to other projects by listing them in [`NOTICE`](./NOTICE) or in a separate writing. That does not make Maui MIT, and it does not let someone lift Maui out of a granted project into another product.

This is not an open-contribution project. Please do not open pull requests; see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
