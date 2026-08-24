# Agent playbook: take Maui off public GitHub/npm

Run these tasks **in order** on Tanishq’s local computer, using the terminal and a logged-in browser (GitHub, npm, Vercel as `tanishqkancharla`). Do not skip ahead to private GitHub or private npm until Halo installs Maui from git and Halo CI has `MAUI_READ_TOKEN`.

Do not `npm publish` Maui. Do not commit tokens or `.npmrc` auth lines. Do not add anyone as a Maui **write** collaborator.

## Paste this as the agent prompt

```
You are on my local computer with browser control. I am logged into GitHub, npm, and Vercel as tanishqkancharla.

Work through tanishqkancharla/maui `.cursor/private-rollout-agent-tasks.md` in order (tasks 1–8). Use the terminal for git/pnpm/npm and the browser for GitHub/npm/Vercel settings.

Hard rules:
- Do not npm publish Maui.
- Do not make GitHub or npm private until Halo depends on Maui via git and Halo CI has MAUI_READ_TOKEN.
- Do not commit tokens, PATs, or npm auth.
- Maui collaborators get Read only, never write.
- After each task, record the success check from the playbook.
```

## Task 1 — Merge the Maui license PR

**Where:** browser or local terminal  
**Repo:** `tanishqkancharla/maui`  
**URL:** https://github.com/tanishqkancharla/maui/pull/23

Steps:

1. Open the PR. Confirm it includes PolyForm Noncommercial, the first-party grant in `NOTICE`, deleted `.github/workflows/publish.yml`, and `npm run release` exiting 1.
2. Merge the PR into `main` (merge commit is fine).
3. Locally: `git fetch origin main && git checkout main && git pull origin main`.

Success: `main` contains `LICENSE`, `NOTICE`, no `publish.yml`, and `package.json` `"license": "PolyForm-Noncommercial-1.0.0"`.

## Task 2 — Tag Maui for Halo to pin

**Where:** local terminal  
**Repo:** `tanishqkancharla/maui` on `main`

Steps:

1. If `package.json` version is still `0.0.2`, bump it and `package-lock.json` to `0.0.4` (npm already used `0.0.3`). Commit on `main` or a short PR; merge before tagging.
2. `git tag v0.0.4 && git push origin v0.0.4`
3. Do not create a GitHub Release that publishes to npm (that workflow is gone; still do not `npm publish`).

Success: `git ls-remote --tags origin | grep v0.0.4` shows the tag.

## Task 3 — Point Halo at the git tag

**Where:** local terminal  
**Repo:** `tanishqkancharla/halo-v2`  
**Do this while Maui is still public.**

Steps:

1. Open `apps/electron/package.json`.
2. Replace `"maui": "npm:@tanishqkancharla/maui@0.0.2"` with `"maui": "github:tanishqkancharla/maui#v0.0.4"`.
3. From the Halo repo root: `pnpm install`
4. Confirm `pnpm-lock.yaml` no longer resolves `@tanishqkancharla/maui` from `registry.npmjs.org`.
5. Commit on a branch, push, open/merge a Halo PR.

Success: `pnpm why maui` (or lockfile) shows GitHub `tanishqkancharla/maui` at `v0.0.4`. `pnpm --filter @halo/desktop exec node -e "require.resolve('maui')"` works.

## Task 4 — Create a Maui-read PAT and store it on Halo

**Where:** browser, then Halo repo settings  
**You will only see the token once.** Put it in Halo secrets immediately. Do not paste it into the Maui or Halo git repos, PR bodies, or chat logs.

Steps:

1. Open https://github.com/settings/personal-access-tokens/new
2. Token name: `halo-ci-maui-read`
3. Resource owner: `tanishqkancharla`
4. Expiration: 90 days (or longer if the UI allows; set a calendar reminder)
5. Repository access: **Only select repositories** → `maui`
6. Repository permissions: **Contents = Read-only**. Nothing else.
7. Generate. Copy the token.
8. Open https://github.com/tanishqkancharla/halo-v2/settings/secrets/actions
9. New repository secret, name `MAUI_READ_TOKEN`, value = the token.
10. If Halo uses GitHub Environments for Release, also add `MAUI_READ_TOKEN` to the **Release** environment secrets (the Electron publish job uses `environment: Release`).

