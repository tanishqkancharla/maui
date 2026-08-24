# AGENTS.md

## Cursor Cloud specific instructions

This repo (`experiments`) is a **client-only** Vite 8 + React 19 + TypeScript SPA — a design-system gallery called "Maui" with embedded demos (including an Email client app). There is **no backend, database, auth, or external API**; all state is in-memory (`tuple-database`) and there are no environment variables/secrets to configure.

Dependencies are installed automatically by the Cloud Agent install script (`.cursor/environment.json`): `npm install && npx playwright install chromium`. `.npmrc` sets `legacy-peer-deps=true`, so plain `npm install` is the correct install command.

Standard commands (see `package.json` `scripts`):

- Dev server: `npm run dev` → Vite serves at `http://localhost:5173/` (Vite `root` is `src/`).
- Website build: `npm run build` → static output to `website/` (gallery entry; not part of the npm package).
- Library build: `npm run build:lib` → ESM + declarations to `dist/` (`maui.js`, `maui.d.ts`, and compiled modules). Also runs via `prepare` on install.
- Preview built website: `npm run serve`.
- Type-check: `npm run tsc` runs `tsc --noEmit --watch` (watch mode). For a one-shot check use `npx tsc --noEmit`.
- Tests: `npm test` (Vitest). Note: there are currently **no test files**, so Vitest exits with code 1 and "No test files found" — this is expected, not a failure.
- Do **not** publish to public npm. `npm run release` is disabled. First-party apps install from GitHub (`maui@github:tanishqkancharla/maui#vX.Y.Z`). Cut a version by tagging git after merge, then pin that tag in consumers.

### First-party versioning (not npm)

1. Bump `version` in `package.json` and `package-lock.json` if you want the package metadata to match the tag.
2. Merge to `main`.
3. Tag: `git tag v0.0.4 && git push origin v0.0.4`.
4. Point consuming apps (Halo, etc.) at that tag. Do not run `npm publish`. The old GitHub Release → npm Trusted Publishing workflow was removed.

Non-obvious notes:

- `vite.config.ts` enables `server.watch.usePolling` because native file-watching misses changes in this environment; HMR relies on polling.
- Vite dep-optimization excludes `shiki`/`shiki/wasm` (WASM syntax highlighter); the production build emits a large `wasm` chunk and a >500 kB chunk-size warning, which is expected.

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
