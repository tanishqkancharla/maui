# AGENTS.md

## Cursor Cloud specific instructions

This repo (`experiments`) is a **client-only** Vite 8 + React 19 + TypeScript SPA — a design-system gallery called "Maui" with embedded demos (including an Email client app). There is **no backend, database, auth, or external API**; all state is in-memory (`tuple-database`) and there are no environment variables/secrets to configure.

Dependencies are installed automatically by the Cloud Agent install script (`.cursor/environment.json`): `npm install && npx playwright install chromium`. `.npmrc` sets `legacy-peer-deps=true`, so plain `npm install` is the correct install command.

Standard commands (see `package.json` `scripts`):

- Dev server: `npm run dev` → Vite serves at `http://localhost:5173/` (Vite `root` is `src/`).
- Website build: `npm run build` → static output to `website/` (gallery entry; not part of the npm package).
- Library build: `npm run build:lib` → ESM + declarations to `dist/` (`maui.js`, `maui.d.ts`, and compiled modules). `dist/` is generated and gitignored.
- Preview built website: `npm run serve`.
- Type-check: `npm run typecheck` is one-shot (`tsc --noEmit`). `npm run tsc` is watch mode.
- Package check: `npm run verify-package` is a pack-and-inspect publish smoke test of the real npm tarball (required files, case-sensitive relative imports, package.json exports, no prepare-on-install, fresh consumer resolve/esbuild). Not a product or public-API check — what is/isn’t exported lives on the `maui.ts` barrel. Do not denylist components or encode gallery policy in this script.
- Tests: `npm test` (Vitest). Editor lint coverage lives in `src/apps/JsxEditor/lint.test.ts`.
- Releases stage `@tanishqkancharla/maui` on npm for maintainer approval. Direct pushes to `main` are supported; no PR is required. Each push cuts the next version, tags `vX.Y.Z`, and stages the verified tarball. Put `[skip release]` in the push's head commit message to skip. Manual `v*` tags also stage, never publish directly.

### Versioning

1. Push to `main` (or push a `vX.Y.Z` tag that matches `package.json`).
2. `.github/workflows/publish.yml` typechecks, builds, verifies the tarball, tags if needed, and runs `npm stage publish` on that tarball with provenance. `npm run release` also stages. Staged publishing requires npm 11.15.0 or newer.
3. If `package.json` is not already a git tag or npm version, that version is staged as-is. Otherwise the workflow patch-bumps and commits `Release vX.Y.Z`. Tags reserve versions while approval is pending or after rejection. Retry a failed upload by manually running the workflow against its existing release tag.
4. A maintainer reviews and approves the staged package with 2FA on npm before it becomes public. Never automate approval. npm trusted publishers must be stage-only (no direct publish or dist-tag permission), and package publishing access must require 2FA and disallow bypass-2FA tokens; see README for setup.
5. Point consuming apps (Halo, etc.) at the approved npm version. The gallery at maui.tanishqkancharla.dev deploys separately through Vercel’s Git integration on `main`, without waiting for npm approval.

Non-obvious notes:

- `vite.config.ts` enables `server.watch.usePolling` because native file-watching misses changes in this environment; HMR relies on polling.
- Syntax highlighting uses Shiki's JavaScript regex engine with six lazy-loaded languages and the Maui theme. Assistant messages reuse `CodeBlock`, without a separate Streamdown code plugin. The production build's >500 kB chunk-size warning is expected.

### Libretto Browser Tools MCP

Prefer the **libretto-browser-tools** MCP ([docs](https://libretto.sh/browser-tools)) for browser verification when the server is available.

Repo wiring:

- `.cursor/mcp.json` — project MCP config (Cursor IDE / Agent Window)
- `.cursor/libretto-browser-mcp.mjs` — stdio MCP server (`LocalBrowserProvider`, headless)
- `.cursor/environment.json` — `npm install && npx playwright install chromium`
- Dev deps: `libretto-browser-tools`, `@modelcontextprotocol/sdk`

Tools: `browser_open`, `browser_connect`, `browser_snapshot`, `browser_exec`, `browser_status`, `browser_close`. Always pass `sessionId` from `browser_open` / `browser_connect` into later calls. Close with `browser_close` when done.

**Cloud Agents:** project `.cursor/mcp.json` is for the IDE. Enable the same stdio server for cloud runs via the MCP dropdown on [cursor.com/agents](https://cursor.com/agents) (or team **Dashboard → Integrations & MCP**). Use:

```json
{
  "command": "node",
  "args": [".cursor/libretto-browser-mcp.mjs"],
  "env": { "LIBRETTO_BROWSER_HEADLESS": "1" }
}
```

Then start a new agent (MCP servers are not hot-reloaded mid-run).

### Agentation (dev annotation toolbar + MCP)

[Agentation](https://www.agentation.com/install) adds a desktop-only annotation toolbar in **development** so you can click UI and sync feedback to the agent. It is not part of the published `@tanishqkancharla/maui` package.

Repo wiring:

- `src/dev/AgentationDev.tsx` — mounts `<Agentation endpoint="http://localhost:4747" />` from `src/index.tsx` when `import.meta.env.DEV` is true (omitted from `npm run build`)
- `.cursor/mcp.json` — `agentation` server (`node .cursor/agentation-mcp.mjs`)
- `.cursor/agentation-mcp.mjs` — runs the local `agentation-mcp` CLI (HTTP **4747** + stdio MCP, shared store)
- Dev deps: `agentation`, `agentation-mcp`
- Script: `npm run mcp:agentation`

Tools (when the MCP server is connected): `agentation_list_sessions`, `agentation_get_session`, `agentation_get_pending`, `agentation_get_all_pending`, `agentation_acknowledge`, `agentation_resolve`, `agentation_dismiss`, `agentation_reply`, `agentation_watch_annotations`.

Reload Cursor MCP after pulling this config. In the gallery (`npm run dev`), click the Agentation icon (bottom-right) to annotate; with MCP connected you can skip copy-paste and ask the agent to address pending annotations.

**Cloud Agents:** project `.cursor/mcp.json` is for the IDE. Enable the same stdio server for cloud runs via the MCP dropdown on [cursor.com/agents](https://cursor.com/agents) (or team **Dashboard → Integrations & MCP**). Use:

```json
{
  "command": "node",
  "args": [".cursor/agentation-mcp.mjs"]
}
```

The toolbar talks to `localhost:4747` on the machine running the Vite app. Cloud agents see annotations only when that HTTP server (started by this MCP process) and the browser session share a host. Servers are not hot-reloaded mid-run — start a new agent after enabling MCP.
