# AGENTS.md

## Cursor Cloud specific instructions

This repo (`experiments`) is a **client-only** Vite 8 + React 19 + TypeScript SPA — a design-system gallery called "Maui" with embedded demos (including an Email client app). There is **no backend, database, auth, or external API**; all state is in-memory (`tuple-database`) and there are no environment variables/secrets to configure.

Dependencies are installed automatically by the Cloud Agent install script (`.cursor/environment.json`): `npm install && npx libretto setup`. That installs Playwright Chromium and syncs Libretto agent skills. `.npmrc` sets `legacy-peer-deps=true`, so plain `npm install` is the correct install command.

Standard commands (see `package.json` `scripts`):

- Dev server: `npm run dev` → Vite serves at `http://localhost:5173/` (Vite `root` is `src/`).
- Website build: `npm run build` → static output to `website/` (gallery entry; not part of the npm package).
- Library build: `npm run build:lib` → ESM + declarations to `dist/` (`maui.js`, `maui.d.ts`, and compiled modules). Also runs via `prepare` on install.
- Preview built website: `npm run serve`.
- Type-check: `npm run tsc` runs `tsc --noEmit --watch` (watch mode). For a one-shot check use `npx tsc --noEmit`.
- Tests: `npm test` (Vitest). Note: there are currently **no test files**, so Vitest exits with code 1 and "No test files found" — this is expected, not a failure.

Non-obvious notes:

- `vite.config.ts` enables `server.watch.usePolling` because native file-watching misses changes in this environment; HMR relies on polling.
- Vite dep-optimization excludes `shiki`/`shiki/wasm` (WASM syntax highlighter); the production build emits a large `wasm` chunk and a >500 kB chunk-size warning, which is expected.

### Libretto CLI

Follow [libretto.sh/start.md](https://libretto.sh/start.md) and the project skill at `.agents/skills/libretto/SKILL.md` for browser automation workflows.

- Dev dependency: `libretto`
- Setup: `npx libretto setup` (also run from Cloud Agent `install`)
- Session state under `.libretto/` is gitignored except `.gitignore`
- Prefer CLI `open` / `snapshot` / `exec` for ad-hoc UI checks; only add workflows when asked

### Libretto Browser Tools MCP

Prefer the **libretto-browser-tools** MCP ([docs](https://libretto.sh/browser-tools)) for ad-hoc browser verification when the server is available; use the Libretto CLI for reusable workflows.

Repo wiring:

- `.cursor/mcp.json` — project MCP config (Cursor IDE / Agent Window)
- `.cursor/libretto-browser-mcp.mjs` — stdio MCP server (`LocalBrowserProvider`, headless)
- `.cursor/environment.json` — `npm install && npx libretto setup` (Chromium + skills)
- Dev deps: `libretto`, `libretto-browser-tools`, `@modelcontextprotocol/sdk`

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
