# AGENTS.md

## Cursor Cloud specific instructions

This repo (`experiments`) is a **client-only** Vite 8 + React 19 + TypeScript SPA — a design-system gallery called "Maui" with embedded demos (including an Email client app). There is **no backend, database, auth, or external API**; all state is in-memory (`tuple-database`) and there are no environment variables/secrets to configure.

Dependencies are installed automatically by the startup update script (`npm install`). `.npmrc` sets `legacy-peer-deps=true`, so plain `npm install` is the correct install command.

Standard commands (see `package.json` `scripts`):

- Dev server: `npm run dev` → Vite serves at `http://localhost:5173/` (Vite `root` is `src/`).
- Gallery build: `npm run build` → static site output to `site/`.
- Library build: `npm run build:lib` → ESM + declarations to `dist/` (`maui.js`, `maui.d.ts`, and compiled modules). Also runs via `prepare` on install.
- Preview built gallery: `npm run serve`.
- Type-check: `npm run tsc` runs `tsc --noEmit --watch` (watch mode). For a one-shot check use `npx tsc --noEmit`.
- Tests: `npm test` (Vitest). Note: there are currently **no test files**, so Vitest exits with code 1 and "No test files found" — this is expected, not a failure.

Non-obvious notes:

- `vite.config.ts` enables `server.watch.usePolling` because native file-watching misses changes in this environment; HMR relies on polling.
- Vite dep-optimization excludes `shiki`/`shiki/wasm` (WASM syntax highlighter); the production build emits a large `wasm` chunk and a >500 kB chunk-size warning, which is expected.