Success: Halo repo Actions secrets list shows `MAUI_READ_TOKEN`. Token value is not in any file.

## Task 5 — Halo CI: git URL rewrite before `pnpm install`

**Where:** local terminal  
**Repo:** `tanishqkancharla/halo-v2`  
**File:** `.github/workflows/publish-electron.yml`

There are two `pnpm install --frozen-lockfile` steps (Electron publish job and plugin-sdk job). Add this step **immediately before each of them**:

```yaml
      - name: Allow private Maui git dependency
        env:
          MAUI_READ_TOKEN: ${{ secrets.MAUI_READ_TOKEN }}
        run: git config --global url."https://x-access-token:${MAUI_READ_TOKEN}@github.com/".insteadOf "https://github.com/"
```

Commit, push, merge.

Success: The workflow file contains that step before every `pnpm install --frozen-lockfile`. A dry-read of the YAML still has `environment: Release` on the Electron publish job (so the environment secret is visible).

## Task 6 — Give Halo people Read on Maui (not write)

**Where:** browser  
**URL:** https://github.com/tanishqkancharla/maui/settings/access

Steps:

1. List Halo access: open https://github.com/tanishqkancharla/halo-v2/settings/access (or `gh api repos/tanishqkancharla/halo-v2/collaborators --paginate`).
2. For every human collaborator on Halo except `tanishqkancharla`, add them on Maui with role **Read**.
3. Do not grant Maintain, Write, or Admin.

Success: Maui access page shows those users as Read. Nobody new has write.

## Task 7 — Make the GitHub repo private, then check Vercel

**Where:** browser  
**Only after tasks 3–5 are merged.** Halo contributors must already have Maui Read (task 6) or they lose the repo.

GitHub:

1. Open https://github.com/tanishqkancharla/maui/settings
2. Danger zone → Change repository visibility → **Private** → confirm.
3. Confirm https://github.com/tanishqkancharla/maui now shows Private.

Vercel (gallery `https://maui.tanishqkancharla.dev`):

1. Open https://vercel.com/dashboard while logged in as Tanishq.
2. Open the project that deploys `tanishqkancharla/maui` (domain `maui.tanishqkancharla.dev`).
3. Settings → Git: connected repo still `tanishqkancharla/maui`. If Vercel asks to grant the GitHub App access to private repos, grant **maui**.
4. Trigger a deploy (empty commit or Redeploy). Wait for success.
5. Open https://maui.tanishqkancharla.dev and confirm the gallery loads.

Success: Maui repo is private; Vercel deploy is green; gallery URL loads.

## Task 8 — Turn off public npm

**Where:** local terminal (logged into npm) and browser  
**Do this after Halo no longer installs from registry.npmjs.org** (task 3 merged).

Terminal:

```sh
npm whoami
# must be the owner of @tanishqkancharla/maui
npm deprecate @tanishqkancharla/maui "Private design system. First-party apps install from GitHub."
```

If this npm user has a paid plan and you want the package itself private (not just deprecated):

```sh
npm access restricted @tanishqkancharla/maui
```

If `access restricted` errors, stop; deprecate is enough. Do not unpublish unless `npm unpublish --dry-run` shows it is allowed.

Browser:

1. Open https://www.npmjs.com/package/@tanishqkancharla/maui
2. Package settings → Trusted Publisher: remove GitHub `tanishqkancharla/maui` workflow `publish.yml` if it is still listed.
3. Confirm the deprecate warning appears on the package page (may take a minute).

Success: `npm view @tanishqkancharla/maui deprecated` is non-empty. `npm run release` in the Maui repo still exits 1. No new Maui version exists on npm.

## If something fails

- Halo `pnpm install` cannot fetch Maui after the repo is private: task 6 (Read collaborator) or SSH/`gh auth` on that machine.
- Halo CI cannot fetch Maui: task 4 secret missing on the **Release** environment, or task 5 step not before `pnpm install`.
- Gallery 404 after private: Vercel GitHub App lacks the private repo (task 7).
- Accidental `npm publish`: `publish.yml` is gone and `npm run release` refuses; do not add them back.
