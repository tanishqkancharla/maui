# Maui

TypeScript-first design system styled with [`purse-styles`](https://www.npmjs.com/package/purse-styles). This repo is the design-system source and a gallery of tokens, components, patterns, and demo apps.

**Gallery:** [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev)

Maui is not a public npm library. First-party and granted projects install it from GitHub (see [Install](#install)).

## Install

Only software Tanishq Kancharla personally creates, or a project listed in [`NOTICE`](./NOTICE), should depend on Maui. Taking the package off public npm does not hide a public GitHub repo: anyone can still `pnpm add github:tanishqkancharla/maui`. For real access control, make this repo **private** and give each consuming project’s contributors **read** access here (not write, and not “Maui contributor”).

### GitHub git dependency (simplest)

Works with a public or private repo. Halo already aliases the package as `maui`:

```sh
pnpm add maui@github:tanishqkancharla/maui#v0.0.2
```

```json
{
	"dependencies": {
		"maui": "github:tanishqkancharla/maui#v0.0.2"
	}
}
```

Pin a tag or SHA, not `main`. `prepare` runs `build:lib` on install so `dist/` does not need to be committed. Private-repo CI needs a GitHub token that can read this repo (`contents: read`).

Contributors clone Halo as usual. If Maui is private, they must be a read collaborator on this repo (or on a GitHub team that can read it) so `pnpm install` can fetch the git dependency with their existing GitHub credentials.

### GitHub Packages (closest to npm)

If you want semver installs without a public registry, publish `@tanishqkancharla/maui` to GitHub Packages and keep Halo’s existing alias:

```json
{
	"dependencies": {
		"maui": "npm:@tanishqkancharla/maui@0.0.2"
	}
}
```

In the consuming repo’s `.npmrc` (token stays in the user env or CI secret, never committed):

```ini
@tanishqkancharla:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Same access model: repo/package read for Halo contributors, not write on Maui.

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
| `npm run build:lib` | Package ESM + types → `dist/` |
| `npm run serve` | Preview the gallery build |
| `npx tsc --noEmit` | Type-check |

## Package

The barrel exports the provider, theme, tokens, and components. Patterns and demo apps in this repo are reference implementations, not part of the package barrel. Older public npm versions of `@tanishqkancharla/maui` may still exist; new first-party apps should install from GitHub as above.

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## License

Maui is **source-available, not open source.** The code is public so you can read it and run the gallery; it is not licensed for other people to use in commercial products or as their design system.

The [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) covers personal, educational, and other noncommercial use. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

**First-party and granted projects are exceptions.** Any software Tanishq Kancharla personally creates — including [Halo](https://github.com/tanishqkancharla/halo-v2) — may depend on, bundle, and distribute Maui, including commercially. The same grant can be given to other projects by listing them in [`NOTICE`](./NOTICE) or in a separate writing. That does not make Maui MIT, and it does not let someone lift Maui out of a granted project into another product.

This is not an open-contribution project. Please do not open pull requests; see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
