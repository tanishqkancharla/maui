# Maui

TypeScript-first design system styled with [`purse-styles`](https://www.npmjs.com/package/purse-styles). This repo is the design-system source and a gallery of tokens, components, patterns, and demo apps.

**Gallery:** [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev)

Maui is open source under the MIT License and published on npm as `@tanishqkancharla/maui`.

## Install

Halo keeps the short `maui` import alias:

```sh
pnpm add maui@npm:@tanishqkancharla/maui@0.0.9 motion@^13.2.0
```

```json
{
	"dependencies": {
		"maui": "npm:@tanishqkancharla/maui@0.0.9",
		"motion": "^13.2.0"
	}
}
```

Motion is a required peer dependency used by Maui components with animated presence and transitions. The published tarball contains compiled `dist/` JavaScript and declarations. Installs do not run a Maui build.

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
| `npm run verify-package` | Pack-and-inspect publish smoke test of the real tarball (not a public-API check) |
| `npm run serve` | Preview the gallery build |

## Package

The default package export is compiled `dist/` JavaScript and declarations. TypeScript source remains available through the `source` export condition and `maui/src`. Patterns, demo apps, and the gallery `Panel` preview frame are reference implementations, not package components.

Push directly to `main`; PRs are not required. Each push prepares the next version of `@tanishqkancharla/maui`, creates a `vX.Y.Z` tag, and stages the verified tarball on npm with provenance. **Staging does not make the version public.** Add `[skip release]` to the push's head commit message to skip staging. Manual `vX.Y.Z` tag pushes also stage a release when the tag matches `package.json`.

To publish, review the version in npm's **Staged Packages** tab and approve it with 2FA. With npm 11.15.0 or newer, you can also use `npm stage list @tanishqkancharla/maui`, `npm stage view <stage-id>`, `npm stage download <stage-id>`, and `npm stage approve <stage-id>`. Approve versions in increasing order so an older approval does not move `latest` backward. Git tags reserve version numbers even while approval is pending or after a staged version is rejected; the next branch release uses a new version. A failed staging upload can be retried by manually running the workflow against its existing `vX.Y.Z` tag.

### Required npm security settings

In the package's npm settings:

1. Configure the GitHub trusted publisher for `tanishqkancharla/maui`, workflow filename `publish.yml`, with **stage-only** permission. Do not allow direct `npm publish` or dist-tag management. Audit all trusted publisher entries, not just this workflow's entry. If npm requires replacing an existing connection, copy its repository/workflow details, replace it with a stage-only connection, and complete the first staged upload within two days before the new connection expires.
2. Set **Publishing access** to **Require two-factor authentication and disallow bypass 2fa tokens (recommended)**. Revoke unused automation tokens.
3. Keep 2FA enabled on maintainer accounts. CI must never approve its own staged release.

These npm-side restrictions are essential: changing the workflow command alone does not prevent a modified workflow from attempting a direct publish. See npm's [staged publishing](https://docs.npmjs.com/staged-publishing) and [trusted publisher](https://docs.npmjs.com/trusted-publishers) documentation.

`npm run release` also stages rather than publishing directly and requires npm 11.15.0 or newer. The gallery still deploys independently to [maui.tanishqkancharla.dev](https://maui.tanishqkancharla.dev) through Vercel on `main`; npm approval does not gate that deployment.

Agent conventions for consuming Maui: [`skills/maui`](./skills/maui/SKILL.md).

## License

Maui is available under the [MIT License](./LICENSE).
