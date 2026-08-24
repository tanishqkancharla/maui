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

The barrel exports the provider, theme, tokens, and components. Patterns and demo apps in this repo are reference implementations, not part of the package barrel. This repo no longer publishes to public npm (`publish.yml` is removed; `npm run release` exits). Older public npm versions of `@tanishqkancharla/maui` may still exist until they are deprecated or made private from an npm login.

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## Remaining account steps (cannot be done from this agent)

Do these **after** Halo (and any other consumer) installs Maui from git, or those installs will break:

1. In [Halo](https://github.com/tanishqkancharla/halo-v2) `apps/electron/package.json`, change `"maui": "npm:@tanishqkancharla/maui@0.0.2"` to `"maui": "github:tanishqkancharla/maui#v0.0.3"` (then retag and bump after this license lands). Run `pnpm install` and commit the lockfile.
2. Halo CI: add a fine-grained PAT (Contents: Read on `tanishqkancharla/maui` only) as `MAUI_READ_TOKEN`, and before `pnpm install` in `.github/workflows/publish-electron.yml`:
   `git config --global url."https://x-access-token:${MAUI_READ_TOKEN}@github.com/".insteadOf "https://github.com/"`
3. Add each Halo contributor as a **Read** collaborator on this repo (Settings → Collaborators).
4. Make this GitHub repo private (Settings → General → Change visibility).
5. Confirm Vercel still has access so the gallery deploys.
6. From a machine logged into npm: `npm deprecate @tanishqkancharla/maui "Private. First-party apps install from GitHub."` Paid npm optional: `npm access restricted @tanishqkancharla/maui`. Remove the npm Trusted Publisher for `publish.yml`.
7. Tag new Maui versions (`git tag v0.0.4`) and pin that tag in consuming apps. Do not `npm publish`.

## License

Maui is **source-available, not open source.** The code is public so you can read it and run the gallery; it is not licensed for other people to use in commercial products or as their design system.

The [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0) covers personal, educational, and other noncommercial use. See [`LICENSE`](./LICENSE) and [`NOTICE`](./NOTICE).

**First-party and granted projects are exceptions.** Any software Tanishq Kancharla personally creates — including [Halo](https://github.com/tanishqkancharla/halo-v2) — may depend on, bundle, and distribute Maui, including commercially. The same grant can be given to other projects by listing them in [`NOTICE`](./NOTICE) or in a separate writing. That does not make Maui MIT, and it does not let someone lift Maui out of a granted project into another product.

This is not an open-contribution project. Please do not open pull requests; see [`CONTRIBUTING.md`](./CONTRIBUTING.md).
